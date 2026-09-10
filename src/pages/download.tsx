import {useEffect, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {PageMetadata} from '@docusaurus/theme-common';
import SoftwareJsonLd from '@site/src/components/SoftwareJsonLd';
import releases from '@site/src/data/releases.json';
import styles from './download.module.css';

const REPO = 'balaurengine/balaur';
// Two channels: the newest tagged version, and the `nightly` prerelease every
// merge to the engine's main branch replaces. Both are read at build time by
// scripts/gen-releases.mjs, not by the reader's browser.
//
// The tagged channel is not called "stable" — while every release is flagged a
// prerelease on GitHub, saying stable would be a claim the engine does not
// make anywhere else on the site. The button takes its word from the release's
// own `prerelease` flag, so it stops saying pre-alpha the moment that stops
// being true, without an edit here.
type Channel = 'release' | 'nightly';
const COMMIT_URL = `https://github.com/${REPO}/commit`;

type Asset = {
  name: string;
  browser_download_url: string;
  size: number;
};

type Release = {
  tag_name: string;
  name: string;
  body: string;
  html_url: string;
  published_at: string;
  prerelease: boolean;
  // The full commit sha for the nightly, a branch name otherwise.
  target_commitish: string;
  assets: Asset[];
};

const EDITOR_PLATFORMS: {key: string; label: string; detail: string; os: string | null}[] = [
  {key: 'macos-universal', label: 'macOS', detail: 'Universal: Apple Silicon and Intel', os: 'mac'},
  {key: 'windows-x64', label: 'Windows', detail: 'x64', os: 'win'},
  {key: 'windows-arm64', label: 'Windows', detail: 'arm64', os: null},
  {key: 'linux-x64', label: 'Linux', detail: 'x64', os: 'linux'},
  {key: 'linux-arm64', label: 'Linux', detail: 'arm64', os: null},
];

function formatSize(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function detectOS(): string | null {
  const ua = navigator.userAgent;
  if (/Mac/i.test(ua)) return 'mac';
  if (/Win/i.test(ua)) return 'win';
  if (/Linux/i.test(ua)) return 'linux';
  return null;
}

// Minimal renderer for the release-notes markdown: headings, lists, fenced
// code, bold, inline code, links. Anything else renders as plain text.
function inline(text: string, keyBase: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const key = `${keyBase}-${i}`;
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={key}>{inline(part.slice(2, -2), `${key}-b`)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <em key={key}>{inline(part.slice(1, -1), `${key}-i`)}</em>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={key}>{part.slice(1, -1)}</code>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a key={key} href={link[2]}>
          {link[1]}
        </a>
      );
    }
    return part;
  });
}

function renderNotes(body: string): ReactNode {
  const out: ReactNode[] = [];
  const segments = body.replace(/\r\n/g, '\n').split(/```[^\n]*\n?/);
  segments.forEach((segment, s) => {
    if (s % 2 === 1) {
      out.push(
        <pre key={`code-${s}`}>
          <code>{segment.replace(/\n$/, '')}</code>
        </pre>,
      );
      return;
    }
    let list: string[] = [];
    let para: string[] = [];
    const flushList = () => {
      if (list.length) {
        const key = `ul-${s}-${out.length}`;
        out.push(
          <ul key={key}>
            {list.map((item, i) => (
              <li key={`${key}-${i}`}>{inline(item, `${key}-${i}`)}</li>
            ))}
          </ul>,
        );
        list = [];
      }
    };
    const flushPara = () => {
      if (para.length) {
        const text = para.join(' ');
        out.push(<p key={`p-${s}-${out.length}`}>{inline(text, `p-${s}-${out.length}`)}</p>);
        para = [];
      }
    };
    segment.split('\n').forEach((line, l) => {
      const heading = line.match(/^(#{1,4})\s+(.*)$/);
      if (heading) {
        flushList();
        flushPara();
        out.push(
          <Heading as="h3" key={`h-${s}-${l}`}>
            {inline(heading[2], `h-${s}-${l}`)}
          </Heading>,
        );
      } else if (/^[-*]\s+/.test(line.trimStart()) && !/^\s{2,}/.test(line)) {
        flushPara();
        list.push(line.trimStart().replace(/^[-*]\s+/, ''));
      } else if (line.trim() === '') {
        flushList();
        flushPara();
      } else if (list.length && /^\s{2,}\S/.test(line)) {
        list[list.length - 1] += ` ${line.trim()}`;
      } else {
        flushList();
        para.push(line);
      }
    });
    flushList();
    flushPara();
  });
  return out;
}

function ReleaseView({release}: {release: Release}) {
  const [os, setOS] = useState<string | null>(null);
  useEffect(() => setOS(detectOS()), []);

  const editorAsset = (key: string) => {
    const named = release.assets.filter((a) => a.name.startsWith(`balaur-editor-${key}`));
    return named.find((a) => a.name.endsWith('.dmg')) ?? named[0];
  };
  const otherAssets = release.assets.filter(
    (a) => !a.name.startsWith('balaur-editor-'),
  );
  const date = new Date(release.published_at).toISOString().slice(0, 10);
  const nightly = release.tag_name === 'nightly';
  const commit = /^[0-9a-f]{40}$/.test(release.target_commitish) ? release.target_commitish : null;

  return (
    <>
      <Heading as="h2" className={styles.version}>
        {release.name || release.tag_name}
        {nightly ? (
          <span className={styles.badge}>nightly</span>
        ) : (
          release.prerelease && <span className={styles.badge}>pre-release</span>
        )}
      </Heading>
      <p className={styles.meta}>
        {nightly ? 'built' : release.tag_name + ' · published'} {date}
        {commit && (
          <>
            {' '}
            from <a href={`${COMMIT_URL}/${commit}`}>{commit.slice(0, 7)}</a>
          </>
        )}{' '}
        · <a href={release.html_url}>view on GitHub</a>
      </p>

      <div className={styles.grid}>
        {EDITOR_PLATFORMS.map((p) => {
          const asset = editorAsset(p.key);
          if (!asset) return null;
          const primary = os !== null && os === p.os;
          return (
            <div
              key={p.key}
              className={primary ? `${styles.card} ${styles.cardPrimary}` : styles.card}>
              <p className={styles.cardTitle}>{p.label}</p>
              <p className={styles.cardDetail}>{p.detail}</p>
              <p className={styles.cardSize}>
                {asset.name} · {formatSize(asset.size)}
              </p>
              <a
                className={`button button--${primary ? 'primary' : 'secondary'} button--block`}
                href={asset.browser_download_url}>
                Download
              </a>
            </div>
          );
        })}
      </div>

      {otherAssets.length > 0 && (
        <>
          <Heading as="h2">Runtime templates and other builds</Heading>
          <p>
            For exporting to another platform. <code>balaur export</code>{' '}
            fetches these itself; download one for an offline install. See{' '}
            <Link to="/docs/manual/shipping">Shipping a game</Link>.
          </p>
          <ul className={styles.assetList}>
            {otherAssets.map((a) => (
              <li key={a.name}>
                <a href={a.browser_download_url}>{a.name}</a>
                <span className={styles.cardSize}>{formatSize(a.size)}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      {release.body && (
        <>
          <Heading as="h2">Release notes</Heading>
          <div className={styles.notes}>{renderNotes(release.body)}</div>
        </>
      )}
    </>
  );
}

export default function Download(): ReactNode {
  const [channel, setChannel] = useState<Channel>('release');
  const data = releases as {release: Release | null; nightly: Release | null};
  const release = data[channel];
  const taggedLabel = data.release?.prerelease === false ? 'Stable' : 'Pre-alpha';

  return (
    <Layout
      title="Download"
      description="Download the Balaur editor: one binary that is also the CLI and every game's runtime.">
      <SoftwareJsonLd />
      <PageMetadata image="/img/social/download.png" />
      <main className="container margin-vert--lg">
        <Heading as="h1">Download</Heading>

        <div className={styles.channels} role="group" aria-label="Release channel">
          {(['release', 'nightly'] as Channel[]).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={channel === c}
              className={
                channel === c ? `${styles.channel} ${styles.channelOn}` : styles.channel
              }
              onClick={() => setChannel(c)}>
              {c === 'release' ? taggedLabel : 'Nightly'}
            </button>
          ))}
        </div>

        {release ? (
          <ReleaseView release={release} />
        ) : (
          <div className={styles.stateCard}>
            <Heading as="h2">
              {channel === 'release' ? 'No tagged release yet' : 'No nightly yet'}
            </Heading>
          </div>
        )}
      </main>
    </Layout>
  );
}
