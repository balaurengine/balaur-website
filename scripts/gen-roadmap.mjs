#!/usr/bin/env node
// Writes docs/roadmap.mdx from the engine's docs/ROADMAP.md.
//
// That file is the source of truth for the whole card: which milestones exist,
// which items are in them, in what order, behind which plan, and the sentence
// each one reads. A card is one sentence and at most 25 words, checked here, so
// the engine file cannot grow a paragraph the page then has to carry.
//
// This repository owns only what is about the site: the page's frontmatter, and
// the screenshot and posts a built item shows, in src/data/roadmap-copy.mjs.
// The title is the join, so renaming one on either side without the other fails
// rather than dropping a card.
//
// The post pairing is checked both ways: every item in a `built` milestone
// needs a `shots` entry, and every post under blog/ has to be named by one or
// listed in `essays` — so a feature ships with a picture and a post, and a post
// is about something the roadmap has a row for.
//
// Usage:
//   node scripts/gen-roadmap.mjs            write docs/roadmap.mdx
//   node scripts/gen-roadmap.mjs --check    fail if the file is not what this
//                                           would write (CI, and `yarn build`)
//
// The engine file comes from BALAUR_REPO if that is set, and otherwise from
// reference/roadmap.md, which scripts/sync-docs.sh fetches and this repository
// commits — so a build with no network still has one.

import {readdirSync, readFileSync, writeFileSync, existsSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'docs/roadmap.mdx');
const BLOG = join(ROOT, 'blog');
const SYNCED = join(ROOT, 'reference/roadmap.md');
const PLAN_BASE = 'https://github.com/balaurengine/balaur/blob/main/docs/';

const fail = (msg) => {
  console.error(`gen-roadmap: ${msg}`);
  process.exit(1);
};

function sourcePath() {
  if (process.env.BALAUR_REPO) {
    return join(process.env.BALAUR_REPO, 'docs/ROADMAP.md');
  }
  return SYNCED;
}

const cells = (line) => line.slice(1, line.lastIndexOf('|')).split(' | ').map((c) => c.trim());
const isRule = (line) => /^\|\s*(Item|Milestone|:?-{3,})/.test(line);

const STATES = ['built', 'building', 'planned'];

// The `## Milestones` table: `| **0.2** | building | What it is |`, in tab
// order. Every item row names one of these, so the two tables cannot drift
// apart.
function parseMilestones(md) {
  const out = [];
  let inside = false;
  for (const line of md.split('\n')) {
    const heading = /^## (.+?)\s*$/.exec(line);
    if (heading) {
      if (inside) break;
      inside = heading[1] === 'Milestones';
      continue;
    }
    if (!inside || !line.startsWith('| ') || isRule(line)) continue;
    const row = cells(line);
    if (row.length !== 3) fail(`a milestone needs three columns, got ${row.length}`);
    const [id, state, title] = row;
    const bare = /^\*\*(.+?)\*\*$/.exec(id);
    if (!bare) fail(`a milestone is "**0.2**", got ${id}`);
    if (!STATES.includes(state)) fail(`a milestone state is ${STATES.join(', ')}, got "${state}"`);
    out.push({id: bare[1], state, title, items: []});
  }
  if (!out.length) fail('no `## Milestones` table');
  return out;
}

// One row: `| **Title** — text | 0.2 | [PLAN-x.md](PLAN-x.md) |`, where the
// milestone is one from the table above, or that milestone in parentheses for
// work the engine tracks and this page does not. The text after the dash is
// what the card says, so it is measured and turned into JSX here.
function parseRoadmap(md, milestones) {
  const by = new Map(milestones.map((m) => [m.id, m]));
  let group = null;
  md.split('\n').forEach((line, i) => {
    const heading = /^## (.+?)\s*$/.exec(line);
    if (heading) {
      group = heading[1] === 'Milestones' ? null : heading[1];
      return;
    }
    if (!group || !line.startsWith('| ') || isRule(line)) return;
    const row = cells(line);
    if (row.length !== 3) fail(`${i + 1}: a row needs three columns, got ${row.length}`);
    const [item, milestone, plan] = row;
    if (/^\(.+\)$/.test(milestone)) {
      const inner = milestone.slice(1, -1);
      if (!by.has(inner)) fail(`${i + 1}: milestone "${inner}" is not in the Milestones table`);
      return; // in-tree work, deliberately not on this page
    }
    if (!by.has(milestone)) fail(`${i + 1}: milestone "${milestone}" is not in the Milestones table`);
    const title = /^\*\*(.+?)\*\*\s+—\s/.exec(item);
    if (!title) fail(`${i + 1}: an item starts with "**Title** — ", got ${item.slice(0, 60)}`);
    const link = /^\[[^\]]+\]\(([^)]+)\)$/.exec(plan);
    if (!link && plan !== 'no plan') fail(`${i + 1}: the plan is a link or "no plan", got ${plan}`);
    const url = link && (/^https?:/.test(link[1]) ? link[1] : PLAN_BASE + link[1]);
    const name = title[1].replace(/`/g, '');
    const text = item.slice(title[0].length);
    measure(name, text, i + 1);
    by.get(milestone).items.push({group, title: name, text: jsx(text), plan: url});
  });
  const empty = milestones.filter((m) => !m.items.length).map((m) => m.id);
  if (empty.length) fail(`a milestone with no items: ${empty.join(', ')}`);
  return milestones;
}

// Every post under blog/, by slug. The title is the card's link text, so a
// renamed post reaches the roadmap without the slug being typed twice.
function parseBlog() {
  const posts = new Map();
  for (const file of readdirSync(BLOG).filter((f) => f.endsWith('.mdx')).sort()) {
    const src = readFileSync(join(BLOG, file), 'utf8');
    const slug = /^slug: (.+)$/m.exec(src);
    const title = /^title: (.+)$/m.exec(src);
    if (!slug || !title) fail(`blog/${file}: needs a slug and a title`);
    posts.set(slug[1].trim(), title[1].trim().replace(/^["']|["']$/g, ''));
  }
  return posts;
}

// A card is a glance, not a page. The long form of an item is the plan it links
// to and, for a built one, the posts beneath it — never the row itself.
const SENTENCES = 1;
const WORDS = 25;

function measure(title, source, line) {
  const text = source.replace(/`/g, '').trim();
  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean).length;
  const words = text.split(/\s+/).length;
  const over = (what, n, max) =>
    fail(`${line}: "${title}" is ${n} ${what}; a row is at most ${max}. Cut it in docs/ROADMAP.md.`);
  if (sentences > SENTENCES) over('sentences', sentences, SENTENCES);
  if (words > WORDS) over('words', words, WORDS);
}

// A row is markdown in a table cell; a card is JSX. Only `code` spans are used,
// and everything outside them is escaped, so a row can hold a `<` or a brace
// without breaking the page it is pasted into.
const escape = (s) =>
  s.replace(/[&<>{}]/g, (c) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '{': '&#123;', '}': '&#125;'})[c]);

// The row reads on from its title, so it starts lowercase; the card puts the
// title in a heading above, so the paragraph under it starts a sentence. A row
// opening on a code span (`balaur export` …) is left alone: that is a name.
const jsx = (text) =>
  '<>' +
  text
    .trim()
    .replace(/^[a-z]/, (c) => c.toUpperCase())
    .split(/`([^`]+)`/)
    .map((part, i) => (i % 2 ? `<code>${escape(part)}</code>` : escape(part)))
    .join('') +
  '</>';

function render(milestones, copy, posts) {
  const known = new Set();
  const cited = new Set(copy.essays);
  for (const slug of cited) {
    if (!posts.has(slug)) fail(`essays names "${slug}", which is not a post under blog/`);
  }
  const out = [
    copy.frontmatter.trimEnd(),
    '',
    "import Roadmap from '@site/src/components/Roadmap';",
    '',
    '# Roadmap',
    '',
    '<Roadmap milestones={[',
  ];
  for (const milestone of milestones) {
    out.push('  {');
    out.push(`    id: '${milestone.id}',`);
    out.push(`    state: '${milestone.state}',`);
    out.push(`    title: ${JSON.stringify(milestone.title)},`);
    out.push('    items: [');
    for (const item of milestone.items) {
      known.add(item.title);
      out.push('      {');
      out.push(`        group: ${JSON.stringify(item.group)},`);
      out.push(`        title: '${item.title.replace(/'/g, "\\'")}',`);
      out.push(`        text: ${item.text},`);
      if (item.plan) out.push(`        plan: '${item.plan}',`);
      // A built row is a record, so it shows the thing and says where it was
      // written up; an unbuilt one has neither to show.
      const shot = copy.shots[item.title];
      if (milestone.state === 'built' && !shot) {
        fail(`"${item.title}" is built with no shot — add it to \`shots\` in src/data/roadmap-copy.mjs`);
      }
      if (shot && milestone.state !== 'built') fail(`"${item.title}" is not built, so it cannot have a shot`);
      if (shot) {
        if (!shot.image || !shot.alt) fail(`the shot for "${item.title}" needs an image and an alt`);
        if (!shot.posts?.length) fail(`the shot for "${item.title}" needs the post that announced it`);
        out.push(`        image: ${JSON.stringify(shot.image)},`);
        out.push(`        alt: ${JSON.stringify(shot.alt)},`);
        out.push('        posts: [');
        for (const slug of shot.posts) {
          if (!posts.has(slug)) fail(`"${item.title}" names the post "${slug}", which is not under blog/`);
          cited.add(slug);
          out.push(`          {slug: ${JSON.stringify(slug)}, title: ${JSON.stringify(posts.get(slug))}},`);
        }
        out.push('        ],');
      }
      out.push('      },');
    }
    out.push('    ],');
    out.push('  },');
  }
  out.push(']} />', '');
  if (copy.outro) out.push(copy.outro.trim(), '');
  const staleShots = Object.keys(copy.shots).filter((t) => !known.has(t));
  if (staleShots.length) fail(`shots for items the roadmap no longer has: ${staleShots.join(', ')}`);
  // The other direction: a post is about a roadmap row, or it is one of the
  // few that are records rather than features and says so in `essays`.
  const loose = [...posts.keys()].filter((slug) => !cited.has(slug));
  if (loose.length) {
    fail(`no roadmap item names these posts: ${loose.join(', ')}
  Either add the post to that item's \`shots\` entry, or, if it is not about
  one feature, list its slug in \`essays\` in src/data/roadmap-copy.mjs.`);
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}

const src = sourcePath();
if (!existsSync(src)) fail(`no ${src}; run scripts/sync-docs.sh, or set BALAUR_REPO`);
const md = readFileSync(src, 'utf8');
const {default: copy} = await import('../src/data/roadmap-copy.mjs');
const body = render(parseRoadmap(md, parseMilestones(md)), copy, parseBlog());

if (process.argv.includes('--check')) {
  const have = existsSync(OUT) ? readFileSync(OUT, 'utf8') : '';
  if (have !== body) fail('docs/roadmap.mdx is stale — run `yarn gen-roadmap`');
  console.log('roadmap.mdx is current');
} else {
  writeFileSync(OUT, body);
  console.log(`wrote docs/roadmap.mdx from ${src}`);
}
