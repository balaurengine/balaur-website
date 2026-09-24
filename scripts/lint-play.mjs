#!/usr/bin/env node
// The web build under static/play is whole.
//
// `balaur.js` is an ES module, and its imports are static: one that 404s
// stops the module evaluating, so /editor and /play draw nothing while the
// build that shipped them stays green. wasm-bindgen writes a
// `snippets/<crate>-<hash>/inline0.js` beside the glue for every `inline_js`
// in the engine, and scripts/sync-play.sh brings the whole bundle over rather
// than a list, so this is what says the two agree.
//
//   node scripts/lint-play.mjs
import {existsSync, readFileSync, readdirSync, statSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PLAY = join(ROOT, 'static', 'play');
const errors = [];
const here = (f) => existsSync(join(PLAY, f)) && statSync(join(PLAY, f)).size > 0;

for (const f of ['balaur.js', 'balaur_bg.wasm', 'VERSION']) {
  if (!here(f)) errors.push(`static/play/${f} is missing or empty`);
}
// The editor and the examples: one pack alone is a sync that half ran.
const packs = existsSync(PLAY) ? readdirSync(PLAY).filter((f) => f.endsWith('.bpak')) : [];
if (packs.length < 2) errors.push(`static/play holds ${packs.length} pack(s); the editor and the examples are expected`);

if (here('balaur.js')) {
  const glue = readFileSync(join(PLAY, 'balaur.js'), 'utf8');
  for (const m of glue.matchAll(/from\s+'(\.\/[^']+)'/g)) {
    if (here(m[1].slice(2))) continue;
    errors.push(`static/play/balaur.js imports ${m[1]}, which is not beside it`);
  }
}

for (const e of errors) console.log(`ERROR  ${e}`);
console.log(`\n${packs.length} packs · ${errors.length} errors`);
process.exit(errors.length ? 1 : 0);
