#!/usr/bin/env bash
# Sync the generated reference docs from the engine repository into
# docs/reference/. The engine generates these with scripts/gen_docs.py and
# CI fails on drift, so they are always current on its main branch.
#
# By default this fetches from GitHub. Set BALAUR_REPO to a local checkout
# to sync from the working tree instead:
#
#   BALAUR_REPO=~/src/balaur ./scripts/sync-docs.sh
#
# If a fetch fails, the committed copy is kept and the build proceeds.
set -euo pipefail

BASE_URL="https://raw.githubusercontent.com/balaurengine/balaur/main/docs/generated"
DEST="$(cd "$(dirname "$0")/.." && pwd)/docs/reference"
mkdir -p "$DEST"

sync_doc() {
  local file="$1" position="$2" label="$3"
  local tmp
  tmp="$(mktemp)"
  if [[ -n "${BALAUR_REPO:-}" ]]; then
    cp "$BALAUR_REPO/docs/generated/$file" "$tmp"
  elif ! curl -fsSL "$BASE_URL/$file" -o "$tmp"; then
    echo "warning: could not fetch $file; keeping the committed copy" >&2
    rm -f "$tmp"
    return 0
  fi
  {
    printf -- '---\ntitle: "%s"\nsidebar_position: %s\nsidebar_label: "%s"\ncustom_edit_url: null\n---\n\n' \
      "$label" "$position" "$label"
    cat "$tmp"
  } >"$DEST/$file"
  rm -f "$tmp"
  echo "synced $file"
}

sync_doc script-api.md 1 "Script API"
sync_doc crates.md 2 "Crates"
sync_doc crate-graph.md 3 "Crate graph"
sync_doc behaviour.md 4 "Behaviour"
