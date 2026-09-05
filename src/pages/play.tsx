import {useEffect, useRef, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {PageMetadata} from '@docusaurus/theme-common';
import Heading from '@theme/Heading';
import playVersion from '@site/src/play-version.json';
import styles from './play.module.css';

// One stamp for the glue, the module and the packs: see scripts/gen-play-version.mjs.
const PLAY_VERSION: string = playVersion.v;

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

type Module = {
  default: (init?: {module_or_path?: string}) => Promise<unknown>;
  start: (canvas: string, pack: string) => Promise<void>;
};

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
      const url = `/play/balaur.js?v=${PLAY_VERSION}`;
      const mod = (await import(/* webpackIgnore: true */ url)) as Module;
      await mod.default({module_or_path: `/play/balaur_bg.wasm?v=${PLAY_VERSION}`});
      setStatus({kind: 'running'});
      await mod.start('balaur-canvas', `/play/hello.bpak?v=${PLAY_VERSION}`);
      setStatus({kind: 'done'});
    } catch (e) {
      setStatus({kind: 'error', text: e instanceof Error ? e.message : String(e)});
    }
  };

  // `/play/?run` starts without the button — a link that opens on the game.
  useEffect(() => {
    if (window.location.search.includes('run')) void run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout
      title="Play — the engine running in your browser"
      description="Balaur running in the browser: the same engine, built to WebAssembly, drawing on a canvas through WebGPU. examples/hello, fetched as a pack and booted in the page.">
      <PageMetadata image="/img/social/play.png" />
      <PageMetadata image="/img/social/play.png" />
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
            : 'Needs WebGPU. The engine is about 4.5 MB compressed and nothing is fetched until you press the button; click the canvas to give it the keyboard.'}
        </p>
        <Heading as="h2">What this is, and is not</Heading>
        <p>
          It is the web template the engine builds on every push — <code>wasm32-unknown-unknown</code>, wasm-bindgen, a
          wgpu surface on a canvas — running a pack the way a fused executable runs one on desktop, with the same
          scripts, the same physics and the same fixed tick. Sound is off in the browser for now, and the pack carries
          its scripts as source, because compiled bytecode is not yet portable between a 64-bit machine and the 32-bit
          web runtime.
        </p>
        <p>
          It is the engine alone, without the editor around it. The editor runs in a browser too, on the same module and
          a filesystem that lives in the tab: that is <Link to="/editor">/editor</Link>. To edit a project on your own
          machine, <Link to="/docs/getting-started">build it from source</Link>; the{' '}
          <Link to="/examples">examples</Link> are what both pages open.
        </p>
      </main>
    </Layout>
  );
}
