#!/usr/bin/env node
// Build the release reel: the per-feature clips the manual already shows,
// cut together behind a title card, in the order a game is made.
//
// The clips are the input, not the frames: static/video/*.mp4 is what the
// repository carries, so the reel rebuilds on any checkout with ffmpeg and
// needs neither a GPU nor the engine. The engine's scripts/showcase.sh is
// still where a clip itself is retaken.
//
// Cards are a small HTML page screenshotted by headless Chrome, the way
// scripts/social-cards.mjs makes the link previews — the site's own fonts and
// colours, read from static/fonts and src/css/custom.css. The fonts are
// inlined as data URIs rather than fetched, so a card renders offline.
//
// It runs by hand, like scripts/social-cards.mjs: the reel changes when a clip
// is retaken, not on every build, and an ffmpeg pass over two minutes of video
// is a quarter of an hour.
//
//   yarn video-reel                             # the reel, the share cut, the poster
//   node scripts/video-reel.mjs --cards         # the card PNGs alone, to look at
//   node scripts/video-reel.mjs --share-only    # redo the share cut from the built reel
//   node scripts/video-reel.mjs --share-only --audio track.flac
//   node scripts/video-reel.mjs --share-only --audio track.flac --audio-start 12
//
// Outputs:
//   static/video/balaur-0-1-0.mp4/.webm        1600x1000, what the post embeds
//   static/img/manual/balaur-0-1-0.png         the poster's source, committed
//   video-out/balaur-0-1-0-share.mp4           1920x1080, to upload by hand
//
// The share cut is the only one outside `static/`. It is committed, but not
// served: it is what YouTube and Reddit are fed, and a second copy of the same
// two minutes behind a URL nobody links is bytes the site would carry for
// nothing. `static/` is what Docusaurus copies into the build; `video-out/` is
// not.
//
// Music, when `--audio` names a track, goes on the share cut alone. The clip
// the page embeds is played muted by src/components/Clip.tsx, so an audio
// track there is two megabytes nobody hears. `--share-only` skips the cards,
// the segments and the VP9 pass and re-cuts from the built reel, which is a
// minute rather than a quarter of an hour: that is the loop for trying tracks.
//
// Whatever the track is, its licence is on you to check, and a public domain
// composition is not the same as a free recording of it — the performance
// carries its own copyright. Musopen publishes recordings that are clear of
// both.
import sharp from 'sharp';
import {execFileSync} from 'node:child_process';
import {existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {dirname, join} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const videoDir = join(root, 'static', 'video');
const NAME = 'balaur-0-1-0';
const VERSION = '0.1.0';

// The clips in the order a game is made: arrange it, script it, make it
// collide, make it playable, make it move, make it look right, prove it
// replays. Each line is the card that introduces its clip.
//
// A clip plays at the speed it was taken. The showcase sequences are paced for
// a manual page, one control at a time, which is slower than a reel wants; the
// fix belongs in showcase.rn's own pacing, not in a speed-up here, which reads
// as a fast-forward.
const SECTIONS = [
  ['scenes_inspect', 'The editor', 'Nodes in a tree, properties in the inspector.'],
  ['scripting_live', 'Rune scripting', 'Scripts reload in milliseconds.'],
  ['physics_collapse', 'Physics', 'Rapier in 2D and 3D.'],
  ['input_overlay', 'Input', 'Actions over keyboard, mouse and gamepads.'],
  ['animation_key', 'Animation', 'Bones, weights and a timeline.'],
  ['shader_preview', 'Shaders', 'Materials written in WESL.'],
  ['determinism_replay', 'Determinism', 'Record, replay, roll back.'],
];

const W = 1600;
const H = 1000;
const FPS = 30;
const TITLE_SECONDS = 3.6;
const CARD_SECONDS = 1.7;
const END_SECONDS = 3.4;
const FADE = 0.28;
// The music comes up over the title card, and goes out early enough to leave
// the download card in silence: a bed that trails off under the one frame
// asking the viewer to do something takes the attention with it, where a beat
// of quiet hands it over.
const AUDIO_IN = 2.5;
const AUDIO_OUT = 4.0;
const AUDIO_TAIL = 1.5;

const argv = process.argv.slice(2);
const has = (name) => argv.includes(name);
const valueOf = (name) => (argv.indexOf(name) < 0 ? undefined : argv[argv.indexOf(name) + 1]);
const cardsOnly = has('--cards');
const shareOnly = has('--share-only');
const audio = valueOf('--audio');
// Where in the track to start, in seconds. The one control worth having: a
// piece rarely opens on the gesture you want under a title card, and the reel
// is a fixed 141 seconds that the music has to be chosen to fit rather than
// the other way round.
const audioStart = Number(valueOf('--audio-start') ?? 0);
if (has('--audio') && !audio) throw new Error('--audio wants a path');
if (audio && !existsSync(audio)) throw new Error(`no audio at ${audio}`);
if (!Number.isFinite(audioStart) || audioStart < 0) throw new Error('--audio-start wants seconds');

const dataUri = (rel, mime) =>
  `data:${mime};base64,${readFileSync(join(root, rel)).toString('base64')}`;
const mark = dataUri('static/brand/balaur-mark-dark.svg', 'image/svg+xml');
const alegreya = dataUri('static/fonts/alegreya-latin.woff2', 'font/woff2');
const sourceSans = dataUri('static/fonts/source-sans-3-latin.woff2', 'font/woff2');
const mono = dataUri('static/fonts/jetbrains-mono-latin.woff2', 'font/woff2');
const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// The dark palette, so a card cuts to an editor clip without a flash: the
// editor's own ground is --ifm-background-color in the dark theme.
const shell = (body, extra = '') => `<!doctype html>
<html><head><meta charset="utf-8"><style>
  @font-face{font-family:'Alegreya';font-weight:400 900;src:url('${alegreya}') format('woff2')}
  @font-face{font-family:'Source Sans 3';font-weight:200 900;src:url('${sourceSans}') format('woff2')}
  @font-face{font-family:'JetBrains Mono';font-weight:100 800;src:url('${mono}') format('woff2')}
  html,body{margin:0;width:${W}px;height:${H}px;overflow:hidden}
  body{
    box-sizing:border-box;display:flex;flex-direction:column;
    font-family:'Source Sans 3',sans-serif;color:#e6e9ee;
    background:
      radial-gradient(ellipse 70% 60% at 50% 118%, rgba(111,164,216,0.20), transparent),
      linear-gradient(180deg,#12161c 0%,#0b0e12 100%);
  }
  /* Alegreya defaults to old-style figures, which turn 0.1.0 into o.1.o. */
  h1{font-family:'Alegreya',serif;font-weight:700;margin:0;letter-spacing:-0.01em;
     font-variant-numeric:lining-nums;font-feature-settings:'lnum' 1}
  ${extra}
</style></head><body>${body}</body></html>`;

const titleCard = () =>
  shell(
    `<div class="lock"><img src="${mark}" alt=""><h1>Balaur Engine</h1></div>
     <div class="ver">${escape(VERSION)}</div>
     <div class="url">balaurengine.org</div>`,
    `body{padding:0 130px 96px;justify-content:center}
     .lock{display:flex;align-items:center;gap:34px}
     .lock img{width:132px;height:132px}
     .lock h1{font-size:116px;line-height:1}
     .ver{font-family:'JetBrains Mono',monospace;font-weight:500;font-size:78px;
          color:#6fa4d8;margin:30px 0 0 166px;letter-spacing:0.01em}
     .url{position:absolute;left:130px;bottom:74px;font-family:'JetBrains Mono',monospace;
          font-size:30px;color:#98a3ae}`,
  );

const sectionCard = (title, line) =>
  shell(
    `<img class="mark" src="${mark}" alt="">
     <h1>${escape(title)}</h1>
     <p>${escape(line)}</p>`,
    `body{padding:0 130px;justify-content:center}
     .mark{position:absolute;left:130px;top:96px;width:64px;height:64px;opacity:0.85}
     h1{font-size:104px;line-height:1.02}
     p{font-size:46px;line-height:1.3;color:#98a3ae;margin:26px 0 0}`,
  );

// The version is not repeated here. Set in Alegreya it would come out in old
// style figures, where 0.1.0 reads as o.1.o; the title card already carries it,
// in the mono face where the digits line up.
const endCard = () =>
  shell(
    `<div class="lock"><img src="${mark}" alt=""><h1>Balaur Engine</h1></div>
     <p>Pre-alpha, MIT, for macOS, Windows and Linux.</p>
     <div class="url">balaurengine.org/download</div>`,
    `body{padding:0 130px 96px;justify-content:center}
     .lock{display:flex;align-items:center;gap:30px}
     .lock img{width:96px;height:96px}
     .lock h1{font-size:88px;line-height:1}
     p{font-size:42px;color:#98a3ae;margin:28px 0 0 126px}
     .url{position:absolute;left:130px;bottom:74px;font-family:'JetBrains Mono',monospace;
          font-size:38px;color:#6fa4d8}`,
  );

function chrome() {
  const candidates = [
    process.env.CHROME,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    'google-chrome',
    'chromium',
    'chromium-browser',
  ].filter(Boolean);
  for (const c of candidates) {
    if (c.includes('/')) {
      if (existsSync(c)) return c;
      continue;
    }
    try {
      return execFileSync('which', [c], {encoding: 'utf8'}).trim();
    } catch {
      /* not on PATH */
    }
  }
  throw new Error('no Chrome or Chromium found; set CHROME=/path/to/binary');
}

const ff = (args) => execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...args], {stdio: 'inherit'});
// One encoder setting for every segment, so the pieces concatenate by copy
// rather than through a second generation.
const H264 = ['-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-pix_fmt', 'yuv420p', '-r', String(FPS), '-g', '60', '-an'];

const mp4 = join(videoDir, `${NAME}.mp4`);
const tmp = mkdtempSync(join(tmpdir(), 'balaur-reel-'));
// Looked up lazily: --share-only needs ffmpeg and the built reel, not a browser.
let chromeBin;
const shot = (slug, html) => {
  chromeBin ??= chrome();
  const page = join(tmp, `${slug}.html`);
  const png = join(tmp, `${slug}.png`);
  writeFileSync(page, html);
  execFileSync(
    chromeBin,
    ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
     `--window-size=${W},${H}`, '--virtual-time-budget=8000', `--screenshot=${png}`,
     pathToFileURL(page).href],
    {stdio: 'ignore'},
  );
  return png;
};

const pngs = new Map();
if (!shareOnly) {
  const cards = [['title', titleCard()], ['end', endCard()],
    ...SECTIONS.map(([clip, title, line]) => [`card_${clip}`, sectionCard(title, line)])];
  for (const [slug, html] of cards) {
    pngs.set(slug, shot(slug, html));
    console.log(`card  ${slug}`);
  }
}

if (cardsOnly) {
  const out = join(tmp, '..', 'balaur-reel-cards');
  mkdirSync(out, {recursive: true});
  for (const [slug, png] of pngs) execFileSync('cp', [png, join(out, `${slug}.png`)]);
  console.log(`cards in ${out}`);
  process.exit(0);
}

// A still becomes a segment that fades up and back down; a clip is re-encoded
// to the same settings with the same fades on its ends.
const segments = [];
// A fade in on the opening frame would make the title card black, which is
// the frame Discord, X and a video player all reach for as the thumbnail. So
// the first segment opens at full and only the ones after it fade up.
const fades = (seconds, up) =>
  `${up ? `fade=t=in:st=0:d=${FADE},` : ''}fade=t=out:st=${(seconds - FADE).toFixed(2)}:d=${FADE}`;
const still = (slug, seconds) => {
  const out = join(tmp, `seg_${segments.length}.mp4`);
  ff(['-loop', '1', '-i', pngs.get(slug), '-t', String(seconds),
      '-vf', `${fades(seconds, segments.length > 0)},format=yuv420p`,
      ...H264, out]);
  segments.push(out);
};
const clipSeg = (name) => {
  const src = join(videoDir, `${name}.mp4`);
  if (!existsSync(src)) throw new Error(`no clip at ${src}`);
  const seconds = Number(
    execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', src],
      {encoding: 'utf8'}).trim());
  const out = join(tmp, `seg_${segments.length}.mp4`);
  ff(['-i', src, '-vf', `${fades(seconds, true)},format=yuv420p`, ...H264, out]);
  segments.push(out);
  return seconds;
};

let total = TITLE_SECONDS + END_SECONDS + SECTIONS.length * CARD_SECONDS;
if (!shareOnly) {
  still('title', TITLE_SECONDS);
  for (const [clip, title] of SECTIONS) {
    still(`card_${clip}`, CARD_SECONDS);
    const seconds = clipSeg(clip);
    total += seconds;
    console.log(`cut   ${title.padEnd(16)} ${seconds.toFixed(1)}s`);
  }
  still('end', END_SECONDS);

  const list = join(tmp, 'concat.txt');
  writeFileSync(list, segments.map((seg) => `file '${seg}'`).join('\n'));
  ff(['-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', '-movflags', '+faststart', mp4]);
  ff(['-i', mp4, '-c:v', 'libvpx-vp9', '-crf', '34', '-b:v', '0', '-pix_fmt', 'yuv420p',
      '-row-mt', '1', '-an', join(videoDir, `${NAME}.webm`)]);
  // The poster the page shows behind the play button, in the place
  // scripts/optimize-images.mjs reads its sources from.
  await sharp(pngs.get('title')).png({palette: true, quality: 95, compressionLevel: 9})
    .toFile(join(root, 'static', 'img', 'manual', `${NAME}.png`));
  console.log(`reel  ${NAME}: ${Math.round(total)}s, ${SECTIONS.length} clips`);
} else if (!existsSync(mp4)) {
  throw new Error(`--share-only needs ${mp4}; run without it first`);
}

// The share cut: the same reel padded onto 16:9, which is what YouTube and X
// want; a 1600x1000 upload is letterboxed by them instead, in their own grey.
const shareDir = join(root, 'video-out');
mkdirSync(shareDir, {recursive: true});
const share = join(shareDir, `${NAME}-share.mp4`);
const PAD = 'scale=1728:1080,pad=1920:1080:96:0:0x0B0E12';
const SHARE_V = ['-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-pix_fmt', 'yuv420p',
  '-movflags', '+faststart'];
if (audio) {
  const seconds = Number(
    execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration',
      '-of', 'default=nw=1:nk=1', mp4], {encoding: 'utf8'}).trim());
  // The track is looped and then cut to the reel, so a piece shorter than the
  // reel still covers it and a longer one is simply trimmed. loudnorm lands it
  // on -14 LUFS, which is what YouTube normalises to: hit it here and the
  // upload is left alone rather than turned down on the way in.
  const out = (seconds - AUDIO_TAIL - AUDIO_OUT).toFixed(2);
  ff(['-i', mp4,
      '-stream_loop', '-1', ...(audioStart ? ['-ss', String(audioStart)] : []), '-i', audio,
      '-filter_complex',
      `[0:v]${PAD}[v];` +
        `[1:a]afade=t=in:st=0:d=${AUDIO_IN},` +
        `afade=t=out:st=${out}:d=${AUDIO_OUT},` +
        'loudnorm=I=-14:TP=-1.5:LRA=11[a]',
      '-map', '[v]', '-map', '[a]', '-t', String(seconds),
      ...SHARE_V, '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', share]);
} else {
  ff(['-i', mp4, '-vf', PAD, ...SHARE_V, '-an', share]);
}

rmSync(tmp, {recursive: true, force: true});
console.log(`share ${share}${audio ? ` with ${audio}` : ' (silent)'}`);
