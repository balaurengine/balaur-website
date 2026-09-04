# The web build

`balaur.js` and `balaur_bg.wasm` are the engine's web template — the output of
`scripts/package_template.sh web` in the engine repository (wasm-bindgen over
a `wasm32-unknown-unknown` build with the `window` feature, then `wasm-opt`).
The `.bpak` files are projects exported with `balaur export`: compiled
bytecode, which is portable to the 32-bit web runtime since the rune fork
(`balaurengine/rune`, branch `deterministic-pow`) serialises instruction
addresses as `u32`. `--keep-sources` still works but is no longer needed.
`editor.bpak` is the editor's own project — its scripts, scenes, themes and
fonts — which `/editor` unpacks into a virtual filesystem beside the project
it opens.

`src/pages/play.tsx` runs a game; `src/pages/editor.tsx` runs the editor over
one. To refresh after an engine change:

    (cd ../balaur && ./scripts/package_template.sh web)
    cp ../balaur/dist/balaur.js ../balaur/dist/balaur_bg.wasm static/play/
    cd ../balaur && for p in editor examples/hello examples/angrynerds examples/rig; do
      target/release/balaur export "$p" \
        --output "../balaur-website/static/play/$(basename $p).bpak"
    done

The module is 17 MB raw and about 4.5 MB over the wire once the host
compresses it. It lives in git until the engine publishes releases the site
can fetch from instead.
