#!/usr/bin/env bash
# Sync the web build from the engine's releases. `balaur-play.tar.gz` is the
# glue, the wasm module and the packs /play and /editor open, built by the
# engine's CI (scripts/package_play.sh there) onto every release. The
# `nightly` prerelease by default; ENGINE_TAG names a version instead.
#
# The bundle's VERSION names the engine build. When it matches
# static/play/VERSION there is nothing to do; FORCE=1 syncs anyway. Every
# deploy runs this; a manual or engine-dispatched run also commits the change.
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
# The two the page cannot run without; everything else is whatever the bundle
# carries, so a pack or a module the engine adds arrives without a name being
# added here.
REQUIRED=(balaur.js balaur_bg.wasm)
# The page's own, which the bundle does not carry and a sync keeps.
KEPT=(README.md VERSION)

warn() { echo "warning: $*; keeping the committed copy" >&2; }

# Replace static/play with what the bundle holds: a pack no longer shipped
# goes, and so does a module. Copied whole rather than by a list kept here,
# because `balaur.js` imports wasm-bindgen's `snippets/` by relative path and
# a file this script did not know to copy is a 404 that nothing else catches.
install_play() { # install_play <dir>
  local src=$1 f
  for f in "${REQUIRED[@]}"; do
    [[ -s "$src/$f" ]] || { warn "no $src/$f — run scripts/package_play.sh there"; return 1; }
  done
  shopt -s nullglob
  local packs=("$src"/*.bpak)
  shopt -u nullglob
  [[ ${#packs[@]} -ge 2 ]] || { warn "$src holds ${#packs[@]} pack(s); the editor and the examples are expected"; return 1; }
  local keep=()
  for f in "${KEPT[@]}"; do keep+=(! -name "$f"); done
  find "$PLAY" -mindepth 1 -maxdepth 1 "${keep[@]}" -exec rm -rf {} +
  cp -R "$src"/. "$PLAY/"
  imports_resolve || return 1
  echo "packs: $(cd "$src" && ls *.bpak | tr '\n' ' ')"
}

# Every module `balaur.js` imports is beside it. A static import that 404s
# stops the module evaluating, so the page draws nothing and the build that
# shipped it is green.
imports_resolve() {
  local missing=() rel
  while read -r rel; do
    [[ -n "$rel" ]] || continue
    [[ -s "$PLAY/$rel" ]] || missing+=("$rel")
  done < <(grep -oE "from '\./[^']+'" "$PLAY/balaur.js" | sed "s|from '\./||;s|'\$||")
  [[ ${#missing[@]} -eq 0 ]] || { warn "balaur.js imports ${missing[*]}, which the bundle did not carry"; return 1; }
}

mkdir -p "$PLAY"

if [[ -n "${BALAUR_REPO:-}" ]]; then
  src="$BALAUR_REPO/dist/play"
  install_play "$src" || exit 0
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
# The sums cover every asset of the release; check the one downloaded. The
# hash is computed and compared here rather than through `-c`: macOS ships an
# /sbin/sha256sum that hashes a file and has no check mode, so the name alone
# picked a tool that could not do it and every local sync kept the old copy.
if command -v sha256sum >/dev/null 2>&1; then sum=(sha256sum); else sum=(shasum -a 256); fi
want_sum=$(grep ' balaur-play.tar.gz$' "$tmp/SHA256SUMS" | cut -d' ' -f1)
got_sum=$("${sum[@]}" "$tmp/balaur-play.tar.gz" | cut -d' ' -f1)
[[ -n "$want_sum" && "$want_sum" == "$got_sum" ]] ||
  { warn "balaur-play.tar.gz does not match SHA256SUMS"; exit 0; }

mkdir -p "$tmp/play"
tar -xzf "$tmp/balaur-play.tar.gz" -C "$tmp/play"
install_play "$tmp/play" || exit 0
printf '%s\n' "$want" >"$PLAY/VERSION"
echo "synced play: engine ${have:-none} -> $want"
