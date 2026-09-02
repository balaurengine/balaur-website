#!/usr/bin/env bash
# Sync the generated reference data from the engine repository. `api.json`
# (what `balaur api` prints, plus component tags and asset docs) lands in
# reference/ and scripts/gen-reference.mjs turns it into docs/reference/**
# at build time; `crates.md` lands in the manual as docs/crates.md. The
# engine generates both with scripts/gen_docs.py and CI fails on drift, so
# they are always current on its main branch.
#
# By default this fetches from GitHub. Set BALAUR_REPO to a local checkout
# to sync from the working tree instead:
#
#   BALAUR_REPO=~/src/balaur ./scripts/sync-docs.sh
#
# If a fetch fails, the committed copy is kept and the build proceeds.
set -euo pipefail

BASE_URL="https://raw.githubusercontent.com/balaurengine/balaur/main/docs/generated"
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
    printf -- '---\ntitle: "Crates"\nsidebar_label: "Crates"\ncustom_edit_url: null\n---\n\n'
    cat "$tmp"
  } >"$ROOT/docs/crates.md"
fi
rm -f "$tmp"
