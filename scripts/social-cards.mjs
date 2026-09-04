#!/usr/bin/env node
// Render the per-page social cards — the 1200×630 image a link unfurls to on
// Slack, X, Discord and the rest — into static/img/social/, one per entry in
// CARDS. The card is a small HTML page, so it is set in the site's own fonts
// and colours (src/css/custom.css), screenshotted by a headless Chrome. That
// needs Chrome or Chromium installed (CHROME=/path/to/binary overrides the
// lookup) and the network, for Google Fonts. The PNGs are committed: a card
// changes only when a page's one-line pitch does, so this runs by hand:
//
//   yarn social-cards             # every card
//   yarn social-cards features    # one
import sharp from 'sharp';
import {execFileSync} from 'node:child_process';
import {existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {dirname, join} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'static', 'img', 'social');

// slug: [title, one line, path shown in the corner]. The title is the page's
// own heading; the line is its pitch, shorter than its description.
const CARDS = {
  home: ['A 2D & 3D game engine in Rust', 'Fully deterministic, with scripts that reload in milliseconds. Free and open source, MIT.', '/'],
  editor: ['The editor, in your browser', 'The same editor the desktop build ships, on WebAssembly. Open a scene, move a node, edit a script.', '/editor'],
  play: ['Balaur in the browser', 'The engine itself, compiled to WebAssembly, running a game on a canvas through WebGPU.', '/play'],
  code: ['For game developers', 'Nodes and scenes you know, scripts live in milliseconds, TOML scenes, one binary to ship.', '/code'],
  animate: ['For animators', 'Bones, mesh skinning with painted weights, IK and a timeline — on the rig that ships in the game.', '/animate'],
  multiplayer: ['Multiplayer', 'Same inputs, same bits, on every machine: a fixed tick, digests, replay, rollback.', '/multiplayer'],
  play: ['Play', 'The engine running in your browser: examples/hello on a canvas, through WebGPU.', '/play'],
  examples: ['Examples', 'Seven projects that ship with the engine: what each one shows, and the command that opens it.', '/examples'],
  compare: ['Compare', 'Balaur next to Godot, Bevy and Fyrox — honestly, as of September 2026.', '/compare'],
  faq: ['FAQ', 'Free? Which platforms? What language? Is it deterministic? The short answers.', '/faq'],
  features: ['Features', 'TOML scenes, Rune scripts with hot reload, deterministic 2D & 3D physics, animation, networking — and one file to ship.', '/features'],
  download: ['Download', 'One binary for macOS, Windows and Linux: the editor, the CLI and every game’s runtime.', '/download'],
  roadmap: ['Roadmap', 'What the engine does not do yet, and will.', '/docs/roadmap'],
  docs: ['Documentation', 'A node-based game engine in Rust, deterministic, with scripts that reload in milliseconds. The manual and the reference.', '/docs'],
  principles: ['Principles', 'Fast to run, fast to iterate, easy to use — and how the project is run.', '/docs/principles'],
  architecture: ['Architecture', 'Scripts, the language-neutral seam, the ECS core, and the plugins every subsystem is built as.', '/docs/architecture'],
  'built-on': ['Built on', 'The Rust libraries under the engine, and what each one does for it.', '/docs/built-on'],
  reference: ['Reference', 'Every component, asset type and script module, read from a booted engine.', '/docs/reference'],
  changelog: ['Changelog', 'What each release of the engine added.', '/docs/changelog'],
  crates: ['Crates', 'The Rust workspace, crate by crate.', '/docs/crates'],
  scenes: ['Scenes and nodes', 'Nodes are entities. Scenes are plain TOML.', '/docs/manual/scenes'],
  scripting: ['Scripting', 'Rune scripts, hot reload in milliseconds, and a debugger in the editor.', '/docs/manual/scripting'],
  shaders: ['Shaders and materials', 'WESL shaders and material assets on wgpu.', '/docs/manual/shaders'],
  animation: ['Animation', 'Clips, tweens, skeletons, skins and IK, in 2D and 3D.', '/docs/manual/animation'],
  physics: ['Physics', 'Deterministic 2D and 3D physics on a fixed 60 Hz step.', '/docs/manual/physics'],
  ui: ['UI', 'Widgets for game HUDs, immediate-mode UI for tools.', '/docs/manual/ui'],
  input: ['Input', 'Actions over keyboard, mouse, gamepads and touch — one snapshot per frame.', '/docs/manual/input'],
  networking: ['Networking', 'HTTP, websockets and QUIC, delivered once per tick and replayable.', '/docs/manual/networking'],
  gamend: ['Gamend', 'Login, REST, realtime rooms and server hooks.', '/docs/manual/gamend'],
  stores: ['Stores', 'Sign-in, achievements, cloud saves and purchases — one module over every store.', '/docs/manual/stores'],
  extensions: ['Modules and extensions', 'Modules linked in, extensions loaded at run time. One plugin trait.', '/docs/manual/extensions'],
  editor: ['The editor', 'A Balaur project that edits Balaur projects.', '/docs/manual/editor'],
  determinism: ['Determinism', 'Same inputs, same bits, on every platform.', '/docs/manual/determinism'],
  shipping: ['Shipping a game', 'A pack of bytecode and assets, fused onto a runtime: one file to ship.', '/docs/manual/shipping'],
  rendering: ['Rendering', '2D lights, occluders and shadows, and post-processing the frame resolves through.', '/docs/manual/rendering'],
  stores: ['Stores', 'Sign-in, achievements, leaderboards, cloud saves and purchases — one module over every store.', '/docs/manual/stores'],
};

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const mark = 'data:image/svg+xml;base64,' + readFileSync(join(root, 'static', 'brand', 'balaur-mark-light.svg')).toString('base64');
// Long headings step down so the widest still fits the card's width.
const titleSize = (title) => (title.length <= 12 ? 108 : title.length <= 18 ? 88 : 72);

const page = (title, line, path) => `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Alegreya:wght@700&family=Source+Sans+3:wght@400&family=JetBrains+Mono:wght@500&display=block">
<style>
  html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; }
  body {
    box-sizing: border-box; padding: 64px 80px 60px;
    display: flex; flex-direction: column;
    font-family: 'Source Sans 3', sans-serif; color: #14181d;
    background:
      radial-gradient(ellipse 70% 60% at 50% 115%, rgba(47, 106, 158, 0.16), transparent),
      linear-gradient(180deg, #ffffff 0%, #eef1f4 100%);
  }
  .brand { display: flex; align-items: center; gap: 18px; margin-bottom: 26px; }
  .brand img { width: 56px; height: 56px; }
  .brand span { font-family: 'Alegreya', serif; font-weight: 700; font-size: 40px; letter-spacing: 0.01em; }
  .rule { height: 2px; background: #14181d; margin-bottom: 40px; }
  h1 { font-family: 'Alegreya', serif; font-weight: 700; font-size: ${titleSize(title)}px; line-height: 1.02; letter-spacing: -0.01em; margin: 0 0 22px; }
  p { font-size: 38px; line-height: 1.32; color: #5b6670; margin: 0; max-width: 1000px; }
  .url { margin-top: auto; font-family: 'JetBrains Mono', monospace; font-weight: 500; font-size: 26px; color: #5b6670; }
</style></head>
<body>
  <div class="brand"><img src="${mark}" alt=""><span>Balaur</span></div>
  <div class="rule"></div>
  <h1>${escape(title)}</h1>
  <p>${escape(line)}</p>
  <div class="url">balaurengine.org${escape(path)}</div>
</body></html>
`;

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

const only = process.argv.slice(2);
const slugs = only.length ? only : Object.keys(CARDS);
for (const slug of slugs) if (!CARDS[slug]) throw new Error(`no card named ${slug}`);

const bin = chrome();
const tmp = mkdtempSync(join(tmpdir(), 'balaur-cards-'));
mkdirSync(out, {recursive: true});
for (const slug of slugs) {
  const [title, line, path] = CARDS[slug];
  const html = join(tmp, `${slug}.html`);
  const shot = join(tmp, `${slug}.png`);
  writeFileSync(html, page(title, line, path));
  execFileSync(
    bin,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      '--window-size=1200,630',
      // Keep rendering until the fonts have arrived.
      '--virtual-time-budget=10000',
      `--screenshot=${shot}`,
      pathToFileURL(html).href,
    ],
    {stdio: 'ignore'},
  );
  // A palette PNG: a quarter of the size of Chrome's RGBA, no visible change on flat colour and text.
  await sharp(shot).png({palette: true, quality: 95, compressionLevel: 9}).toFile(join(out, `${slug}.png`));
  console.log(`social: ${slug}.png`);
}
rmSync(tmp, {recursive: true, force: true});
