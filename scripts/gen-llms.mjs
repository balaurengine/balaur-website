#!/usr/bin/env node
// Write static/llms.txt — an index of the site for AI search engines and
// assistants, in the llms.txt convention — and static/llms-full.txt, the
// hand-written docs and the reference in one Markdown file. Both are derived
// from the docs' front matter and bodies on every build and not committed.
import {readdirSync, readFileSync, statSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const site = 'https://balaurengine.org';

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : /\.mdx?$/.test(f) && !f.startsWith('_') ? [p] : [];
  });
}
function frontMatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  const fm = {};
  if (m) for (const line of m[1].split('\n')) {
    const [, k, v] = line.match(/^(\w+):\s*(.*)$/) ?? [];
    if (k) fm[k] = v.replace(/^"(.*)"$/, '$1');
  }
  return {fm, body: m ? text.slice(m[0].length) : text};
}
// Strip what only a browser can render: imports, components, raw HTML blocks.
const clean = (body) =>
  body
    .split('\n')
    .filter((l) => !/^(import |<Clip|<figure|<\/?div|<\/figure|:::)/.test(l.trim()))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
const title = (fm, body) => fm.title ?? body.match(/^# (.*)$/m)?.[1]?.replace(/[`<>]/g, '') ?? 'Untitled';

const docs = [];
for (const file of walk(join(root, 'docs')).sort()) {
  const rel = relative(join(root, 'docs'), file).replace(/\.mdx?$/, '');
  const {fm, body} = frontMatter(readFileSync(file, 'utf8'));
  const slug = fm.slug ? fm.slug.replace(/^\//, '') : rel;
  const url = `${site}/docs/${slug}/`;
  docs.push({url, title: title(fm, body), description: fm.description ?? '', body: clean(body), section: rel.startsWith('reference/') ? 'Reference' : rel.startsWith('manual/') ? 'Manual' : 'Docs'});
}
const pages = [];
for (const file of walk(join(root, 'src', 'pages')).sort()) {
  const name = relative(join(root, 'src', 'pages'), file).replace(/\.mdx?$/, '');
  const {fm, body} = frontMatter(readFileSync(file, 'utf8'));
  pages.push({url: `${site}/${name}/`, title: title(fm, body), description: fm.description ?? '', body: clean(body)});
}

const line = (d) => `- [${d.title}](${d.url})${d.description ? `: ${d.description}` : ''}`;
const index = [
  '# Balaur',
  '',
  '> Balaur is a 2D & 3D node-based game engine written in Rust, fully deterministic, with Rune scripts that hot reload in milliseconds and an editor that is itself a Balaur project. Free and open source, MIT.',
  '',
  `Site: ${site}/ · Source: https://github.com/balaurengine/balaur · Full text: ${site}/llms-full.txt`,
  '',
  '## Pages',
  '',
  ...pages.map(line),
  '',
  ...['Docs', 'Manual', 'Reference'].flatMap((s) => [`## ${s}`, '', ...docs.filter((d) => d.section === s).map(line), '']),
].join('\n');
const full = [
  index,
  '',
  '---',
  '',
  ...[...pages, ...docs].flatMap((d) => [`# ${d.title}`, '', `Source: ${d.url}`, '', d.body, '', '---', '']),
].join('\n');

writeFileSync(join(root, 'static', 'llms.txt'), index + '\n');
writeFileSync(join(root, 'static', 'llms-full.txt'), full + '\n');
console.log(`llms: ${pages.length} pages, ${docs.length} docs → static/llms.txt (${Math.round(index.length / 1024)} KB), llms-full.txt (${Math.round(full.length / 1024)} KB)`);
