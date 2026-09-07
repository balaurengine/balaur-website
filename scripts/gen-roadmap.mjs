#!/usr/bin/env node
// Writes docs/roadmap.mdx from two sources that own different halves of it.
//
// The engine's docs/ROADMAP.md owns the structure — which milestones exist,
// which items are in them, in what order, behind which plan — because that is
// the list the engine's own contributors keep. This repository owns the prose,
// in src/data/roadmap-copy.mjs: the frontmatter and each card's paragraph,
// keyed by title.
//
// So a roadmap item lands here by being added there, and a title is the join:
// rename one on either side without the other and this script fails rather
// than dropping a card.
//
// Usage:
//   node scripts/gen-roadmap.mjs            write docs/roadmap.mdx
//   node scripts/gen-roadmap.mjs --check    fail if the file is not what this
//                                           would write (CI, and `yarn build`)
//
// The engine file comes from BALAUR_REPO if that is set, and otherwise from
// reference/roadmap.md, which scripts/sync-docs.sh fetches and this repository
// commits — so a build with no network still has one.

import {readFileSync, writeFileSync, existsSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'docs/roadmap.mdx');
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
// work the engine tracks and this page does not. The text column is the
// engine's own one-liner; the card's paragraph is this repository's, so the
// column is read and dropped.
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
    by.get(milestone).items.push({group, title: title[1].replace(/`/g, ''), plan: url});
  });
  const empty = milestones.filter((m) => !m.items.length).map((m) => m.id);
  if (empty.length) fail(`a milestone with no items: ${empty.join(', ')}`);
  return milestones;
}

function render(milestones, copy) {
  const known = new Set();
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
      const text = copy.items[item.title];
      if (!text) fail(`no copy for "${item.title}" — add it to src/data/roadmap-copy.mjs`);
      known.add(item.title);
      out.push('      {');
      out.push(`        group: ${JSON.stringify(item.group)},`);
      out.push(`        title: '${item.title.replace(/'/g, "\\'")}',`);
      out.push(`        text: ${text.trim()},`);
      if (item.plan) out.push(`        plan: '${item.plan}',`);
      out.push('      },');
    }
    out.push('    ],');
    out.push('  },');
  }
  out.push(']} />', '');
  if (copy.outro) out.push(copy.outro.trim(), '');
  const stale = Object.keys(copy.items).filter((t) => !known.has(t));
  if (stale.length) fail(`copy for items the roadmap no longer has: ${stale.join(', ')}`);
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}

const src = sourcePath();
if (!existsSync(src)) fail(`no ${src}; run scripts/sync-docs.sh, or set BALAUR_REPO`);
const md = readFileSync(src, 'utf8');
const {default: copy} = await import('../src/data/roadmap-copy.mjs');
const body = render(parseRoadmap(md, parseMilestones(md)), copy);

if (process.argv.includes('--check')) {
  const have = existsSync(OUT) ? readFileSync(OUT, 'utf8') : '';
  if (have !== body) fail('docs/roadmap.mdx is stale — run `yarn gen-roadmap`');
  console.log('roadmap.mdx is current');
} else {
  writeFileSync(OUT, body);
  console.log(`wrote docs/roadmap.mdx from ${src}`);
}
