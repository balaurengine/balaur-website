#!/usr/bin/env node
// Measure the web build the site serves — static/play/balaur_bg.wasm raw,
// gzipped and brotli-compressed — into src/play-size.json, which the
// manual's Build size page renders. Keyed on src/play-version.json, so the
// slow brotli pass (quality 11, the level a static host uses) runs only when
// the build changes. The JSON is committed, like play-version.json.
import {brotliCompressSync, constants, gzipSync} from 'node:zlib';
import {existsSync, readFileSync, writeFileSync} from 'node:fs';

const wasm = 'static/play/balaur_bg.wasm';
const version = 'static/play/VERSION';
const out = 'src/play-size.json';

const {v} = JSON.parse(readFileSync('src/play-version.json', 'utf8'));
const have = existsSync(out) ? JSON.parse(readFileSync(out, 'utf8')) : null;
if (have?.v === v) process.exit(0);
if (!existsSync(wasm)) {
  console.warn(`no ${wasm}; keeping ${out}`);
  process.exit(0);
}

const bytes = readFileSync(wasm);
const size = {
  v,
  engine: existsSync(version) ? readFileSync(version, 'utf8').trim() : null,
  raw: bytes.length,
  gzip: gzipSync(bytes, {level: 9}).length,
  brotli: brotliCompressSync(bytes, {
    params: {
      [constants.BROTLI_PARAM_QUALITY]: 11,
      [constants.BROTLI_PARAM_SIZE_HINT]: bytes.length,
    },
  }).length,
};
writeFileSync(out, JSON.stringify(size, null, 2) + '\n');
const mb = (n) => (n / 1048576).toFixed(1);
console.log(`play size ${mb(size.raw)} MB raw, ${mb(size.gzip)} MB gzip, ${mb(size.brotli)} MB brotli`);
