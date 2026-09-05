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
and `src/pages/benchmark.tsx` the benchmark pack; `src/pages/editor.tsx` runs
the editor over one. `src/play.ts` is the loader they share. `index.html` sends
the old /play page to /examples. `VERSION` names the engine build these came
from.

They follow the engine on their own: the engine's CI packs all of them into
`balaur-play.tar.gz` on every release (`scripts/package_play.sh` there), and
`scripts/sync-play.sh` here fetches that bundle from the `nightly` prerelease,
verified against the release's `SHA256SUMS`. The deploy workflow runs it daily
and on every push, commits a change as `engine nightly-<sha>`, and deploys
in the same run. To pin the site to a release, set `ENGINE_TAG` in
`.github/workflows/deploy.yml` to its tag; to refresh by hand, run the script
(`FORCE=1` re-downloads the same build), or point it at a local engine build:

    (cd ../balaur && ./scripts/package_template.sh web && ./scripts/package_play.sh)
    BALAUR_REPO=../balaur ./scripts/sync-play.sh

`scripts/gen-play-version.mjs` (run by `npm start`/`npm run build`) hashes
these files into `src/play-version.json`; the pages load the glue, the module
and the packs with that stamp as a query so the CDN's different cache ages for
`.js` and `.wasm` can never pair an old glue with a new module.

The module is about 19 MB raw and 5 MB over the wire once the host compresses
it. It is committed rather than fetched at build time on purpose: the site
builds from a checkout alone, so a pull request preview and a deploy never
depend on the engine's releases being reachable.
