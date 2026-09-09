#!/usr/bin/env node
// Build the release reel: the per-feature clips the manual already shows,
// cut together behind a title card, in the order SECTIONS lists them.
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
//   node scripts/video-reel.mjs --share-only --audio-start 12
//   node scripts/video-reel.mjs --share-only --audio t.flac --credit "Music: …"
//   node scripts/video-reel.mjs --no-audio      # a silent share cut
//
// Outputs:
//   static/video/balaur-0-1-0.mp4/.webm        1920x1080, what the post embeds
//   static/img/manual/balaur-0-1-0.png         the poster's source, committed
//   video-out/balaur-0-1-0-share.mp4           the same, with music and a credit
//
// The share cut is the only one outside `static/`. It is committed, but not
// served: it is what YouTube and Reddit are fed, and a second copy of the same
// two minutes behind a URL nobody links is bytes the site would carry for
// nothing. `static/` is what Docusaurus copies into the build; `video-out/` is
// not.
//
// Music goes on the share cut alone. The clip the page embeds is played muted
// by src/components/Clip.tsx, so an audio track there is two megabytes nobody
// hears. `--share-only` skips the cards, the segments and the VP9 pass and
// re-cuts from the built reel, which is a minute rather than a quarter of an
// hour: that is the loop for trying tracks and start offsets.
//
// The default bed is assets/audio/, committed, with its attribution in the
// README beside it. Swapping it means checking the new track's licence
// yourself, and a public domain composition is not the same as a free
// recording of it — a performance carries its own copyright, which is why
// --audio insists on a --credit to go with it.
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
// The bed and its attribution ship with the repository, so `yarn video-reel`
// on a clean checkout produces the finished share cut with nothing to fetch
// and no account anywhere. assets/audio/README.md says where it came from and
// what its licence asks for; a CC BY track is credited or it is not licensed,
// so the two move together and neither has a default without the other.
const AUDIO_DEFAULT = join(root, 'assets/audio/arabesque-no-1.mp3');
const CREDIT_DEFAULT =
  'Music: Debussy, Arabesque No. 1. Galaxy Bösendorfer 290 via IMSLP, CC BY 3.0';

// Determinism leads, then the order a game is made in: arrange it, script it,
// make it collide, make it playable, make it move, make it look right. Each
// line is the card that introduces its clip.
//
// It leads because it is the one thing here another engine does not do, and a
// viewer decides whether to keep watching in the first twenty seconds. The
// cost is that the reel no longer ends on its strongest claim, which the
// download card has to carry instead.
//
// A clip plays at the speed it was taken. The showcase sequences are paced for
// a manual page, one control at a time, which is slower than a reel wants; the
// fix belongs in showcase.rn's own pacing, not in a speed-up here, which reads
// as a fast-forward.
const SECTIONS = [
  ['determinism_replay', 'Determinism', 'Record, replay, roll back.'],
  ['scenes_inspect', 'The editor', 'Nodes in a tree, properties in the inspector.'],
  ['scripting_live', 'Rune scripting', 'Scripts reload in milliseconds.'],
  ['physics_collapse', 'Physics', 'Rapier in 2D and 3D.'],
  ['input_overlay', 'Input', 'Actions over keyboard, mouse and gamepads.'],
  ['animation_key', 'Animation', 'Bones, weights and a timeline.'],
  ['shader_preview', 'Shaders', 'Materials written in WESL.'],
];

// The cards are drawn at the size the engine captures a clip at, so a card
// and the clip after it are the same frame and the concat needs no scaling.
const W = 1920;
const H = 1080;
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
// The bundled bed unless another is named, or --no-audio asks for silence.
const audio = has('--no-audio') ? undefined : (valueOf('--audio') ?? AUDIO_DEFAULT);
// Where in the track to start, in seconds. The one control worth having: a
// piece rarely opens on the gesture you want under a title card, and the reel
// is a fixed 141 seconds that the music has to be chosen to fit rather than
// the other way round.
const audioStart = Number(valueOf('--audio-start') ?? 0);
// The whole attribution line, in the licence's own terms: title, performer,
// source and licence. A CC BY or BY-SA track is not credited by naming the
// composer — he is not the one whose licence you are relying on.
const credit = !audio
  ? undefined
  : (valueOf('--credit') ?? (audio === AUDIO_DEFAULT ? CREDIT_DEFAULT : undefined));
if (has('--audio') && !valueOf('--audio')) throw new Error('--audio wants a path');
if (has('--credit') && !valueOf('--credit')) throw new Error('--credit wants a line of text');
if (has('--audio') && has('--no-audio')) throw new Error('--audio and --no-audio disagree');
// A track that is not the bundled one arrives with no attribution of its own,
// and most free licences are only free once it is given.
if (audio && audio !== AUDIO_DEFAULT && !credit) {
  throw new Error('--audio wants a --credit; check the track\'s licence');
}
if (audio && !existsSync(audio)) throw new Error(`no audio at ${audio}`);
if (!Number.isFinite(audioStart) || audioStart < 0) throw new Error('--audio-start wants seconds');

const dataUri = (rel, mime) =>
  `data:${mime};base64,${readFileSync(join(root, rel)).toString('base64')}`;
const mark = dataUri('static/brand/balaur-mark-dark.svg', 'image/svg+xml');
const alegreya = dataUri('static/fonts/alegreya-latin.woff2', 'font/woff2');
const sourceSans = dataUri('static/fonts/source-sans-3-latin.woff2', 'font/woff2');
const mono = dataUri('static/fonts/jetbrains-mono-latin.woff2', 'font/woff2');
const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// The cards are authored against a 1600px-wide frame and scaled to whatever
// the engine is capturing at, so a change to OFFSCREEN_SIZE moves the type
// with it rather than leaving it stranded at its old pixel sizes.
const u = (px) => `${Math.round((px * W) / 1600)}px`;

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
    `body{padding:0 ${u(130)} ${u(96)};justify-content:center}
     .lock{display:flex;align-items:center;gap:${u(34)}}
     .lock img{width:${u(132)};height:${u(132)}}
     .lock h1{font-size:${u(116)};line-height:1}
     .ver{font-family:'JetBrains Mono',monospace;font-weight:500;font-size:${u(78)};
          color:#6fa4d8;margin:${u(30)} 0 0 ${u(166)};letter-spacing:0.01em}
     .url{position:absolute;left:${u(130)};bottom:${u(74)};font-family:'JetBrains Mono',monospace;
          font-size:${u(30)};color:#98a3ae}`,
  );

const sectionCard = (title, line) =>
  shell(
    `<img class="mark" src="${mark}" alt="">
     <h1>${escape(title)}</h1>
     <p>${escape(line)}</p>`,
    `body{padding:0 ${u(130)};justify-content:center}
     .mark{position:absolute;left:${u(130)};top:${u(96)};width:${u(64)};height:${u(64)};opacity:0.85}
     h1{font-size:${u(104)};line-height:1.02}
     p{font-size:${u(46)};line-height:1.3;color:#98a3ae;margin:${u(26)} 0 0}`,
  );

// The attribution a CC BY track asks for, drawn over the end card of the share
// cut alone: the reel the page embeds is silent, so a music credit on it would
// name something nobody can hear. Transparent everywhere but the line itself,
// so it composites over whatever the card is doing.
const creditCard = (text) => `<!doctype html>
<html><head><meta charset="utf-8"><style>
  @font-face{font-family:'Source Sans 3';font-weight:200 900;src:url('${sourceSans}') format('woff2')}
  html,body{margin:0;width:${W}px;height:${H}px;overflow:hidden;background:transparent}
  /* Held to the right half so it cannot run into the download URL sharing
     its baseline on the left; a long attribution wraps upward instead. */
  p{position:absolute;right:${u(104)};bottom:${u(74)};margin:0;text-align:right;
    max-width:44%;font-family:'Source Sans 3',sans-serif;font-size:${u(22)};
    line-height:1.4;color:#7d8894}
</style></head><body><p>${escape(text)}</p></body></html>`;

// The version is not repeated here. Set in Alegreya it would come out in old
// style figures, where 0.1.0 reads as o.1.o; the title card already carries it,
// in the mono face where the digits line up.
const endCard = () =>
  shell(
    `<div class="lock"><img src="${mark}" alt=""><h1>Balaur Engine</h1></div>
     <p>Pre-alpha, MIT, for macOS, Windows and Linux.</p>
     <div class="url">balaurengine.org/download</div>`,
    `body{padding:0 ${u(130)} ${u(96)};justify-content:center}
     .lock{display:flex;align-items:center;gap:${u(30)}}
     .lock img{width:${u(96)};height:${u(96)}}
     .lock h1{font-size:${u(88)};line-height:1}
     p{font-size:${u(42)};color:#98a3ae;margin:${u(28)} 0 0 ${u(126)}}
     .url{position:absolute;left:${u(130)};bottom:${u(74)};font-family:'JetBrains Mono',monospace;
          font-size:${u(38)};color:#6fa4d8}`,
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
const shot = (slug, html, size = [W, H], clear = false) => {
  chromeBin ??= chrome();
  const page = join(tmp, `${slug}.html`);
  const png = join(tmp, `${slug}.png`);
  writeFileSync(page, html);
  execFileSync(
    chromeBin,
    ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
     `--window-size=${size[0]},${size[1]}`, '--virtual-time-budget=8000',
     ...(clear ? ['--default-background-color=00000000'] : []),
     `--screenshot=${png}`, pathToFileURL(page).href],
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
  // The segments are concatenated by stream copy, which needs every one of
  // them the same size: a clip taken before OFFSCREEN_SIZE changed would
  // otherwise be spliced in and make a file no player agrees about.
  const [w, h] = execFileSync('ffprobe',
    ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height',
     '-of', 'default=nw=1:nk=1', src], {encoding: 'utf8'}).trim().split('\n').map(Number);
  if (w !== W || h !== H) {
    throw new Error(`${name}.mp4 is ${w}x${h} and the reel is ${W}x${H}; `
      + "retake it with the engine's scripts/showcase.sh");
  }
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

// The share cut. The reel is already 1920x1080, so this is no longer a
// reframe: what it adds is the music and the credit, which the copy the page
// embeds does not carry. `scale` stays as an assertion — a clip retaken at
// some other size would otherwise reach an upload silently mis-sized.
const shareDir = join(root, 'video-out');
mkdirSync(shareDir, {recursive: true});
const share = join(shareDir, `${NAME}-share.mp4`);
const PAD = `scale=${W}:${H}`;
const SHARE_V = ['-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-pix_fmt', 'yuv420p',
  '-movflags', '+faststart'];
if (audio) {
  const seconds = Number(
    execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration',
      '-of', 'default=nw=1:nk=1', mp4], {encoding: 'utf8'}).trim());
  // Held back by one fade so the line does not sit at full brightness while
  // the card behind it is still coming up out of black.
  const creditAt = (seconds - END_SECONDS + FADE).toFixed(2);
  const creditPng = credit ? shot('credit', creditCard(credit), [W, H], true) : null;
  // The track is looped and then cut to the reel, so a piece shorter than the
  // reel still covers it and a longer one is simply trimmed. loudnorm lands it
  // on -14 LUFS, which is what YouTube normalises to: hit it here and the
  // upload is left alone rather than turned down on the way in.
  const out = (seconds - AUDIO_TAIL - AUDIO_OUT).toFixed(2);
  ff(['-i', mp4,
      '-stream_loop', '-1', ...(audioStart ? ['-ss', String(audioStart)] : []), '-i', audio,
      // A bare still is one frame with no rate of its own, which the encoder
      // cannot resolve a timebase from; looped at the reel's rate it is a
      // stream like any other.
      ...(creditPng ? ['-loop', '1', '-framerate', String(FPS), '-i', creditPng] : []),
      '-filter_complex',
      // Chrome writes a pHYs chunk into the PNG, which ffmpeg reads as a
      // pixel aspect ratio. Overlay then reconciles the two branches' ratios
      // and lands on 1920x1081, an odd height that libx264 refuses. Square
      // pixels are pinned on both branches and again on the result, which is
      // the only combination that holds.
      `[0:v]${PAD}` +
        (creditPng
          ? `,setsar=1[base];[2:v]setsar=1[cr];` +
            `[base][cr]overlay=0:0:enable='gte(t,${creditAt})',setsar=1,scale=${W}:${H}[v];`
          : '[v];') +
        `[1:a]afade=t=in:st=0:d=${AUDIO_IN},` +
        `afade=t=out:st=${out}:d=${AUDIO_OUT},` +
        'loudnorm=I=-14:TP=-1.5:LRA=11[a]',
      '-map', '[v]', '-map', '[a]', '-t', String(seconds),
      ...SHARE_V, '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', share]);
} else {
  ff(['-i', mp4, '-vf', PAD, ...SHARE_V, '-an', share]);
}

rmSync(tmp, {recursive: true, force: true});
console.log(`share ${share}${audio ? ` with ${audio}` : ' (silent)'}${credit ? ' + credit' : ''}`);
