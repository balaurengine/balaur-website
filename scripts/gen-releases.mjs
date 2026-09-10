#!/usr/bin/env node
// Writes src/data/releases.json: the two builds the Download page offers and
// the tagged versions the Releases page lists, read once here rather than by
// every visitor's browser.
//
// Fetching from the page meant a request to api.github.com per view, against
// the 60-an-hour an unauthenticated IP gets — fine for one reader, not for a
// office or a campus behind one address, and nothing at all when GitHub is
// slow. At build time it is one request, with the runner's token, and the
// answer ships inside the page.
//
// Freshness is the deploy's: the engine posts an `engine-nightly` dispatch
// when it publishes one, which is what rebuilds this site. A version tag does
// not dispatch, so a new release reaches the page on the next deploy, by hand
// or otherwise.
//
// `versions` is every tag GitHub has published, newest first, minus the
// rolling `nightly`: what the Releases page lists. The words beside each one
// live in src/data/releases-copy.mjs, which this never touches — a version
// with no entry there is listed from the tag alone.
//
// `release` is the newest of those, and it is deliberately not read from
// GitHub's `/releases/latest`. That endpoint skips prereleases, so while the
// engine is pre-alpha it answers 404 and the Download page said "no numbered
// release yet" with v0.1.0 published and twenty-four assets on it. The newest
// entry in the list is the honest answer at every stage, and the page reads
// `prerelease` to decide what to call it.
//
// Usage:
//   node scripts/gen-releases.mjs     refresh src/data/releases.json
//
// A fetch that fails leaves the committed file alone, so a build with no
// network still has the last one.

import {readFileSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'src/data/releases.json');
const API = 'https://api.github.com/repos/balaurengine/balaur/releases';

// What the page draws. The rest of GitHub's payload is dropped so the file
// stays readable in a diff.
const keep = (r) =>
  r && {
    tag_name: r.tag_name,
    name: r.name,
    body: r.body,
    html_url: r.html_url,
    published_at: r.published_at,
    prerelease: r.prerelease,
    target_commitish: r.target_commitish,
    assets: (r.assets ?? []).map((a) => ({
      name: a.name,
      browser_download_url: a.browser_download_url,
      size: a.size,
    })),
  };

// A row on the Releases page: no assets and no body, so the committed file
// stays readable in a diff. The Download page is what needs the rest.
const brief = (r) => ({
  tag_name: r.tag_name,
  name: r.name,
  html_url: r.html_url,
  published_at: r.published_at,
  prerelease: r.prerelease,
});

async function release(path) {
  const headers = {Accept: 'application/vnd.github+json'};
  // The runner's own token: a build shares its IP with every other job on it.
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API}${path}`, {headers});
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`${path}: ${res.status}`);
  return keep(await res.json());
}

// Every release, so a prerelease tag is listed too: 0.1.0 is one, which is
// why `/latest` answers with nothing and `stable` is null.
async function versions() {
  const headers = {Accept: 'application/vnd.github+json'};
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API}?per_page=100`, {headers});
  if (!res.ok) throw new Error(`list: ${res.status}`);
  const all = await res.json();
  return all
    .filter((r) => r.tag_name !== 'nightly' && !r.draft)
    .sort((a, b) => (a.published_at < b.published_at ? 1 : -1))
    .map(brief);
}

try {
  const [nightly, tagged] = await Promise.all([release('/tags/nightly'), versions()]);
  // The newest tag, with its assets: `versions()` keeps only the brief shape,
  // so the full record is fetched for the one the page actually offers.
  const newest = tagged[0] ? await release(`/tags/${tagged[0].tag_name}`) : null;
  const text = JSON.stringify({release: newest, nightly, versions: tagged}, null, 2) + '\n';
  if (readFileSync(OUT, 'utf8') !== text) {
    writeFileSync(OUT, text);
    console.log(
      `releases: ${newest?.tag_name ?? 'none'}${newest?.prerelease ? ' (prerelease)' : ''}, ` +
        `nightly ${nightly?.tag_name ?? 'none'}, ${tagged.length} tagged`);
  } else {
    console.log('releases.json is current');
  }
} catch (err) {
  console.log(`gen-releases: keeping the committed file (${err.message})`);
}
