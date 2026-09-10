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
// Two severities. A malformed source is fatal, because there is no page to
// write without it. Everything else — a row over the sentence or word limit, a
// missing shot, a post nothing names — is a warning: the page still renders, so
// a deploy is never held up by prose in a file this repository does not own.
// `--strict` turns the warnings back into failures, which is how the engine
// repository holds its own docs/ROADMAP.md to the limits.
//
// Usage:
//   node scripts/gen-roadmap.mjs            write docs/roadmap.mdx
//   node scripts/gen-roadmap.mjs --check    fail if the file is not what this
//                                           would write (CI, and `yarn build`)
//   node scripts/gen-roadmap.mjs --strict   fail on a warning too
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

// Thrown, not exited: the bottom of the file decides whether a build dies of
// it or keeps the page it already has.
class GenError extends Error {}
const fail = (msg) => {
  throw new GenError(msg);
};

const STRICT = process.argv.includes('--strict');
const CHECK = process.argv.includes('--check');
let warnings = 0;

// Says what is wrong and carries on. In Actions the annotation puts it on the
// run's summary, so a warning is seen without a red build.
const warn = (msg) => {
  if (STRICT) fail(msg);
  warnings += 1;
  console.warn(`gen-roadmap: ${msg}`);
  if (process.env.GITHUB_ACTIONS) console.log(`::warning::gen-roadmap: ${msg.split('\n')[0]}`);
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

// A state column the engine has not dropped yet, reported once.
const stale = new Set();

// A month and a year, so an estimate cannot quietly become a quarter or a
// season the page then has to render.
const MONTH = /^(?:January|February|March|April|May|June|July|August|September|October|November|December) \d{4}$/;

// The `## Milestones` table: `| **0.2** | building | December 2026 | What it
// is |`, in tab order. Every item row names one of these, so the two tables
// cannot drift apart. The estimate is per milestone, never per item: a card
// shows the month its tab is aimed at.
//
// The estimate column is optional, and a table without it warns rather than
// failing: the engine's file is fetched from its main branch, so the two
// repositories have to be able to land this in either order. A state column is
// the older shape and is ignored the same way — what is built is the rows.
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
    if (row.length < 2 || row.length > 4) fail(`a milestone needs two to four columns, got ${row.length}`);
    const id = row[0];
    const title = row[row.length - 1];
    // Whatever sits between the two is named by what it looks like, so the
    // column can be dropped from either side of the sync.
    let estimate = null;
    for (const cell of row.slice(1, -1)) {
      if (STATES.includes(cell)) stale.add(cell);
      else if (MONTH.test(cell)) estimate = cell;
      else fail(`a milestone column is a month or nothing, got "${cell}"`);
    }
    const bare = /^\*\*(.+?)\*\*$/.exec(id);
    if (!bare) fail(`a milestone is "**0.2**", got ${id}`);
    out.push({id: bare[1], state: 'planned', estimate, title, items: []});
  }
  if (!out.length) fail('no `## Milestones` table');
  const undated = out.filter((m) => !m.estimate).map((m) => m.id);
  if (undated.length) warn(`no estimate on ${undated.join(', ')}; those tabs show no month`);
  if (stale.size) warn(`the Milestones table still has a state column; a row saying \`done\` is what marks a thing built`);
  return out;
}

// A milestone is built when every row in it is, and the one being built is the
// first that is not — so the page reads the same rows the engine keeps, and
// there is nowhere for a second answer to live.
function deriveStates(milestones) {
  let building = false;
  for (const milestone of milestones) {
    if (milestone.items.every((item) => item.done)) milestone.state = 'built';
    else if (!building) {
      milestone.state = 'building';
      building = true;
    }
  }
  return milestones;
}

// One row: `| **Title** — text | 0.2 | [PLAN-x.md](PLAN-x.md) |`, where the
// milestone is one from the table above, or that milestone in parentheses for
// work the engine tracks and this page does not. `0.2 done` is a row built
// ahead of the milestone holding it, and carries a done chip on its card. The text after the dash is
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
    const [item, mark, plan] = row;
    // `0.2 done`: built already, inside a milestone that is still being built.
    const done = / done$/.test(mark);
    const milestone = done ? mark.slice(0, -' done'.length) : mark;
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
    by.get(milestone).items.push({group, title: name, text: jsx(text), plan: url, done});
  });
  const empty = milestones.filter((m) => !m.items.length).map((m) => m.id);
  if (empty.length) fail(`a milestone with no items: ${empty.join(', ')}`);
  reportOversize();
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

// Every row over the limits, reported once at the end rather than a line each:
// a file that has drifted has drifted in dozens of rows, and a hundred lines
// of the same warning is a wall nobody reads.
const oversize = [];

function measure(title, source, line) {
  const text = source.replace(/`/g, '').trim();
  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean).length;
  const words = text.split(/\s+/).length;
  if (sentences > SENTENCES || words > WORDS) oversize.push({title, line, sentences, words});
}

function reportOversize() {
  if (!oversize.length) return;
  const worst = [...oversize]
    .sort((a, b) => b.words - a.words)
    .slice(0, 3)
    .map((r) => `${r.line}: "${r.title}", ${r.sentences} sentence${r.sentences > 1 ? 's' : ''} and ${r.words} words`);
  warn(
    `${oversize.length} row${oversize.length > 1 ? 's are' : ' is'} over the card limits ` +
      `(${SENTENCES} sentence, ${WORDS} words). Longest: ${worst.join('; ')}. Cut them in docs/ROADMAP.md.`,
  );
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
    if (!posts.has(slug)) warn(`essays names "${slug}", which is not a post under blog/`);
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
    if (milestone.estimate) out.push(`    estimate: ${JSON.stringify(milestone.estimate)},`);
    out.push(`    title: ${JSON.stringify(milestone.title)},`);
    out.push('    items: [');
    for (const item of milestone.items) {
      known.add(item.title);
      out.push('      {');
      out.push(`        group: ${JSON.stringify(item.group)},`);
      out.push(`        title: '${item.title.replace(/'/g, "\\'")}',`);
      out.push(`        text: ${item.text},`);
      if (item.plan) out.push(`        plan: '${item.plan}',`);
      if (item.done) out.push('        done: true,');
      // A built row is a record, so it shows the thing and says where it was
      // written up; an unbuilt one has neither to show.
      const shot = copy.shots[item.title];
      if (milestone.state === 'built' && !shot) {
        warn(`"${item.title}" is built with no shot — add it to \`shots\` in src/data/roadmap-copy.mjs`);
      }
      if (shot && milestone.state !== 'built' && !item.done) warn(`"${item.title}" is not built, so it cannot have a shot`);
      // An incomplete shot is dropped rather than half-written, so the card
      // loses its picture and the page still compiles.
      const whole = shot && shot.image && shot.alt && shot.posts?.length;
      if (shot && !whole) {
        warn(`the shot for "${item.title}" needs an image, an alt and the post that announced it`);
      }
      if (whole) {
        out.push(`        image: ${JSON.stringify(shot.image)},`);
        out.push(`        alt: ${JSON.stringify(shot.alt)},`);
        out.push('        posts: [');
        for (const slug of shot.posts) {
          if (!posts.has(slug)) {
            warn(`"${item.title}" names the post "${slug}", which is not under blog/`);
            continue;
          }
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
  if (staleShots.length) warn(`shots for items the roadmap no longer has: ${staleShots.join(', ')}`);
  // The other direction: a post is about a roadmap row, or it is one of the
  // few that are records rather than features and says so in `essays`.
  const loose = [...posts.keys()].filter((slug) => !cited.has(slug));
  if (loose.length) {
    warn(`no roadmap item names these posts: ${loose.join(', ')}
  Either add the post to that item's \`shots\` entry, or, if it is not about
  one feature, list its slug in \`essays\` in src/data/roadmap-copy.mjs.`);
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}

// A source this cannot read is still not a reason to lose a deploy: the page
// this wrote last time is committed, so the build keeps it and says so. Only
// --strict and --check, which are asked for on purpose, die of it — and so
// does a first run, where there is no page to keep.
function main() {
  const src = sourcePath();
  if (!existsSync(src)) fail(`no ${src}; run scripts/sync-docs.sh, or set BALAUR_REPO`);
  const md = readFileSync(src, 'utf8');
  const body = render(deriveStates(parseRoadmap(md, parseMilestones(md))), copy, parseBlog());
  if (CHECK) {
    const have = existsSync(OUT) ? readFileSync(OUT, 'utf8') : '';
    if (have !== body) fail('docs/roadmap.mdx is stale — run `yarn gen-roadmap`');
    console.log('roadmap.mdx is current');
    return;
  }
  writeFileSync(OUT, body);
  console.log(`wrote docs/roadmap.mdx from ${src}`);
}

const {default: copy} = await import('../src/data/roadmap-copy.mjs');
try {
  main();
} catch (error) {
  if (!(error instanceof GenError)) throw error;
  console.error(`gen-roadmap: ${error.message}`);
  if (STRICT || CHECK || !existsSync(OUT)) process.exit(1);
  console.warn('gen-roadmap: keeping the committed docs/roadmap.mdx');
  if (process.env.GITHUB_ACTIONS) console.log(`::warning::gen-roadmap: ${error.message.split('\n')[0]}`);
}
if (warnings) console.warn(`gen-roadmap: ${warnings} warning${warnings > 1 ? 's' : ''}, page written anyway`);
