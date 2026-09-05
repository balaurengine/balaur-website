import {useCallback, useEffect, useRef, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {PageMetadata} from '@docusaurus/theme-common';
import Heading from '@theme/Heading';
import {
  hasWebGpu,
  keepsProjects,
  loadEngine,
  offerDownload,
  playUrl,
  type Engine,
  type NamedBytes,
} from '@site/src/play';
import styles from './editor.module.css';

// The editor itself, in the browser: the wasm module the examples run on,
// booted on the editor's own project pack with a game project unpacked into a
// filesystem the browser keeps. Nothing loads until the visitor asks — between
// them the two packs and the module are several megabytes.
const PROJECTS = [
  {id: 'hello', label: 'hello', detail: '3D — a spinning cube, a ball, physics, a HUD label'},
  {id: 'angrynerds', label: 'angrynerds', detail: '2D — a slingshot game, 38 nodes, widgets'},
  {id: 'rig', label: 'rig', detail: '2D skeleton — bones, a skinned leg, two-bone IK'},
];

// What the page remembers about the projects the engine keeps, so the list
// draws before anything has downloaded the module to ask.
const INDEX_KEY = 'balaur:editor:projects';

// Directories that are never part of a project: version control, a package
// manager's cache, and what a build already produced.
const SKIPPED = ['.git', 'node_modules', 'target', 'exports', 'build'];

// A folder read into memory becomes the tab's heap twice over on the way in —
// once as the page reads it, once as the engine copies it — and again as the
// project it opens. Past this a browser fails in a way that reads as the
// editor being broken, so the page says no first.
const MAX_UPLOAD_BYTES = 128 * 1024 * 1024;

type Kept = {id: string; name: string; modified: number};

type Status =
  | {kind: 'idle'}
  | {kind: 'loading'; text: string}
  | {kind: 'running'}
  | {kind: 'done'}
  | {kind: 'unsupported'}
  | {kind: 'error'; text: string};

function readIndex(): Kept[] {
  try {
    const raw = localStorage.getItem(INDEX_KEY);
    const rows = raw === null ? [] : (JSON.parse(raw) as Kept[]);
    return Array.isArray(rows) ? rows : [];
  } catch {
    // A browser with storage switched off still runs the editor; it just
    // cannot offer to reopen anything.
    return [];
  }
}

function writeIndex(rows: Kept[]): void {
  try {
    localStorage.setItem(INDEX_KEY, JSON.stringify(rows));
  } catch {
    // Nothing to do: the engine still keeps the files.
  }
}

/** When a project was last opened, in words a person reads at a glance. */
function when(modified: number): string {
  const days = Math.floor((Date.now() - modified) / 86_400_000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days} days ago`;
  return new Date(modified).toLocaleDateString();
}

/**
 * The files of a chosen directory, project-relative, with the directory's own
 * name dropped and everything a project does not ship left behind.
 */
async function readFolder(files: FileList): Promise<{name: string; entries: NamedBytes[]}> {
  const chosen = Array.from(files);
  const root = chosen[0]?.webkitRelativePath.split('/')[0] ?? 'project';
  let total = 0;
  const entries: NamedBytes[] = [];
  for (const file of chosen) {
    const rel = file.webkitRelativePath.split('/').slice(1).join('/');
    if (rel === '' || rel.split('/').some((part) => part.startsWith('.') || SKIPPED.includes(part))) {
      continue;
    }
    total += file.size;
    if (total > MAX_UPLOAD_BYTES) {
      throw new Error(`that folder is over ${MAX_UPLOAD_BYTES / (1024 * 1024)} MB, which is more than a tab can hold`);
    }
    entries.push([rel, new Uint8Array(await file.arrayBuffer())]);
  }
  if (!entries.some(([rel]) => rel === 'project.toml')) {
    throw new Error('no project.toml at the top of that folder, so it is not a Balaur project');
  }
  return {name: root, entries};
}

export default function EditorPage(): ReactNode {
  const [status, setStatus] = useState<Status>({kind: 'idle'});
  const [project, setProject] = useState('hello');
  const [kept, setKept] = useState<Kept[]>([]);
  const [unsaved, setUnsaved] = useState(0);
  const [canKeep, setCanKeep] = useState(true);
  const started = useRef(false);
  const engineRef = useRef<Engine | null>(null);
  const frame = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const folder = useRef<HTMLInputElement>(null);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => setKept(readIndex()), []);

  const remember = useCallback((row: Kept) => {
    const rows = [row, ...readIndex().filter((k) => k.id !== row.id)];
    writeIndex(rows);
    setKept(rows);
  }, []);

  // One boot per tab: the engine takes the canvas and the module is not
  // something a page can load twice.
  const boot = useCallback(
    async (run: (engine: Engine) => Promise<void>) => {
      if (started.current) return;
      started.current = true;
      if (!hasWebGpu()) {
        setStatus({kind: 'unsupported'});
        return;
      }
      try {
        setStatus({kind: 'loading', text: 'Loading the engine…'});
        const engine = await loadEngine();
        engineRef.current = engine;
        setCanKeep(keepsProjects(engine));
        setStatus({kind: 'loading', text: 'Opening the editor…'});
        setStatus({kind: 'running'});
        await run(engine);
        setStatus({kind: 'done'});
      } catch (e) {
        started.current = false;
        setStatus({kind: 'error', text: e instanceof Error ? e.message : String(e)});
      }
    },
    [],
  );

  /** Open one of the bundled examples, as a project of the visitor's own. */
  const openExample = (id: string) =>
    boot(async (engine) => {
      const seed = playUrl(`${id}.bpak`);
      if (!keepsProjects(engine)) {
        await engine.start_editor('balaur-editor-canvas', playUrl('editor.bpak'), seed);
        return;
      }
      remember({id: `example:${id}`, name: id, modified: Date.now()});
      await engine.open_project('balaur-editor-canvas', playUrl('editor.bpak'), `example:${id}`, seed);
    });

  /** Reopen a project this browser already holds. */
  const openKept = (row: Kept) =>
    boot(async (engine) => {
      if (!keepsProjects(engine)) throw new Error('this build of the engine does not keep projects');
      remember({...row, modified: Date.now()});
      await engine.open_project('balaur-editor-canvas', playUrl('editor.bpak'), row.id);
    });

  /** Take a directory from the visitor's machine and edit it in the tab. */
  const openFolder = async (files: FileList) => {
    let read: {name: string; entries: NamedBytes[]};
    try {
      setStatus({kind: 'loading', text: 'Reading the folder…'});
      read = await readFolder(files);
    } catch (e) {
      setStatus({kind: 'error', text: e instanceof Error ? e.message : String(e)});
      return;
    }
    setStatus({kind: 'idle'});
    const id = `folder:${read.name}:${Date.now().toString(36)}`;
    await boot(async (engine) => {
      if (!keepsProjects(engine)) throw new Error('this build of the engine cannot open a folder');
      await engine.import_project_files(id, read.name, read.entries);
      remember({id, name: read.name, modified: Date.now()});
      await engine.open_project('balaur-editor-canvas', playUrl('editor.bpak'), id);
    });
  };

  const forget = async (row: Kept) => {
    const rows = readIndex().filter((k) => k.id !== row.id);
    writeIndex(rows);
    setKept(rows);
    const engine = engineRef.current;
    if (engine && keepsProjects(engine)) await engine.delete_project(row.id);
  };

  const takeProject = () => {
    const engine = engineRef.current;
    if (engine && keepsProjects(engine)) offerDownload(engine.download_project());
  };

  // `/editor/?run` opens straight into the editor, and `?run=angrynerds`
  // picks the project — a link someone can share.
  useEffect(() => {
    const asked = new URLSearchParams(window.location.search).get('run');
    if (asked === null) return;
    const id = PROJECTS.some((p) => p.id === asked) ? asked : project;
    setProject(id);
    void openExample(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // What the editor's Export sheet produced comes back through the engine
  // rather than to a directory, so the page collects it and hands it over.
  // The same poll reads how much is written but not yet kept.
  useEffect(() => {
    if (status.kind !== 'running' || !canKeep) return undefined;
    const timer = window.setInterval(() => {
      const engine = engineRef.current;
      if (!engine || !keepsProjects(engine)) return;
      setUnsaved(engine.unsaved_count());
      const produced = engine.take_export();
      if (produced) offerDownload(produced);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [status.kind, canKeep]);

  // Closing the tab on work the mirror has not caught up with loses it, so
  // the browser asks first.
  useEffect(() => {
    if (unsaved === 0) return undefined;
    const ask = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', ask);
    return () => window.removeEventListener('beforeunload', ask);
  }, [unsaved]);

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

  const idle = status.kind === 'idle' || status.kind === 'error';
  const live = status.kind === 'running' || status.kind === 'done';

  return (
    <Layout
      title="The editor, in your browser"
      description="The Balaur editor running in a browser tab: the same editor as the desktop build, on WebAssembly, editing a project your browser keeps. Open a scene, move a node, edit a script.">
      <PageMetadata image="/img/social/editor-web.png" />
      <main className={styles.main}>
        <Heading as="h1">The editor, in your browser</Heading>
        <p className={styles.lede}>
          The same editor the desktop build ships — its scripts, its five personas, its inspector — compiled to
          WebAssembly and drawing through WebGPU. The project it opens is kept in your browser, so a refresh comes back
          to the scene as you left it, and you can open a folder of your own without installing anything.
        </p>

        {idle && kept.length > 0 && (
          <section className={styles.section}>
            <Heading as="h2" className={styles.sectionTitle}>
              Your projects
            </Heading>
            <ul className={styles.kept}>
              {kept.map((row) => (
                <li key={row.id} className={styles.keptRow}>
                  <button type="button" className={styles.keptOpen} onClick={() => void openKept(row)}>
                    <code>{row.name}</code> <span className={styles.detail}>opened {when(row.modified)}</span>
                  </button>
                  <button type="button" className={styles.forget} onClick={() => void forget(row)} title="Forget this project">
                    forget
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className={styles.section}>
          <Heading as="h2" className={styles.sectionTitle}>
            Start something
          </Heading>
          <div className={styles.picker}>
            {PROJECTS.map((p) => (
              <label key={p.id} className={styles.choice}>
                <input
                  type="radio"
                  name="project"
                  value={p.id}
                  checked={project === p.id}
                  disabled={!idle}
                  onChange={() => setProject(p.id)}
                />
                <span>
                  <code>{p.label}</code> <span className={styles.detail}>{p.detail}</span>
                </span>
              </label>
            ))}
          </div>
          <div className={styles.actions}>
            <button
              type="button"
              className="button button--primary"
              disabled={!idle}
              onClick={() => void openExample(project)}>
              Open the editor
            </button>
            <button
              type="button"
              className="button button--outline button--secondary"
              disabled={!idle}
              onClick={() => folder.current?.click()}>
              Open a folder…
            </button>
            <input
              ref={folder}
              type="file"
              className={styles.hiddenInput}
              multiple
              // A directory picker, which React has no typed prop for.
              {...{webkitdirectory: '', directory: ''}}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) void openFolder(e.target.files);
              }}
            />
          </div>
          <p className={styles.note}>
            A folder is read into the tab and kept in your browser. Nothing is uploaded: there is no server in this
            page beyond the one that served it.
          </p>
        </section>

        <div className={styles.frame} ref={frame}>
          <div className={styles.tools}>
            <span className={styles.hint}>
              {live ? (unsaved > 0 ? `keeping ${unsaved} file${unsaved === 1 ? '' : 's'}…` : 'every change kept') : 'Click the canvas to give it the keyboard.'}
            </span>
            {live && canKeep && (
              <button
                type="button"
                className="button button--outline button--secondary button--sm"
                title="Download the project as a zip"
                onClick={takeProject}>
                Download project
              </button>
            )}
            <button
              type="button"
              className="button button--outline button--secondary button--sm"
              disabled={!live}
              title="Esc leaves fullscreen"
              onClick={() => void toggleFullscreen()}>
              {fullscreen ? 'Leave fullscreen' : 'Fullscreen'}
            </button>
          </div>
          <div className={styles.stage} ref={stage}>
            <canvas id="balaur-editor-canvas" className={styles.canvas} width={1600} height={1000} tabIndex={0} />
            {!live && (
              <div className={styles.overlay}>
                {status.kind === 'idle' && <p>Pick a project above, or open a folder of your own.</p>}
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

        <Heading as="h2">What works, and what does not</Heading>
        <p>
          The tree, the viewport and its gizmos, the inspector, the docks, the personas and the script editor all work,
          because they are the same Rune scripts the desktop editor runs. A save writes into the tab's filesystem and
          the editor reloads from it, so hot reload works without a file watcher. Sound plays. What you edit is kept in
          the browser as you go, and <strong>Download project</strong> takes the whole thing back out as a zip.
        </p>
        <p>
          The Export sheet offers the two builds a tab can finish by itself: a <code>.bpak</code>, and a web bundle —
          the pack zipped beside the engine module and a page to load it, ready to unpack on any static host. Every
          other target fuses the pack onto a native runtime, which needs a linker no browser has, so those stay a job
          for <code>balaur export --target</code> on a machine.
        </p>
        <p>
          Not yet: a project kept on a server rather than in this browser, and a debugger. The{' '}
          <Link to="/docs/roadmap">roadmap</Link> tracks those. To edit a project with the whole toolchain behind it,{' '}
          <Link to="/docs/getting-started">build the editor</Link> — and the <Link to="/examples">examples</Link> run
          the same three projects as games, without the editor around them.
        </p>
      </main>
    </Layout>
  );
}
