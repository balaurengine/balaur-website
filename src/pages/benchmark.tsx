import {useEffect, useRef, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {PageMetadata} from '@docusaurus/theme-common';
import Heading from '@theme/Heading';
import playVersion from '@site/src/play-version.json';
import styles from './play.module.css';

// The benchmark project in the browser: the same pack `balaur run
// examples/benchmark` runs on a desktop, on the same web template /play uses.
// Nothing loads until the visitor asks; the module and the pack are megabytes.
const PLAY_VERSION: string = playVersion.v;

type Status =
  | {kind: 'idle'}
  | {kind: 'loading'; text: string}
  | {kind: 'running'}
  | {kind: 'done'}
  | {kind: 'unsupported'}
  | {kind: 'error'; text: string};

type Module = {
  default: (init?: {module_or_path?: string}) => Promise<unknown>;
  start: (canvas: string, pack: string) => Promise<void>;
};

export default function Benchmark(): ReactNode {
  const [status, setStatus] = useState<Status>({kind: 'idle'});
  const started = useRef(false);

  const run = async () => {
    if (started.current) return;
    started.current = true;
    if (!('gpu' in navigator)) {
      setStatus({kind: 'unsupported'});
      return;
    }
    try {
      setStatus({kind: 'loading', text: 'Loading the engine…'});
      const url = `/play/balaur.js?v=${PLAY_VERSION}`;
      const mod = (await import(/* webpackIgnore: true */ url)) as Module;
      await mod.default({module_or_path: `/play/balaur_bg.wasm?v=${PLAY_VERSION}`});
      setStatus({kind: 'running'});
      await mod.start('balaur-canvas', `/play/benchmark.bpak?v=${PLAY_VERSION}`);
      setStatus({kind: 'done'});
    } catch (e) {
      setStatus({kind: 'error', text: e instanceof Error ? e.message : String(e)});
    }
  };

  useEffect(() => {
    if (window.location.search.includes('run')) void run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout
      title="Benchmark — run the suite in your browser"
      description="The Balaur benchmark project running in the browser: pick a physics or scene-tree case, watch it build, and read what the engine's own profiler measured.">
      <PageMetadata image="/img/social/play.png" />
      <main className={styles.main}>
        <Heading as="h1">Run the benchmarks</Heading>
        <p className={styles.lede}>
          The same project the <Link to="/docs/benchmarks">published numbers</Link> come from, built to
          WebAssembly. Pick a case, watch it build, and read the median tick beside what rapier took inside it.
        </p>
        <div className={styles.stage}>
          <canvas id="balaur-canvas" className={styles.canvas} width={1600} height={1000} tabIndex={0} />
          {status.kind !== 'running' && status.kind !== 'done' && (
            <div className={styles.overlay}>
              {status.kind === 'idle' && (
                <button type="button" className="button button--primary button--lg" onClick={run}>
                  Run the benchmarks
                </button>
              )}
              {status.kind === 'loading' && <p>{status.text}</p>}
              {status.kind === 'unsupported' && (
                <p>
                  This browser has no WebGPU. Chrome, Edge, Safari 26 and Firefox 141 on a desktop have it; the
                  cases build thousands of bodies, so a phone is not the place for them.
                </p>
              )}
              {status.kind === 'error' && (
                <p>
                  It did not start: <code>{status.text}</code>
                </p>
              )}
            </div>
          )}
        </div>
        <p className={styles.note}>
          Needs WebGPU. The heavier cases build ten thousand bodies and take a few seconds before they settle.
        </p>
        <Heading as="h2">What these numbers are, and are not</Heading>
        <p>
          They are the browser's. A web build is single-threaded, so the solver that runs on seven threads on a
          desktop runs on one here, and the browser paces frames to the display rather than to a fixed tick. Read
          them as this machine in this tab, and take the{' '}
          <Link to="/docs/benchmarks">published table</Link> for the comparison against Godot: those come from a
          headless run at a fixed 60 Hz on a quiet machine, beside the Godot physics suites measured the same day.
        </p>
        <p>
          Everything else is the same engine: the same scenes, the same rapier, the same scripts. Each case reports
          a whole physics tick, rapier&rsquo;s own step inside it, and what the case&rsquo;s script cost crossing
          the seam — all read from{' '}
          <Link to="/docs/reference/modules/engine">
            <code>engine.timings()</code>
          </Link>
          , the profiler the editor&rsquo;s own dock draws.
        </p>
        <p>
          To run it on your own machine, where the numbers mean something:{' '}
          <code>balaur run examples/benchmark --headless --fixed-tick -- --case=3d/pyramid</code>, or open it in the{' '}
          <Link to="/editor">editor</Link> and press a case.
        </p>
      </main>
    </Layout>
  );
}
