#!/usr/bin/env node
// Write a lossless WebP beside every screenshot PNG under static/img/manual
// and static/img/editor — a third of the bytes, the same pixels. The PNGs
// are the source: the engine's showcase pipeline writes them, named like
// their clips, and the pages reference the .webp, so a fresh set of
// screenshots needs nothing but a rebuild. Runs before start and build; the
// outputs are not committed, and one newer than its PNG is left alone.
import sharp from 'sharp';
import {existsSync, mkdirSync, readdirSync, statSync} from 'node:fs';
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
// Posters for the clips. A poster is the still behind a play button, drawn at
// about 380 CSS px on a phone and 580 on a desktop, so the lossless 1600 px
// screenshot above is several times the pixels any screen asks for and many
// times the bytes: it was the largest thing the home page fetched. One lossy
// 1000 px copy is exactly a 2x phone and near enough a 2x desktop for a still
// that a video replaces. A clip's poster is named after its video, so the
// videos are the list.
const videoDir = join(root, 'static', 'video');
const posterDir = join(root, 'static', 'img', 'poster');
if (!existsSync(posterDir)) mkdirSync(posterDir, {recursive: true});
let posters = 0;
let postersKept = 0;
let posterBefore = 0;
let posterAfter = 0;
const clips = [
  ...new Set(
    readdirSync(videoDir)
      .filter((f) => /\.(mp4|webm)$/.test(f))
      .map((f) => f.replace(/\.(mp4|webm)$/, '')),
  ),
].sort();
for (const name of clips) {
  const src = join(root, 'static', 'img', 'manual', `${name}.webp`);
  if (!existsSync(src)) continue;
  const out = join(posterDir, `${name}.webp`);
  if (existsSync(out) && statSync(out).mtimeMs >= statSync(src).mtimeMs) {
    postersKept += 1;
    continue;
  }
  await sharp(src).resize({width: 1000, withoutEnlargement: true}).webp({quality: 80, effort: 6}).toFile(out);
  posterBefore += statSync(src).size;
  posterAfter += statSync(out).size;
  posters += 1;
}

const kb = (n) => `${Math.round(n / 1024)} KB`;
console.log(
  written
    ? `images: ${written} webp written, ${kb(before)} of png → ${kb(after)}; ${kept} up to date`
    : `images: ${kept} webp up to date`,
);
console.log(
  posters
    ? `posters: ${posters} written, ${kb(posterBefore)} → ${kb(posterAfter)}; ${postersKept} up to date`
    : `posters: ${postersKept} up to date`,
);
