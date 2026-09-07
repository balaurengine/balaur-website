import {useEffect, useRef, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {PageMetadata} from '@docusaurus/theme-common';
import Heading from '@theme/Heading';
import {hasWebGpu, loadEngine, playUrl} from '@site/src/play';
import styles from './benchmark.module.css';

// The benchmark project in the browser: the same pack `balaur run
// examples/benchmark` runs on a desktop, on the web template /editor and the
// examples use. Nothing loads until the visitor asks; the module and the
// pack are megabytes.

type Status =
  | {kind: 'idle'}
  | {kind: 'loading'; text: string}
  | {kind: 'running'}
  | {kind: 'done'}
  | {kind: 'unsupported'}
  | {kind: 'error'; text: string};

export default function Benchmark(): ReactNode {
  const [status, setStatus] = useState<Status>({kind: 'idle'});
  const started = useRef(false);

  const run = async () => {
    if (started.current) return;
    started.current = true;
    if (!hasWebGpu()) {
      setStatus({kind: 'unsupported'});
      return;
    }
    try {
      setStatus({kind: 'loading', text: 'Loading the engine…'});
      const engine = await loadEngine();
      setStatus({kind: 'running'});
      await engine.start('balaur-canvas', playUrl('benchmark.bpak'));
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
      title="Benchmark: run the suite in your browser"
      description="The Balaur benchmark project running in the browser: pick a physics or scene-tree case, watch it build, and read what the engine's own profiler measured.">
      <PageMetadata image="/img/social/benchmark.png" />
      <main className={styles.main}>
        <Heading as="h1">Run the benchmarks</Heading>
        <p className={styles.lede}>
          <code>examples/benchmark</code>, the project the{' '}
          <Link to="/docs/benchmarks">published numbers</Link> come from, built to WebAssembly. Each case reports its
          median physics tick and rapier&rsquo;s step inside it.
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
                  This browser has no WebGPU. Chrome, Edge, Safari 26 and Firefox 141 on a desktop have it.
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
          Needs WebGPU. The heavier cases build ten thousand bodies and take a few seconds to settle.
        </p>
        <Heading as="h2">How to read these numbers</Heading>
        <ul>
          <li>
            A web build is single-threaded. The solver that runs on seven threads on a desktop runs on one here.
          </li>
          <li>The browser paces frames to the display rather than to a fixed tick.</li>
          <li>
            The <Link to="/docs/benchmarks">published table</Link> is the comparison against Godot: a headless run at
            a fixed 60 Hz.
          </li>
          <li>
            Same scenes, same rapier, same scripts as that run. The tick, rapier&rsquo;s step and the script cost
            crossing the seam are read from{' '}
            <Link to="/docs/reference/modules/engine">
              <code>engine.timings()</code>
            </Link>
            , the profiler the editor&rsquo;s dock draws.
          </li>
          <li>
            On your own machine:{' '}
            <code>balaur run examples/benchmark --headless --fixed-tick -- --case=3d/pyramid</code>, or open it in
            the <Link to="/editor">editor</Link> and press a case.
          </li>
        </ul>
      </main>
    </Layout>
  );
}
