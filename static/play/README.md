# The web build

`balaur.js` and `balaur_bg.wasm` are the engine's web template — the output of
`scripts/package_template.sh web` in the engine repository (wasm-bindgen over
a `wasm32-unknown-unknown` build with the `window` feature, then `wasm-opt`).
The `.bpak` files are projects exported with `balaur export --keep-sources`:
packs carrying script sources. Compiled bytecode also runs in the browser
(the rune fork serialises instruction addresses as `u32`, so packs are
portable to the 32-bit runtime), but `/editor` opens these projects and its
code panel shows their scripts, which a compiled pack does not carry — and
for these examples the sources are the smaller form anyway.
`editor.bpak` is the editor's own project — its scripts, scenes, themes and
fonts — which `/editor` unpacks into a virtual filesystem beside the project
it opens.

`src/components/Player` runs a game — the Play button on an /examples card —
and `src/pages/editor.tsx` runs the editor over one. `src/play.ts` is the loader they share. `VERSION` names
the engine build these came from.

They follow the engine on their own: the engine's CI packs all of them into
`balaur-play.tar.gz` on every release (`scripts/package_play.sh` there), and
`scripts/sync-play.sh` here fetches that bundle from the `nightly` prerelease,
verified against the release's `SHA256SUMS`. Every deploy runs it, so the site
ships the newest nightly even when this directory is behind; the engine's
nightly event, or running the deploy workflow by hand, also commits the change
as `engine nightly-<sha>`. To pin the site to a release, set `ENGINE_TAG` in
`.github/workflows/deploy.yml` to its tag; to refresh by hand, run the script
(`FORCE=1` re-downloads the same build), or point it at a local engine build:

    (cd ../balaur && ./scripts/package_template.sh web && ./scripts/package_play.sh)
    BALAUR_REPO=../balaur ./scripts/sync-play.sh

`scripts/gen-play-version.mjs` (run by `yarn start`/`yarn build`) hashes
these files into `src/play-version.json`. A built site serves them under
`/play/<stamp>/` and names the stamp in `/play/version.json` (the play-stamp
plugin in `docusaurus.config.ts`): GitHub Pages' CDN ignores a query string, so
only a new path keeps it from pairing an old glue with a new module. The page
reads `version.json` before it loads the engine, so a page cached before a
deploy, or a tab left open, still gets the newest build.

The module is about 19 MB raw and 5 MB over the wire once the host compresses
it. It is committed as well as fetched on purpose: a pull request preview
builds from the checkout alone, and a deploy that cannot reach the engine's
releases ships the committed copy.
