# The web build

`balaur.js` and `balaur_bg.wasm` are the engine's web template — the output of
`scripts/package_template.sh web` in the engine repository (wasm-bindgen over
a `wasm32-unknown-unknown` build with the `window` feature, then `wasm-opt`).
`hello.bpak` is `examples/hello` exported with `balaur export --keep-sources`:
a pack that carries script sources rather than bytecode, because the compiled
form is not portable between the 64-bit host and the 32-bit web runtime yet.

The page that runs them is `src/pages/play.tsx`. To refresh after an engine
change:

    (cd ../balaur && ./scripts/package_template.sh web)
    cp ../balaur/dist/balaur.js ../balaur/dist/balaur_bg.wasm static/play/
    ../balaur/target/release/balaur export ../balaur/examples/hello --keep-sources --output static/play/hello.bpak

The module is 17 MB raw and about 4.5 MB over the wire once the host
compresses it. It lives in git until the engine publishes releases the site
can fetch from instead.
