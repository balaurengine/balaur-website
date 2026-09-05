#!/usr/bin/env bash
# Sync the generated reference data from the engine repository. `api.json`
# (what `balaur api` prints, plus component tags and asset docs) lands in
# reference/ and scripts/gen-reference.mjs turns it into docs/reference/**
# at build time; `crates.md` lands in the manual as docs/crates.md. The
# engine generates both with scripts/gen_docs.py and CI fails on drift, so
# they are always current on its main branch.
#
# `features.md` lands in docs/manual/_features.mdx, the partial the Build size
# page imports: the banner and the title go, since MDX has no HTML comments
# and the page has its own heading.
#
# `CHANGELOG.md` comes from the engine's root rather than docs/generated — it
# is hand written, one line per feature, and it is the "what shipped" that the
# roadmap's "what has not" points at.
#
# By default this fetches from GitHub. Set BALAUR_REPO to a local checkout
# to sync from the working tree instead:
#
#   BALAUR_REPO=~/src/balaur ./scripts/sync-docs.sh
#
# If a fetch fails, the committed copy is kept and the build proceeds.
set -euo pipefail

BASE_URL="https://raw.githubusercontent.com/balaurengine/balaur/main/docs/generated"
ROOT_URL="https://raw.githubusercontent.com/balaurengine/balaur/main"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

fetch() { # fetch <file> <dest>
  local file="$1" dest="$2" tmp
  tmp="$(mktemp)"
  if [[ -n "${BALAUR_REPO:-}" ]]; then
    cp "$BALAUR_REPO/docs/generated/$file" "$tmp"
  elif ! curl -fsSL "$BASE_URL/$file" -o "$tmp"; then
    echo "warning: could not fetch $file; keeping the committed copy" >&2
    rm -f "$tmp"
    return 1
  fi
  mv "$tmp" "$dest"
  echo "synced $file"
}

mkdir -p "$ROOT/reference"
fetch api.json "$ROOT/reference/api.json" || true

tmp="$(mktemp)"
if fetch crates.md "$tmp"; then
  {
    printf -- '---\ntitle: "Crates — the Rust workspace, crate by crate"\nsidebar_label: "Crates"\nimage: "/img/social/crates.png"\ndescription: "One section per crate in the Balaur game engine workspace: what each is for and what it depends on."\ncustom_edit_url: null\n---\n\n'
    cat "$tmp"
  } >"$ROOT/docs/crates.md"
fi
rm -f "$tmp"

tmp="$(mktemp)"
if fetch features.md "$tmp"; then
  awk 'started || (!/^<!--/ && !/^# / && !/^$/) {started=1; print}' "$tmp" \
    >"$ROOT/docs/manual/_features.mdx"
fi
rm -f "$tmp"

# The benchmark report, from the engine's docs/ rather than docs/generated:
# `scripts/bench_compare.py` there writes it from a real run on a real
# machine, and it is committed rather than generated in CI.
tmp="$(mktemp)"
if [[ -n "${BALAUR_REPO:-}" ]]; then
  cp "$BALAUR_REPO/docs/BENCHMARKS.md" "$tmp" && benchmarks=1 || benchmarks=0
elif curl -fsSL "$ROOT_URL/docs/BENCHMARKS.md" -o "$tmp"; then
  benchmarks=1
else
  benchmarks=0
fi
if [[ "$benchmarks" == 1 ]]; then
  {
    printf -- '---\ntitle: "Benchmarks — Balaur beside Godot, case for case"\nsidebar_label: "Benchmarks"\nimage: "/img/social/benchmarks.png"\ndescription: "The Balaur game engine measured on the same physics and scene-tree scenes the Godot benchmark suites publish: what a tick costs, what rapier costs inside it, and what the engine adds."\ncustom_edit_url: null\n---\n\n'
    # The generator banner and its own `# Benchmarks` heading would repeat
    # the page title.
    sed -e '/^<!-- Written by scripts/d' -e '1,4{/^# Benchmarks$/d;}' "$tmp"
  } >"$ROOT/docs/benchmarks.md"
  echo "synced BENCHMARKS.md"
else
  echo "warning: could not fetch BENCHMARKS.md; keeping the committed copy" >&2
fi
rm -f "$tmp"

# The changelog, from the engine's root rather than docs/generated.
tmp="$(mktemp)"
if [[ -n "${BALAUR_REPO:-}" ]]; then
  cp "$BALAUR_REPO/CHANGELOG.md" "$tmp" && changelog=1 || changelog=0
elif curl -fsSL "$ROOT_URL/CHANGELOG.md" -o "$tmp"; then
  changelog=1
else
  changelog=0
fi
if [[ "$changelog" == 1 ]]; then
  {
    printf -- '---\ntitle: "Changelog"\nsidebar_label: "Changelog"\nimage: "/img/social/changelog.png"\ndescription: "What each release of the Balaur game engine added, release by release."\ncustom_edit_url: null\n---\n\n'
    # Its own `# Changelog` heading would repeat the page title.
    sed '1{/^# Changelog$/d;}' "$tmp"
  } >"$ROOT/docs/changelog.md"
  echo "synced CHANGELOG.md"
else
  echo "warning: could not fetch CHANGELOG.md; keeping the committed copy" >&2
fi
rm -f "$tmp"
