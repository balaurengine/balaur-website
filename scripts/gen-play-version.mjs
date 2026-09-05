// Stamp the web build with a content hash so the page loads `balaur.js`, the
// wasm module and the packs as one matching set. The CDN caches `.js` for
// hours and `.wasm` for minutes; without the stamp a deploy could pair an old
// glue with a new module and fail with a missing wasm-bindgen export.
import {createHash} from 'node:crypto';
import {existsSync, readdirSync, readFileSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

const dir = 'static/play';
const hash = createHash('sha256');
for (const name of readdirSync(dir).sort()) {
  if (/\.(js|wasm|bpak)$/.test(name)) hash.update(name).update(readFileSync(join(dir, name)));
}
const v = hash.digest('hex').slice(0, 12);
const out = 'src/play-version.json';
const text = JSON.stringify({v}, null, 2) + '\n';
if (!existsSync(out) || readFileSync(out, 'utf8') !== text) {
  writeFileSync(out, text);
  console.log(`play version ${v}`);
}
