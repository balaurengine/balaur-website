import {useRef, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './play.module.css';

// The engine in the browser: the web template (scripts/package_template.sh
// web in the engine repository) and a pack of examples/hello, served from
// static/play/. Nothing loads until the visitor asks: the module and the
// pack are megabytes, and a crawler reading this page needs the words, not
// the game.
type Status =
  | {kind: 'idle'}
  | {kind: 'loading'; text: string}
  | {kind: 'running'}
  | {kind: 'done'}
  | {kind: 'unsupported'}
  | {kind: 'error'; text: string};

type Module = {default: () => Promise<unknown>; start: (canvas: string, pack: string) => Promise<void>};

export default function Play(): ReactNode {
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
      // A runtime URL, not a source module: through a variable so neither
      // TypeScript nor webpack tries to resolve it at build time.
      const url = '/play/balaur.js';
      const mod = (await import(/* webpackIgnore: true */ url)) as Module;
      await mod.default();
      setStatus({kind: 'running'});
      await mod.start('balaur-canvas', '/play/hello.bpak');
      setStatus({kind: 'done'});
    } catch (e) {
      setStatus({kind: 'error', text: e instanceof Error ? e.message : String(e)});
    }
  };

  return (
    <Layout
      title="Play — the engine running in your browser"
      description="Balaur running in the browser: the same engine, built to WebAssembly, drawing on a canvas through WebGPU. examples/hello, fetched as a pack and booted in the page.">
      <main className={styles.main}>
        <Heading as="h1">Balaur in the browser</Heading>
        <p className={styles.lede}>
          The same engine that runs the editor and every game, built to WebAssembly and drawing on this canvas
          through WebGPU. What runs here is <code>examples/hello</code> — a spinning cube, a bouncing ball, physics and
          a HUD label — exported to a pack with <code>balaur export</code> and fetched by the page.
        </p>
        <div className={styles.stage}>
          <canvas id="balaur-canvas" className={styles.canvas} width={1600} height={1000} tabIndex={0} />
          {status.kind !== 'running' && status.kind !== 'done' && (
            <div className={styles.overlay}>
              {status.kind === 'idle' && (
                <button type="button" className="button button--primary button--lg" onClick={run}>
                  Run examples/hello
                </button>
              )}
              {status.kind === 'loading' && <p>{status.text}</p>}
              {status.kind === 'unsupported' && (
                <p>
                  This browser has no WebGPU. Chrome, Edge, Safari 26 and Firefox 141 on a desktop have it; the game is
                  a few megabytes, so a phone is not the place for it yet.
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
          {status.kind === 'done'
            ? 'The game quit. Reload the page to run it again.'
            : 'Needs WebGPU. The download is the engine plus the pack; nothing is fetched until you press the button.'}
        </p>
        <Heading as="h2">What this is, and is not</Heading>
        <p>
          It is the web template the engine builds on every push — <code>wasm32-unknown-unknown</code>, wasm-bindgen, a
          wgpu surface on a canvas — running a pack the way a fused executable runs one on desktop. It is not the editor:
          the editor reads and writes a project's files, and a browser has no project directory yet. That is the next
          step on the <Link to="/docs/roadmap">roadmap</Link>, and the <Link to="/examples">examples</Link> and{' '}
          <Link to="/docs/getting-started">getting started</Link> pages are the way to the real thing today.
        </p>
      </main>
    </Layout>
  );
}
