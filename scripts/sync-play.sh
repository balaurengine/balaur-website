#!/usr/bin/env bash
# Sync the web build from the engine's releases. `balaur-play.tar.gz` is the
# glue, the wasm module and the packs /play and /editor open, built by the
# engine's CI (scripts/package_play.sh there) onto every release. The
# `nightly` prerelease by default; ENGINE_TAG names a version instead.
#
# The bundle's VERSION names the engine build. When it matches
# static/play/VERSION there is nothing to do; FORCE=1 syncs anyway. CI runs
# this daily and commits what changed (.github/workflows/deploy.yml).
#
# Set BALAUR_REPO to a local checkout to copy its dist/play/ instead, the
# output of `scripts/package_template.sh web && scripts/package_play.sh`:
#
#   BALAUR_REPO=../balaur ./scripts/sync-play.sh
#
# If a fetch fails, the committed copy is kept and the build proceeds.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PLAY="$ROOT/static/play"
TAG="${ENGINE_TAG:-nightly}"
BASE="https://github.com/balaurengine/balaur/releases/download/$TAG"
FILES=(balaur.js balaur_bg.wasm editor.bpak hello.bpak angrynerds.bpak rig.bpak benchmark.bpak)

warn() { echo "warning: $*; keeping the committed copy" >&2; }

mkdir -p "$PLAY"

if [[ -n "${BALAUR_REPO:-}" ]]; then
  src="$BALAUR_REPO/dist/play"
  for f in "${FILES[@]}"; do
    [[ -s "$src/$f" ]] || { warn "no $src/$f — run scripts/package_play.sh there"; exit 0; }
  done
  cp "${FILES[@]/#/$src/}" "$PLAY/"
  printf 'local-%s\n' "$(git -C "$BALAUR_REPO" rev-parse --short=7 HEAD)" >"$PLAY/VERSION"
  echo "synced play from $src"
  exit 0
fi

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

curl -fsSL "$BASE/VERSION" -o "$tmp/VERSION" || { warn "could not fetch $BASE/VERSION"; exit 0; }
want="$(tr -d '[:space:]' <"$tmp/VERSION")"
have="$(tr -d '[:space:]' <"$PLAY/VERSION" 2>/dev/null || true)"
if [[ "$have" == "$want" && -z "${FORCE:-}" ]]; then
  echo "play is at engine $want already"
  exit 0
fi

for f in balaur-play.tar.gz SHA256SUMS; do
  curl -fsSL "$BASE/$f" -o "$tmp/$f" || { warn "could not fetch $BASE/$f"; exit 0; }
done
# The sums cover every asset of the release; check the one downloaded.
if command -v sha256sum >/dev/null 2>&1; then sum=(sha256sum); else sum=(shasum -a 256); fi
(cd "$tmp" && grep ' balaur-play.tar.gz$' SHA256SUMS | "${sum[@]}" -c --quiet) ||
  { warn "balaur-play.tar.gz does not match SHA256SUMS"; exit 0; }

mkdir -p "$tmp/play"
tar -xzf "$tmp/balaur-play.tar.gz" -C "$tmp/play"
for f in "${FILES[@]}"; do
  [[ -s "$tmp/play/$f" ]] || { warn "the bundle has no $f"; exit 0; }
done
cp "${FILES[@]/#/$tmp/play/}" "$PLAY/"
printf '%s\n' "$want" >"$PLAY/VERSION"
echo "synced play: engine ${have:-none} -> $want"
