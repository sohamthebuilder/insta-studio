#!/bin/bash
# Start a new reel project from the engine template.
# usage: bash scripts/new-reel.sh <slug> [--style <style>]     (slug: lowercase-with-dashes)
#   --style  a folder in styles/ (default: account.json styles.default). Recorded in src/story.ts;
#            styles with renderer "three" (styles/catalog.json) also get three.js installed.
set -e
cd "$(dirname "$0")/.."
SLUG="$1"; [ -z "$SLUG" ] && { echo "usage: bash scripts/new-reel.sh <slug> [--style <style>]"; exit 1; }
shift
STYLE=""
while [ $# -gt 0 ]; do
  case "$1" in
    --style) STYLE="$2"; shift 2 ;;
    *) echo "unknown option: $1"; exit 1 ;;
  esac
done
[ -z "$STYLE" ] && STYLE=$(node -e 'const a=require("./account.json");console.log((a.styles&&a.styles.default)||"storybook")')
[ -f "styles/$STYLE/STYLE.md" ] || { echo "no style called '$STYLE' (see styles/README.md)"; exit 1; }
RENDERER=$(node -e 'const c=require("./styles/catalog.json");const s=c.styles[process.argv[1]];console.log(s?s.renderer:"canvas")' "$STYLE")
[ -e "reels/$SLUG" ] && { echo "reels/$SLUG already exists"; exit 1; }

cp -R engine/template "reels/$SLUG"
node -e 'const fs=require("fs");const f=process.argv[1];fs.writeFileSync(f,fs.readFileSync(f,"utf8").replace(/export const STYLE = "[^"]*";/,`export const STYLE = "${process.argv[2]}";`))' "reels/$SLUG/src/story.ts" "$STYLE"
(cd "reels/$SLUG" && npm install --no-audit --no-fund)
if [ "$RENDERER" = "three" ]; then
  (cd "reels/$SLUG" && npm install --no-audit --no-fund three@0.170.0 @types/three@0.170.0)
fi
[ -x .venv/bin/python ] && ln -s ../../.venv "reels/$SLUG/.venv"
mkdir -p "reels/$SLUG/public/audio" "reels/$SLUG/out"
echo "-> reels/$SLUG ready, style: $STYLE (renderer: $RENDERER). Set SHAPES[\"9:16\"] in src/story.ts."
[ "$RENDERER" != "svg" ] && echo "   Draw with <StyleCanvas> (src/kit/StyleCanvas.tsx). Reference code: bash scripts/fetch-style-demo.sh $STYLE"
exit 0
