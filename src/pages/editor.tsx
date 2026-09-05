import {useEffect, useRef, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {PageMetadata} from '@docusaurus/theme-common';
import Heading from '@theme/Heading';
import playVersion from '@site/src/play-version.json';
import styles from './editor.module.css';

// One stamp for the glue, the module and the packs: see scripts/gen-play-version.mjs.
const PLAY_VERSION: string = playVersion.v;

// The editor itself, in the browser: the same wasm module /play uses, booted
// on the editor's own project pack with a game project unpacked into a
// virtual filesystem. Nothing loads until the visitor asks — between them the
// two packs and the module are several megabytes.
const PROJECTS = [
  {id: 'hello', label: 'hello', detail: '3D — a spinning cube, a ball, physics, a HUD label'},
  {id: 'angrynerds', label: 'angrynerds', detail: '2D — a slingshot game, 38 nodes, widgets'},
  {id: 'rig', label: 'rig', detail: '2D skeleton — bones, a skinned leg, two-bone IK'},
];

type Status =
  | {kind: 'idle'}
  | {kind: 'loading'; text: string}
  | {kind: 'running'}
  | {kind: 'done'}
  | {kind: 'unsupported'}
  | {kind: 'error'; text: string};

type Module = {
  default: (init?: {module_or_path?: string}) => Promise<unknown>;
  start_editor: (canvas: string, editorPack: string, projectPack: string) => Promise<void>;
};

export default function EditorPage(): ReactNode {
  const [status, setStatus] = useState<Status>({kind: 'idle'});
  const [project, setProject] = useState('hello');
  const started = useRef(false);
  const frame = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [fullscreen, setFullscreen] = useState(false);

  const run = async (id: string) => {
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
      setStatus({kind: 'loading', text: 'Opening the editor…'});
      setStatus({kind: 'running'});
      await mod.start_editor(
        'balaur-editor-canvas',
        `/play/editor.bpak?v=${PLAY_VERSION}`,
        `/play/${id}.bpak?v=${PLAY_VERSION}`,
      );
      setStatus({kind: 'done'});
    } catch (e) {
      setStatus({kind: 'error', text: e instanceof Error ? e.message : String(e)});
    }
  };

  // `/editor/?run` opens straight into the editor, and `?run=angrynerds`
  // picks the project — a link someone can share.
  useEffect(() => {
    const asked = new URLSearchParams(window.location.search).get('run');
    if (asked === null) return;
    const id = PROJECTS.some((p) => p.id === asked) ? asked : project;
    setProject(id);
    void run(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The browser owns ⌘S, ⌘Z, ⌘K and the zoom chords until the canvas has
  // focus and claims them. Not ⌘V: egui reads a paste from the event the
  // default action raises.
  useEffect(() => {
    const claim = (e: KeyboardEvent) => {
      if (status.kind !== 'running') return;
      const canvas = document.getElementById('balaur-editor-canvas');
      if (document.activeElement !== canvas) return;
      if ((e.metaKey || e.ctrlKey) && ['s', 'z', 'y', 'o', 'p', 'k', '=', '-', '\\'].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', claim);
    return () => window.removeEventListener('keydown', claim);
  }, [status.kind]);

  // The stage is as tall as the viewport allows, so once the editor runs the
  // page scrolls it under the navbar rather than leaving its bottom cut off.
  useEffect(() => {
    if (status.kind !== 'running') return;
    frame.current?.scrollIntoView({block: 'start', behavior: 'smooth'});
  }, [status.kind]);

  // Fullscreen is the stage itself: the canvas is sized by the page, so it
  // follows, and the engine picks the new size up as a resize. Esc leaves.
  useEffect(() => {
    const sync = () => setFullscreen(document.fullscreenElement === stage.current);
    document.addEventListener('fullscreenchange', sync);
    return () => document.removeEventListener('fullscreenchange', sync);
  }, []);
  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await stage.current?.requestFullscreen();
      }
    } catch {
      // A browser that refuses stays inline; nothing else to do.
    }
    document.getElementById('balaur-editor-canvas')?.focus();
  };

  return (
    <Layout
      title="The editor, in your browser"
      description="The Balaur editor running in a browser tab: the same editor as the desktop build, on WebAssembly, with a project unpacked into memory. Open a scene, move a node, edit a script.">
      <PageMetadata image="/img/social/editor-web.png" />
      <main className={styles.main}>
        <Heading as="h1">The editor, in your browser</Heading>
        <p className={styles.lede}>
          The same editor the desktop build ships — its scripts, its five personas, its inspector — compiled to
          WebAssembly and drawing through WebGPU. The project it opens is unpacked into a filesystem that lives in the
          tab, so you can move a node, edit a script and watch it reload, without installing anything.
        </p>
        <div className={styles.picker}>
          {PROJECTS.map((p) => (
            <label key={p.id} className={styles.choice}>
              <input
                type="radio"
                name="project"
                value={p.id}
                checked={project === p.id}
                disabled={status.kind !== 'idle'}
                onChange={() => setProject(p.id)}
              />
              <span>
                <code>{p.label}</code> <span className={styles.detail}>{p.detail}</span>
              </span>
            </label>
          ))}
        </div>
        <div className={styles.frame} ref={frame}>
          <div className={styles.tools}>
            <span className={styles.hint}>Click the canvas to give it the keyboard.</span>
            <button
              type="button"
              className="button button--outline button--secondary button--sm"
              disabled={status.kind !== 'running' && status.kind !== 'done'}
              title="Esc leaves fullscreen"
              onClick={() => void toggleFullscreen()}>
              {fullscreen ? 'Leave fullscreen' : 'Fullscreen'}
            </button>
          </div>
          <div className={styles.stage} ref={stage}>
            <canvas id="balaur-editor-canvas" className={styles.canvas} width={1600} height={1000} tabIndex={0} />
            {status.kind !== 'running' && status.kind !== 'done' && (
              <div className={styles.overlay}>
                {status.kind === 'idle' && (
                  <button type="button" className="button button--primary button--lg" onClick={() => run(project)}>
                    Open the editor
                  </button>
                )}
                {status.kind === 'loading' && <p>{status.text}</p>}
                {status.kind === 'unsupported' && (
                  <p>
                    This browser has no WebGPU. Chrome, Edge, Safari 26 and Firefox 141 on a desktop have it. The
                    editor wants a keyboard and a few megabytes, so it is not built for a phone.
                  </p>
                )}
                {status.kind === 'error' && (
                  <p>
                    It did not open: <code>{status.text}</code>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        <p className={styles.note}>
          Your edits live in this tab only — nothing is uploaded, and closing the page discards them.
        </p>
        <Heading as="h2">What works, and what does not</Heading>
        <p>
          The tree, the viewport and its gizmos, the inspector, the docks, the personas and the script editor all work,
          because they are the same Rune scripts the desktop editor runs. A save writes into the tab's filesystem and
          the editor reloads from it, so hot reload works without a file watcher.
        </p>
        <p>
          Not yet: sound, which is stubbed on WebAssembly; a project that outlives the tab, which wants somewhere to
          keep it; loading a project of your own; and exporting a native build, which needs a linker the browser has
          not got. The <Link to="/docs/roadmap">roadmap</Link> tracks those. To edit a real project today,{' '}
          <Link to="/docs/getting-started">build the editor</Link> — and <Link to="/play">/play</Link> is the engine
          alone, running a game without the editor around it.
        </p>
      </main>
    </Layout>
  );
}
