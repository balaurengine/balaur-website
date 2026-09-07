#!/usr/bin/env node
// Prose lints for the blog and the manual. They encode one rule: a post is
// facts, not prose. Every number here was set from the posts that read right
// (blog/2026-09-04-gpu-skinning.mdx, audio-buses.mdx): a post is under 300
// words of prose, a sentence under 35 words, a paragraph under 60, and at
// most four paragraphs sit outside bullets. Over any of them, CI is red and
// the fix is to cut, not to argue.
//
// Prose is what is left after front matter, code fences, images, tags,
// tables, headings and link URLs are removed; inline code counts as one word.
//
// The same run feeds each page through avoid-ai-writing-detector, the
// mechanical half of the avoid-ai-writing skill: the tier word lists, hollow
// intensifiers, template phrases, transition openers, "it's not X, it's Y",
// bold overuse, chatbot artifacts and the rest. Its P0 and P1 findings are
// errors; P2, P3 and the stylometric heuristics are reports, printed with
// --reports and never failing, because a heuristic that fails the build
// teaches people to game the heuristic.
//
//   node scripts/lint-prose.mjs            # blog/ and docs/, exit 1 on error
//   node scripts/lint-prose.mjs --reports  # show P2/P3 and stylometric notes
//   node scripts/lint-prose.mjs blog/x.mdx # one file
import {existsSync, readdirSync, readFileSync, statSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const detector = await import('avoid-ai-writing-detector')
  .then((m) => (m.default?.analyzeText ? m.default : m.default?.default))
  .catch(() => null);
if (!detector?.analyzeText) {
  console.error('avoid-ai-writing-detector is not installed: run `yarn install`');
  process.exit(2);
}
// Statistical signals over the whole document. Useful to read, wrong to fail
// a build on: a short factual post trips them by being short and factual.
// Words the detector reads as filler that are names here. `showcase` is the
// engine's screenshot pipeline (scripts/showcase.sh); `features` is the cargo
// noun and the /features page, never the inflated verb.
const DOMAIN_TERMS = new Set(['showcase', 'features']);
const HEURISTIC_TYPES = new Set([
  'uniformity', 'low-ttr', 'punct-distribution', 'fnword-trigram-entropy',
  'cross-para-burstiness', 'normalization-flag',
]);

const PROFILES = {
  // The blog: short by rule.
  blog: {words: 300, sentence: 35, paragraph: 60, paragraphs: 4, truncate: true},
  // The manual: as long as it needs to be, but in short sentences.
  docs: {words: Infinity, sentence: 35, paragraph: 90, paragraphs: Infinity, truncate: false},
};
const TITLE_MAX = 51;       // + " | Balaur" is the 60 a result page shows
const DESCRIPTION_MAX = 160;

// Written by a generator or synced from the engine repo; a fix goes there.
const SKIP = [
  /^docs\/reference\//, /^docs\/roadmap\.mdx$/,
  /^docs\/benchmarks\.md$/, /^docs\/manual\/_features\.mdx$/,
];

// Throat-clearing and filler. A match is an error; the fix is to delete it.
const PHRASES = [
  /\bhonest(ly)?\b/i, /\bactually\b/i, /\btruly\b/i, /\bgenuinely\b/i,
  /\bit(?:'s| is) worth\b/i, /\bworth (?:noting|a look|mentioning)\b/i,
  /\bthe question (?:was|is)\b/i, /\blet's\b/i, /\bto be (?:clear|fair)\b/i,
  /\bsimply put\b/i, /\bin order to\b/i, /\bat its core\b/i,
  /\bleverag(?:e|es|ed|ing)\b/i, /\bdelv(?:e|es|ed|ing)\b/i, /\bseamless(?:ly)?\b/i,
  /\bgame[- ]chang(?:er|ing)\b/i, /\bwhich matters more than it sounds\b/i,
];

const findings = [];
const err = (file, line, rule, message) => findings.push({file, line, rule, message, level: 'ERROR'});
const report = (file, line, rule, message) => findings.push({file, line, rule, message, level: 'report'});

function frontMatter(src) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!m) return {fm: {}, end: 0};
  const fm = {};
  for (const l of m[1].split('\n')) {
    const kv = l.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
  }
  return {fm, end: m[0].length};
}

// Prose units with their source line: one per paragraph or bullet.
function units(src) {
  const lines = src.split('\n');
  const out = [];
  let inFm = false, inFence = false, inTag = false;
  let buf = [], bufLine = 0, bullet = false;
  const flush = () => { if (buf.length) out.push({line: bufLine, bullet, text: buf.join(' ')}); buf = []; };
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (i === 0 && l.trim() === '---') { inFm = true; continue; }
    if (inFm) { if (l.trim() === '---') inFm = false; continue; }
    if (/^\s*(```|~~~)/.test(l)) { inFence = !inFence; flush(); continue; }
    if (inFence) continue;
    // A JSX/HTML block: from an opening tag at line start to its closing tag.
    if (!inTag && /^\s*<[A-Za-z]/.test(l) && !/<\/[A-Za-z]+>\s*$|\/>\s*$/.test(l)) { inTag = true; flush(); continue; }
    if (inTag) { if (/^\s*<\/[A-Za-z]+>\s*$|^\s*\/?>\s*$|\/>\s*$/.test(l)) inTag = false; continue; }
    if (/^\s*<[A-Za-z]/.test(l) || /^\s*\{\/\*/.test(l) || /^\s*(import|export) /.test(l) || /^\s*!\[/.test(l) || /^\s*\|/.test(l) || /^\s*#/.test(l) || /^\s*:::/.test(l)) { flush(); continue; }
    if (l.trim() === '') { flush(); continue; }
    const isBullet = /^\s*(-|\*|\d+\.)\s+/.test(l);
    if (isBullet) { flush(); bufLine = i + 1; bullet = true; }
    else if (!buf.length) { bufLine = i + 1; bullet = false; }
    const t = l
      .replace(/^\s*(-|\*|\d+\.)\s+/, '')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/`[^`]*`/g, 'X')
      .replace(/<[^>]+>/g, '')
      .replace(/\*\*|__/g, '')
      .replace(/\*/g, '');   // *italic* at a sentence start would block the split
    buf.push(t.trim());
  }
  flush();
  return out;
}

const words = (t) => t.split(/\s+/).filter(Boolean).length;
const sentences = (t) =>
  t.replace(/\b(e\.g|i\.e|vs|etc|cf)\./gi, '$1')
    .split(/(?<=[.!?])\s+(?=[A-Za-z0-9"'X[(`])/)
    .map((s) => s.trim())
    .filter(Boolean);

function lint(file) {
  const rel = relative(ROOT, file);
  const profile = rel.startsWith('blog/') ? PROFILES.blog : PROFILES.docs;
  const src = readFileSync(file, 'utf8');
  const {fm} = frontMatter(src);

  if (fm.title && fm.title.length > TITLE_MAX)
    err(rel, 2, 'title-length', `title is ${fm.title.length} characters; ${TITLE_MAX} is the most that shows with " | Balaur"`);
  if (fm.description === undefined && rel.startsWith('blog/'))
    err(rel, 1, 'description', 'no description in the front matter');
  if (fm.description && fm.description.length > DESCRIPTION_MAX)
    err(rel, 2, 'description-length', `description is ${fm.description.length} characters; ${DESCRIPTION_MAX} is where a result page cuts it`);
  if (fm.image) {
    const p = join(ROOT, 'static', fm.image);
    const ok = existsSync(p) || (p.endsWith('.webp') && existsSync(p.replace(/\.webp$/, '.png')));
    if (!ok) err(rel, 1, 'image-missing', `image ${fm.image} is not under static/`);
  }
  if (profile.truncate && !src.includes('truncate'))
    err(rel, 1, 'truncate', 'no {/* truncate */} marker: the whole post is the list excerpt');

  const us = units(src);
  const total = us.reduce((a, u) => a + words(u.text), 0);
  if (total > profile.words)
    err(rel, 1, 'length', `${total} words of prose; the limit is ${profile.words}. Cut, or split the post`);

  const paras = us.filter((u) => !u.bullet);
  if (paras.length > profile.paragraphs)
    err(rel, paras[profile.paragraphs].line, 'paragraphs', `${paras.length} paragraphs outside bullets; the limit is ${profile.paragraphs}. Make the rest a list`);
  for (const p of paras) {
    const n = words(p.text);
    if (n > profile.paragraph) err(rel, p.line, 'paragraph-length', `paragraph is ${n} words; the limit is ${profile.paragraph}`);
  }
  for (const u of us) {
    for (const s of sentences(u.text)) {
      const n = words(s);
      if (n > profile.sentence) err(rel, u.line, 'sentence-length', `${n}-word sentence; the limit is ${profile.sentence}: "${s.slice(0, 60)}…"`);
    }
    for (const re of PHRASES) {
      const m = u.text.match(re);
      if (m) err(rel, u.line, 'phrase', `"${m[0]}": say the fact without it`);
    }
  }
  // An em dash is a splice. The one place it is typography is the lead of a
  // list item: `- **Term** — text` or `- [label](url) — text`.
  const lines = src.split('\n');
  let fence = false;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (/^\s*(```|~~~)/.test(l)) fence = !fence;
    if (fence || !l.includes('—')) continue;
    if (/^\s*(-|\*|\d+\.)\s+(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|`[^`]+`)\s*—\s/.test(l)) continue;
    err(rel, i + 1, 'em-dash', 'em dash in prose; use a comma, a colon, a period or a list');
  }

  // The detector reads markdown, so it gets the page with only the MDX
  // machinery removed: front matter, code fences, {/* */}, imports and tags.
  const md = src
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
    .replace(/(```|~~~)[\s\S]*?\1/g, '')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/^\s*(import|export)\s.*$/gm, '')
    .replace(/<[^>]+>/g, '');
  const lower = src.toLowerCase();
  for (const issue of detector.analyzeText(md).issues ?? []) {
    if (DOMAIN_TERMS.has(String(issue.text ?? '').toLowerCase())) continue;
    const at = issue.text ? lower.indexOf(String(issue.text).toLowerCase()) : -1;
    const line = at >= 0 ? src.slice(0, at).split('\n').length : 1;
    const label = detector.TYPE_LABELS?.[issue.type] ?? issue.type;
    const message = `"${issue.text}" (${label}): ${issue.suggestion ?? 'cut it'}`;
    const hard = (issue.severity === 'critical' || issue.severity === 'high') && !HEURISTIC_TYPES.has(issue.type);
    (hard ? err : report)(rel, line, `ai:${issue.type}`, message);
  }
}

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.mdx?$/.test(e)) out.push(p);
  }
  return out;
}

const argv = process.argv.slice(2);
const showReports = argv.includes('--reports');
const args = argv.filter((a) => !a.startsWith('--'));
const files = args.length
  ? args.map((a) => join(ROOT, a))
  : [...walk(join(ROOT, 'blog')), ...walk(join(ROOT, 'docs'))];
let linted = 0;
for (const f of files) {
  const rel = relative(ROOT, f);
  if (SKIP.some((re) => re.test(rel))) continue;
  lint(f);
  linted += 1;
}
findings.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line);
const errors = findings.filter((f) => f.level === 'ERROR');
const reports = findings.filter((f) => f.level === 'report');
for (const f of errors) console.log(`ERROR  ${f.file}:${f.line}  [${f.rule}] ${f.message}`);
if (showReports) for (const f of reports) console.log(`report ${f.file}:${f.line}  [${f.rule}] ${f.message}`);
console.log(`\n${linted} files · ${errors.length} errors · ${reports.length} reports${showReports ? '' : ' (--reports to list)'}`);
process.exit(errors.length ? 1 : 0);
