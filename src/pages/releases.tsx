import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {PageMetadata} from '@docusaurus/theme-common';
import releases from '@site/src/data/releases.json';
import copy from '@site/src/data/releases-copy.mjs';
import styles from './releases.module.css';

// One card per tagged version. The words come from src/data/releases-copy.mjs
// and the published release, when there is one, comes from releases.json —
// which scripts/gen-releases.mjs writes at build time. So a version is
// described here the day it is cut, and its GitHub link appears by itself once
// the draft release is published.
//
// The page carries no release notes of its own: what shipped is the post, and
// what it closed is the roadmap. Repeating either would put a second page in
// search against the one that says it properly.
type Version = {
  tag: string;
  version: string;
  date: string;
  prerelease: boolean;
  line: string;
  post: string;
  milestone: string;
  clip: string;
};

type Published = {
  tag_name: string;
  html_url: string;
  published_at: string;
  prerelease: boolean;
};

const versions = copy as Version[];
const published = new Map(
  ((releases as {versions?: Published[]}).versions ?? []).map((r) => [r.tag_name, r]),
);

const day = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', {day: 'numeric', month: 'long', year: 'numeric'});

function Release({v}: {v: Version}): ReactNode {
  const live = published.get(v.tag);
  return (
    <article className={styles.release}>
      <Link to={v.post} className={styles.shot} aria-hidden="true" tabIndex={-1}>
        <img
          src={`/img/poster/${v.clip}.webp`}
          alt=""
          width={1600}
          height={1000}
          loading="lazy"
        />
      </Link>
      <div className={styles.body}>
        <Heading as="h2" className={styles.version}>
          <Link to={v.post}>Balaur {v.version}</Link>
          {(live?.prerelease ?? v.prerelease) && <span className={styles.tag}>Pre-alpha</span>}
        </Heading>
        <time className={styles.date} dateTime={live?.published_at ?? v.date}>
          {day(live?.published_at ?? v.date)}
        </time>
        <p className={styles.line}>{v.line}</p>
        <p className={styles.links}>
          <Link to={v.post}>What shipped</Link>
          <Link to={v.milestone}>Roadmap milestone</Link>
          {live && <Link to={live.html_url}>Release on GitHub</Link>}
        </p>
      </div>
    </article>
  );
}

export default function Releases(): ReactNode {
  return (
    <Layout
      title="Releases"
      description="Every tagged version of the Balaur game engine, newest first: what shipped in each one, the milestone it closed, and where to download it.">
      <PageMetadata image="/img/social/releases.png" />
      <main className={styles.page}>
        <Heading as="h1">Releases</Heading>
        <p className={styles.intro}>
          Every tagged version, newest first. <Link to="/download">Download</Link> has a
          build per platform, and the <Link to="/docs/roadmap">roadmap</Link> has what
          each milestone adds next.
        </p>
        {versions.map((v) => (
          <Release key={v.tag} v={v} />
        ))}
      </main>
    </Layout>
  );
}
