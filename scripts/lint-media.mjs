#!/usr/bin/env node
// Two lints over the pictures and clips the pages show.
//
// **Nothing is kept that nothing shows.** Every committed file under
// static/img and static/video is named by a page, a component or a script, or
// it is dead weight in the repository and in every clone of it. The engine's
// scripts/showcase.sh renders most of them, so a take that outlives the page
// it was added for is caught here rather than a year later.
//
// **Nothing is shown that is not there.** A `/img/...` or `/video/...` path in
// a page, and a `<Clip name="x"/>`, name files that exist. Docusaurus serves a
// missing one as a 404 and the build stays green.
//
// A name is matched loosely: a stem counts as used when it appears as a word
// anywhere in the source, because a path may be built from a prop
// (`<Clip name="x"/>`, `image: 'x'`). That errs towards keeping a file, which
// is the safe direction for a lint that deletes nothing itself.
//
// What scripts/optimize-images.mjs writes is skipped: static/img/poster is its
// output and gitignored, and a .webp beside a .png is too.
//
//   node scripts/lint-media.mjs
import {existsSync, readdirSync, readFileSync, statSync} from 'node:fs';
import {dirname, extname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
// static/play is an engine build, not media, and it is megabytes of it.
const MEDIA = ['static/img', 'static/video'];
const SOURCE = ['docs', 'blog', 'src', 'scripts', 'docusaurus.config.ts', 'sidebars.ts'];
const SOURCE_EXT = /\.(mdx?|tsx?|jsx?|mjs|css|json|html)$/;
// This file's own examples are not references.
const SELF = 'scripts/lint-media.mjs';

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir)) {
    if (e.startsWith('.')) continue;
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const sources = [];
for (const s of SOURCE) {
  const p = join(ROOT, s);
  if (!existsSync(p)) continue;
  if (statSync(p).isFile()) sources.push(p);
  else sources.push(...walk(p).filter((f) => SOURCE_EXT.test(f)));
}
const text = sources.map((f) => readFileSync(f, 'utf8')).join('\n');
const words = new Set(text.match(/[A-Za-z0-9_-]+/g) ?? []);
const errors = [];

// Written by scripts/optimize-images.mjs from a committed .png beside it.
const generated = (path) =>
  path.includes('/static/img/poster/') ||
  (extname(path) === '.webp' && existsSync(path.replace(/\.webp$/, '.png')));

const files = MEDIA.flatMap((d) => walk(join(ROOT, d))).filter((f) => !generated(f));
const stems = new Map();
for (const f of files) {
  const name = f.slice(f.lastIndexOf('/') + 1);
  const stem = name.slice(0, name.length - extname(name).length);
  if (!stems.has(stem)) stems.set(stem, []);
  stems.get(stem).push(relative(ROOT, f));
}
for (const [stem, where] of [...stems].sort()) {
  if (words.has(stem)) continue;
  errors.push(`${where[0]}  [unused-media] nothing names ${stem}; delete it, or show it`);
}

// A path a page names is there, or the .png it is written from is.
const there = (url) =>
  existsSync(join(ROOT, 'static', url)) ||
  existsSync(join(ROOT, 'static', url.replace(/\.webp$/, '.png')));

for (const f of sources) {
  const rel = relative(ROOT, f);
  if (rel === SELF) continue;
  const body = readFileSync(f, 'utf8');
  for (const m of body.matchAll(/["'(](\/(?:img|video)\/[\w./-]+)/g)) {
    if (there(m[1])) continue;
    errors.push(`${rel}  [missing-media] ${m[1]} is not in static/`);
  }
  // A clip is two videos and the still its poster is written from.
  for (const m of body.matchAll(/<Clip\s[^>]*name=["']([\w-]+)["']/g)) {
    for (const want of [`/video/${m[1]}.webm`, `/video/${m[1]}.mp4`, `/img/manual/${m[1]}.png`]) {
      if (there(want)) continue;
      errors.push(`${rel}  [missing-media] <Clip name="${m[1]}"/> wants ${want}`);
    }
  }
}

for (const e of errors) console.log(`ERROR  ${e}`);
console.log(`\n${files.length} media files · ${errors.length} errors`);
process.exit(errors.length ? 1 : 0);
