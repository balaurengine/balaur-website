// The engine in the browser: the web template (scripts/package_template.sh
// web in the engine repository) and the packs it opens, served from
// static/play/ under one content stamp (scripts/gen-play-version.mjs), so the
// glue, the module and the packs a page fetches are always one matching set.
// Nothing loads until a page asks: the module is megabytes, and a crawler
// reading the page needs the words, not the game.
import playVersion from '@site/src/play-version.json';

const PLAY_VERSION: string = playVersion.v;

/** The URL of one file of the web build, stamped. */
export const playUrl = (file: string): string => `/play/${file}?v=${PLAY_VERSION}`;

export type Engine = {
  /** Run a pack on the canvas with that id. Resolves when the game quits. */
  start: (canvas: string, pack: string) => Promise<void>;
  /** Open the editor on a project pack, with the editor's own pack beside it. */
  start_editor: (canvas: string, editorPack: string, projectPack: string) => Promise<void>;
};

type Glue = Engine & {default: (init?: {module_or_path?: string}) => Promise<unknown>};

/** The module draws through WebGPU; without it there is nothing to start. */
export const hasWebGpu = (): boolean => 'gpu' in navigator;

/** Fetch the glue and the module and initialise them. */
export async function loadEngine(): Promise<Engine> {
  // A runtime URL, not a source module: through a variable so neither
  // TypeScript nor webpack tries to resolve it at build time.
  const url = playUrl('balaur.js');
  const mod = (await import(/* webpackIgnore: true */ url)) as Glue;
  await mod.default({module_or_path: playUrl('balaur_bg.wasm')});
  return mod;
}
