#!/bin/bash
# Download one library style's upstream demo code to READ while porting it (see styles/ADAPTING.md §4).
# usage: bash scripts/fetch-style-demo.sh <style>      e.g. bash scripts/fetch-style-demo.sh watercolor
#
# Pinned to the commit in styles/catalog.json. Lands in styles/_upstream/ (git-ignored) with a link at
# styles/<style>/demo. Reference only: never run the demo's own build, fetch or render scripts.
set -e
cd "$(dirname "$0")/.."
STYLE="$1"
[ -z "$STYLE" ] && { echo "usage: bash scripts/fetch-style-demo.sh <style>"; exit 1; }
[ "$STYLE" = "storybook" ] && { echo "storybook is the house style: its code is engine/template/src/kit and engine/examples/"; exit 0; }
[ -f "styles/$STYLE/style.json" ] || { echo "no style called '$STYLE' (see styles/README.md)"; exit 1; }
REPO=$(node -e 'const c=require("./styles/catalog.json");console.log(c.upstream.repo)')
SHA=$(node -e 'const c=require("./styles/catalog.json");console.log(c.upstream.commit)')
UP=styles/_upstream/lemo-opuscar

if [ ! -d "$UP/.git" ]; then
  mkdir -p "$UP"
  git -C "$UP" init -q
  git -C "$UP" remote add origin "$REPO"
  git -C "$UP" config core.sparseCheckout true
  git -C "$UP" sparse-checkout init --cone -q 2>/dev/null || git -C "$UP" sparse-checkout init --cone
  git -C "$UP" sparse-checkout set core
fi
git -C "$UP" sparse-checkout add "styles/$STYLE/demo"
if ! git -C "$UP" cat-file -e "$SHA^{commit}" 2>/dev/null; then
  git -C "$UP" fetch -q --depth 1 --filter=blob:none origin "$SHA"
fi
git -C "$UP" -c advice.detachedHead=false checkout -q "$SHA"

ln -sfn "../_upstream/lemo-opuscar/styles/$STYLE/demo" "styles/$STYLE/demo"
echo "-> styles/$STYLE/demo   (engine code to read and port)"
echo "-> $UP/core              (shared helpers the demos import as /core/...)"
echo "Reference only. Don't run its scripts, and don't reuse its voice, music, footage or font files (see its CREDITS)."
