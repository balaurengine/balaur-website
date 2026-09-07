#!/usr/bin/env node
// Writes src/data/releases.json: the two builds the Download page offers, read
// once here rather than by every visitor's browser.
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

try {
  const [stable, nightly] = await Promise.all([
    release('/latest'),
    release('/tags/nightly'),
  ]);
  const text = JSON.stringify({stable, nightly}, null, 2) + '\n';
  if (readFileSync(OUT, 'utf8') !== text) {
    writeFileSync(OUT, text);
    console.log(`releases: stable ${stable?.tag_name ?? 'none'}, nightly ${nightly?.tag_name ?? 'none'}`);
  } else {
    console.log('releases.json is current');
  }
} catch (err) {
  console.log(`gen-releases: keeping the committed file (${err.message})`);
}
