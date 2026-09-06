#!/usr/bin/env node
// Writes docs/roadmap.mdx from two sources that own different halves of it.
//
// The engine's docs/ROADMAP.md owns the structure — which groups exist, which
// items are in them, in what order, at what tier, behind which plan — because
// that is the list the engine's own contributors keep. This repository owns the
// prose, in src/data/roadmap-copy.mjs: the frontmatter, the legend, each
// group's opening line and each card's paragraph, all keyed by item title.
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

// One row: `| **Title** — text | tier | [PLAN-x.md](PLAN-x.md) |`, where the
// tier is 1, 2, 3 or an em dash for work the engine tracks and this page does
// not. The text column is the engine's own one-liner; the card's paragraph is
// this repository's, so the column is read and dropped.
function parseRoadmap(md) {
  const groups = [];
  let group = null;
  md.split('\n').forEach((line, i) => {
    const heading = /^## (.+?)\s*$/.exec(line);
    if (heading) {
      group = {title: heading[1], items: []};
      groups.push(group);
      return;
    }
    if (!group || !line.startsWith('| ') || /^\|\s*(Item|:?-{3,})/.test(line)) return;
    const cells = line.slice(1, line.lastIndexOf('|')).split(' | ').map((c) => c.trim());
    if (cells.length !== 3) fail(`${i + 1}: a row needs three columns, got ${cells.length}`);
    const [item, tier, plan] = cells;
    if (tier === '—') return; // in-tree work, deliberately not on this page
    if (!['1', '2', '3'].includes(tier)) fail(`${i + 1}: tier is "${tier}", not 1, 2, 3 or —`);
    const title = /^\*\*(.+?)\*\*\s+—\s/.exec(item);
    if (!title) fail(`${i + 1}: an item starts with "**Title** — ", got ${item.slice(0, 60)}`);
    const link = /^\[[^\]]+\]\(([^)]+)\)$/.exec(plan);
    if (!link && plan !== 'no plan') fail(`${i + 1}: the plan is a link or "no plan", got ${plan}`);
    const url = link && (/^https?:/.test(link[1]) ? link[1] : PLAN_BASE + link[1]);
    group.items.push({title: title[1].replace(/`/g, ''), tier: Number(tier), plan: url});
  });
  return groups.filter((g) => g.items.length > 0);
}

function render(groups, copy) {
  const known = new Set();
  const out = [copy.frontmatter.trimEnd(), '', "import Roadmap from '@site/src/components/Roadmap';", '', '# Roadmap', '', copy.intro.trim(), ''];
  for (const group of groups) {
    out.push(`## ${group.title}`, '');
    const lead = copy.groups[group.title];
    if (lead) out.push(lead.trim(), '');
    out.push('<Roadmap items={[');
    for (const item of group.items) {
      const text = copy.items[item.title];
      if (!text) fail(`no copy for "${item.title}" — add it to src/data/roadmap-copy.mjs`);
      known.add(item.title);
      out.push('  {');
      out.push(`    title: '${item.title.replace(/'/g, "\\'")}',`);
      out.push(`    tier: ${item.tier},`);
      out.push(`    text: ${text.trim()},`);
      if (item.plan) out.push(`    plan: '${item.plan}',`);
      out.push('  },');
    }
    out.push(']} />', '');
  }
  if (copy.outro) out.push(copy.outro.trim(), '');
  const stale = Object.keys(copy.items).filter((t) => !known.has(t));
  if (stale.length) fail(`copy for items the roadmap no longer has: ${stale.join(', ')}`);
  const staleGroups = Object.keys(copy.groups).filter((g) => !groups.some((x) => x.title === g));
  if (staleGroups.length) fail(`copy for groups the roadmap no longer has: ${staleGroups.join(', ')}`);
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}

const src = sourcePath();
if (!existsSync(src)) fail(`no ${src}; run scripts/sync-docs.sh, or set BALAUR_REPO`);
const {default: copy} = await import('../src/data/roadmap-copy.mjs');
const body = render(parseRoadmap(readFileSync(src, 'utf8')), copy);

if (process.argv.includes('--check')) {
  const have = existsSync(OUT) ? readFileSync(OUT, 'utf8') : '';
  if (have !== body) fail('docs/roadmap.mdx is stale — run `yarn gen-roadmap`');
  console.log('roadmap.mdx is current');
} else {
  writeFileSync(OUT, body);
  console.log(`wrote docs/roadmap.mdx from ${src}`);
}
