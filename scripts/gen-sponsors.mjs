#!/usr/bin/env node
// Writes src/data/sponsors.json: the public sponsors the Support page names,
// read once here rather than by every visitor's browser.
//
// GitHub's own sponsor card is an iframe on github.com, and an avatar is a
// request to avatars.githubusercontent.com. Either would put a third-party
// origin on the page, which /privacy says is not there and AGENTS.md says not
// to reintroduce. So the list is fetched at build time and ships inside the
// page, the way scripts/gen-releases.mjs handles releases.
//
// Sponsorships are GraphQL only, and an organisation's are readable only with
// a token that has `read:org`, held by someone who administers the org. The
// runner's own `github.token` is not that, so CI passes SPONSORS_TOKEN. With
// no token this writes nothing and keeps the committed file: a fork, a local
// build and a pull request from outside all still build.
//
// Only public sponsorships are asked for. A sponsor who chose to be private is
// private, and `includePrivate` stays false so this cannot out one by accident.
//
// Usage:
//   SPONSORS_TOKEN=ghp_… node scripts/gen-sponsors.mjs
//
// A fetch that fails leaves the committed file alone, so a build with no
// network, or with no token, still has the last list.

import {readFileSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'src/data/sponsors.json');
const LOGIN = 'balaurengine';
const API = 'https://api.github.com/graphql';

// The maintainer is an organisation here. `user` is the other spelling of the
// same connection, tried second so this keeps working if sponsorship ever
// moves to a personal account.
const QUERY = `
  query($login: String!) {
    organization(login: $login) { ...sponsors }
    user(login: $login) { ...sponsors }
  }
  fragment sponsors on Sponsorable {
    sponsorshipsAsMaintainer(first: 100, includePrivate: false, orderBy: {field: CREATED_AT, direction: ASC}) {
      nodes {
        createdAt
        isOneTimePayment
        tier { monthlyPriceInDollars }
        sponsorEntity {
          __typename
          ... on User { login name url avatarUrl(size: 128) }
          ... on Organization { login name url avatarUrl(size: 128) }
        }
      }
    }
  }
`;

// What the page draws. `avatar` is recorded but not rendered: a logo is placed
// by hand, as a file in this repository, for the same origin reason as above.
const keep = (node) => {
  const who = node.sponsorEntity;
  if (!who?.login) return null;
  return {
    login: who.login,
    name: who.name || who.login,
    url: who.url,
    avatar: who.avatarUrl,
    dollars: node.tier?.monthlyPriceInDollars ?? 0,
    oneTime: Boolean(node.isOneTimePayment),
    since: node.createdAt,
  };
};

// Most given first, and among equals the one who has been there longest.
const order = (a, b) => b.dollars - a.dollars || a.since.localeCompare(b.since);

try {
  const token = process.env.SPONSORS_TOKEN || process.env.GH_SPONSORS_TOKEN;
  if (!token) {
    console.log('gen-sponsors: no SPONSORS_TOKEN, keeping the committed file');
    process.exit(0);
  }
  const res = await fetch(API, {
    method: 'POST',
    headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
    body: JSON.stringify({query: QUERY, variables: {login: LOGIN}}),
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const body = await res.json();
  // A 200 carrying errors is how GraphQL reports a bad token or a missing
  // scope, so it is read rather than trusted. `user` being null while
  // `organization` answers is expected, and not an error.
  const fatal = (body.errors ?? []).filter((e) => e.type !== 'NOT_FOUND');
  if (fatal.length) throw new Error(fatal.map((e) => e.message).join('; '));
  const holder = body.data?.organization ?? body.data?.user;
  if (!holder) throw new Error(`${LOGIN} sponsors nothing back, or the token cannot see them`);
  const sponsors = (holder.sponsorshipsAsMaintainer?.nodes ?? []).map(keep).filter(Boolean).sort(order);
  const text = JSON.stringify({sponsors}, null, 2) + '\n';
  if (readFileSync(OUT, 'utf8') !== text) {
    writeFileSync(OUT, text);
    console.log(`sponsors: ${sponsors.length}`);
  } else {
    console.log('sponsors.json is current');
  }
} catch (err) {
  console.log(`gen-sponsors: keeping the committed file (${err.message})`);
}
