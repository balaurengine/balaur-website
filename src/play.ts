// The engine in the browser: the web template (scripts/package_template.sh
// web in the engine repository) and the packs it opens, served from
// static/play/ under one content stamp (scripts/gen-play-version.mjs), so the
// glue, the module and the packs a page fetches are always one matching set.
// Nothing loads until a page asks: the module is megabytes, and a crawler
// reading the page needs the words, not the game.
import playVersion from '@site/src/play-version.json';

const PLAY_VERSION: string = playVersion.v;

// A built site serves the files under /play/<stamp>/ (the play-stamp plugin in
// docusaurus.config.ts); the development server serves static/play/ as it is.
const STAMPED_PATH = process.env.NODE_ENV === 'production';

// Set by loadEngine to the build the server holds, so every pack comes from
// the same build as the module.
let playDir = `/play/${PLAY_VERSION}/`;

/** The URL of one file of the web build, stamped. */
export const playUrl = (file: string): string =>
  STAMPED_PATH ? playDir + file : `/play/${file}?v=${PLAY_VERSION}`;

/** The stamp of the build the server holds now, which is newer than this page's after a deploy. */
async function servedVersion(): Promise<string> {
  try {
    const response = await fetch('/play/version.json', {cache: 'no-cache'});
    if (response.ok) return ((await response.json()) as {v: string}).v;
  } catch {
    // Offline or blocked: the build this page was made with.
  }
  return PLAY_VERSION;
}

/** One project kept in this browser, as the engine records it. */
export type ProjectRow = {id: string; name: string; modified: number};

/** A file handed to or taken from the engine: its name and its bytes. */
export type NamedBytes = [string, Uint8Array];

export type Engine = {
  /** Run a pack on the canvas with that id. Resolves when the game quits. */
  start: (canvas: string, pack: string) => Promise<void>;
  /** Open the editor on a project pack, with the editor's own pack beside it. */
  start_editor: (canvas: string, editorPack: string, projectPack: string) => Promise<void>;
  /** Open the editor on no project: its start screen, listing what this browser keeps. */
  start_manager?: (canvas: string, editorPack: string) => Promise<void>;
} & Partial<Kept>;

/**
 * Where the editor's start screen leaves the project it was asked to open,
 * before loading the page again. A browser runs one engine per page, so
 * opening another project is a page load, not a second engine. The engine's
 * half of this is `crates/balaur_cli/src/project_web.rs`.
 */
const ASKED = 'balaur-open-project';

/** The project a start screen asked this page to open, taken once. */
export function askedProject(): string | null {
  try {
    const asked = sessionStorage.getItem(ASKED);
    if (asked) sessionStorage.removeItem(ASKED);
    return asked;
  } catch {
    return null;
  }
}

// Keeping a project, opening one of your own and exporting from the tab
// arrived after the module under /play was last synced, so every one of these
// is optional: the page asks `keepsProjects` and offers what is there.
type Kept = {
  /** Open the editor on a kept project, seeding it from a pack the first time. */
  open_project: (canvas: string, editorPack: string, id: string, seedPack?: string) => Promise<void>;
  list_projects: () => Promise<ProjectRow[]>;
  delete_project: (id: string) => Promise<void>;
  /** Keep a directory someone chose, as `[path, bytes]` per file. */
  import_project_files: (id: string, name: string, files: NamedBytes[]) => Promise<void>;
  /** The open project zipped, to take the work out of the browser. */
  download_project: () => NamedBytes;
  /** What the editor's Export sheet last produced, taken once. */
  take_export: () => NamedBytes | undefined;
  unsaved_count: () => number;
  save_project: () => Promise<void>;
};

type Glue = Engine & {default: (init?: {module_or_path?: string}) => Promise<unknown>};

/** The module draws through WebGPU; without it there is nothing to start. */
export const hasWebGpu = (): boolean => 'gpu' in navigator;

/**
 * Whether this build of the engine keeps projects, opens one of your own and
 * exports from the tab. False against a module synced before those landed,
 * which is the only reason the page checks rather than assuming.
 */
export const keepsProjects = (engine: Engine): engine is Engine & Kept =>
  typeof engine.open_project === 'function';

/** Fetch the glue and the module and initialise them. */
export async function loadEngine(): Promise<Engine> {
  if (STAMPED_PATH) playDir = `/play/${await servedVersion()}/`;
  // A runtime URL, not a source module: through a variable so neither
  // TypeScript nor webpack tries to resolve it at build time.
  const url = playUrl('balaur.js');
  const mod = (await import(/* webpackIgnore: true */ url)) as Glue;
  await mod.default({module_or_path: playUrl('balaur_bg.wasm')});
  return mod;
}

/** Hand the visitor a file the engine produced. */
export function offerDownload([name, bytes]: NamedBytes): void {
  // A fresh copy: the view the engine returned points into its own memory,
  // which the next allocation may move out from under the Blob.
  const blob = new Blob([new Uint8Array(bytes)], {type: 'application/octet-stream'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  link.click();
  // Long enough for the click to have been taken; revoking at once cancels it
  // in some browsers.
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
