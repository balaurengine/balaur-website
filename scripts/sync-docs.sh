#!/usr/bin/env bash
# Sync the generated reference data from the engine repository. `api.json`
# (what `balaur api` prints, plus component tags and asset docs) lands in
# reference/ and scripts/gen-reference.mjs turns it into docs/reference/**
# at build time. The engine generates it with scripts/gen_docs.py and CI fails
# on drift, so it is always current on its main branch.
#
# `features.md` lands in docs/manual/_features.mdx, the partial the Build size
# page imports: the banner and the title go, since MDX has no HTML comments
# and the page has its own heading.

#
# `docs/ROADMAP.md` lands in reference/roadmap.md, which scripts/gen-roadmap.mjs
# turns into docs/roadmap.mdx with the prose in src/data/roadmap-copy.mjs. It is
# hand written too: the engine owns which items exist, this repository owns how
# each card reads.
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
    awk 'NR<=4 && (/^<!-- Written by scripts/ || /^# Benchmarks$/) {next} {print}' "$tmp"
  } >"$ROOT/docs/benchmarks.md"
  echo "synced BENCHMARKS.md"
else
  echo "warning: could not fetch BENCHMARKS.md; keeping the committed copy" >&2
fi
rm -f "$tmp"

# The roadmap's structure, from the engine's docs/. gen-roadmap.mjs reads this
# copy when BALAUR_REPO is unset, so the committed one keeps a build going.
tmp="$(mktemp)"
if [[ -n "${BALAUR_REPO:-}" ]]; then
  cp "$BALAUR_REPO/docs/ROADMAP.md" "$tmp" && roadmap=1 || roadmap=0
elif curl -fsSL "$ROOT_URL/docs/ROADMAP.md" -o "$tmp"; then
  roadmap=1
else
  roadmap=0
fi
if [[ "$roadmap" == 1 ]]; then
  mv "$tmp" "$ROOT/reference/roadmap.md"
  echo "synced ROADMAP.md"
else
  echo "warning: could not fetch ROADMAP.md; keeping the committed copy" >&2
fi
rm -f "$tmp"
