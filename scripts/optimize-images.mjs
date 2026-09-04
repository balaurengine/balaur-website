#!/usr/bin/env node
// Write a lossless WebP beside every screenshot PNG under static/img/manual
// and static/img/editor — a third of the bytes, the same pixels. The PNGs
// are the source: the engine's showcase pipeline writes them, named like
// their clips, and the pages reference the .webp, so a fresh set of
// screenshots needs nothing but a rebuild. Runs before start and build; the
// outputs are not committed, and one newer than its PNG is left alone.
import sharp from 'sharp';
import {existsSync, readdirSync, statSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dirs = ['manual', 'editor'].map((d) => join(root, 'static', 'img', d));

let written = 0;
let kept = 0;
let before = 0;
let after = 0;
for (const dir of dirs) {
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.png')).sort()) {
    const png = join(dir, file);
    const webp = png.replace(/\.png$/, '.webp');
    if (existsSync(webp) && statSync(webp).mtimeMs >= statSync(png).mtimeMs) {
      kept += 1;
      continue;
    }
    await sharp(png).webp({lossless: true, effort: 6}).toFile(webp);
    before += statSync(png).size;
    after += statSync(webp).size;
    written += 1;
  }
}
const kb = (n) => `${Math.round(n / 1024)} KB`;
console.log(
  written
    ? `images: ${written} webp written, ${kb(before)} of png → ${kb(after)}; ${kept} up to date`
    : `images: ${kept} webp up to date`,
);
