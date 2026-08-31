import {useEffect, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './download.module.css';

const REPO = 'balaurengine/balaur';
const RELEASES_API = `https://api.github.com/repos/${REPO}/releases?per_page=5`;
const RELEASES_URL = `https://github.com/${REPO}/releases`;

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
  assets: Asset[];
};

type State =
  | {kind: 'loading'}
  | {kind: 'none'}
  | {kind: 'error'}
  | {kind: 'release'; release: Release};

const EDITOR_PLATFORMS: {key: string; label: string; detail: string; os: string | null}[] = [
  {key: 'macos-universal', label: 'macOS', detail: 'Universal — Apple Silicon and Intel', os: 'mac'},
  {key: 'windows-x64', label: 'Windows', detail: 'x64', os: 'win'},
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

  const editorAsset = (key: string) =>
    release.assets.find((a) => a.name.startsWith(`balaur-editor-${key}`));
  const otherAssets = release.assets.filter(
    (a) => !a.name.startsWith('balaur-editor-'),
  );
  const date = new Date(release.published_at).toISOString().slice(0, 10);

  return (
    <>
      <Heading as="h2">
        {release.name || release.tag_name}
        {release.prerelease && <span className={styles.badge}>pre-release</span>}
      </Heading>
      <p className={styles.meta}>
        {release.tag_name} · published {date} ·{' '}
        <a href={release.html_url}>view on GitHub</a>
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
            Needed only to export a game <em>for a different platform</em> than
            the one you are on — and <code>balaur export</code> offers to
            download a missing one itself, checksum-verified, into a per-user
            cache. These files are for offline installs: drop one into{' '}
            <code>templates/</code> next to the editor binary. See{' '}
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
  const [state, setState] = useState<State>({kind: 'loading'});

  useEffect(() => {
    let cancelled = false;
    fetch(RELEASES_API, {headers: {Accept: 'application/vnd.github+json'}})
      .then((res) => {
        if (res.status === 404) return [];
        if (!res.ok) throw new Error(`GitHub API: ${res.status}`);
        return res.json();
      })
      .then((releases: Release[]) => {
        if (cancelled) return;
        const latest = Array.isArray(releases) ? releases[0] : undefined;
        setState(latest ? {kind: 'release', release: latest} : {kind: 'none'});
      })
      .catch(() => {
        if (!cancelled) setState({kind: 'error'});
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Layout
      title="Download"
      description="Download the Balaur editor: one binary that is also the CLI and every game's runtime.">
      <main className="container margin-vert--lg">
        <Heading as="h1">Download</Heading>
        <p>
          The editor download is one binary that is also the <code>balaur</code>{' '}
          CLI and every game's runtime. It ships with the editor project and
          the runtime template for its own platform, so{' '}
          <code>balaur export</code> produces a playable executable the moment
          it is unpacked. It also carries{' '}
          <code>include/balaur_extension.h</code>, the header C extensions are
          built against.
        </p>

        {state.kind === 'loading' && (
          <div className={styles.stateCard}>
            <p style={{margin: 0}}>Checking the latest release…</p>
          </div>
        )}

        {state.kind === 'none' && (
          <div className={styles.stateCard}>
            <Heading as="h2">No release yet</Heading>
            <p>
              Balaur has no published release at the moment; CI drafts one on
              every push, and the first published build will appear here
              automatically. Until then, the engine builds from source in a few
              minutes with a Rust toolchain — see{' '}
              <Link to="/docs/getting-started">Getting started</Link>.
            </p>
            <p style={{marginBottom: 0}}>
              <a href={RELEASES_URL}>Releases on GitHub</a>
            </p>
          </div>
        )}

        {state.kind === 'error' && (
          <div className={styles.stateCard}>
            <Heading as="h2">Could not reach GitHub</Heading>
            <p style={{marginBottom: 0}}>
              The release list could not be fetched just now. See the{' '}
              <a href={RELEASES_URL}>releases page on GitHub</a> directly.
            </p>
          </div>
        )}

        {state.kind === 'release' && <ReleaseView release={state.release} />}
      </main>
    </Layout>
  );
}
