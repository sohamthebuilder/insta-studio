#!/bin/bash
# Render a sheet of style posters to choose a look from.
# usage: bash render-style-picker.sh                      every style  -> ../styles/picker/all.jpg
#        bash render-style-picker.sh storybook watercolor  these, numbered in this order
#                                                          -> ../styles/picker/storybook+watercolor.jpg
#        bash render-style-picker.sh --allowed             account.json styles.allowed
set -e
cd "$(dirname "$0")"
node ../scripts/styles-index.mjs >/dev/null
if [ "$1" = "--allowed" ]; then
  set -- $(node -e 'const a=require("../account.json");console.log(((a.styles&&a.styles.allowed)||["storybook"]).join(" "))')
fi
for s in "$@"; do [ -f "../styles/$s/style.json" ] || { echo "no style called '$s' (see styles/README.md)"; exit 1; }; done

PUB=$(mktemp -d)
trap 'rm -rf "$PUB"' EXIT
if [ $# -eq 0 ]; then SLUGS=$(node -e 'console.log(require("../styles/index.json").map(r=>r.slug).join(" "))'); NAME=all
else SLUGS="$*"; NAME=$(IFS=+; echo "$*"); fi
for s in $SLUGS; do [ -f "../styles/$s/poster.jpg" ] && cp "../styles/$s/poster.jpg" "$PUB/$s.jpg"; done

OUT=../styles/picker; mkdir -p "$OUT"
PROPS=$(node -e 'console.log(JSON.stringify({slugs:process.argv.slice(1)}))' "$@")
npx remotion still src/index.ts StylePicker "$OUT/$NAME.jpg" --public-dir="$PUB" --props="$PROPS" \
  --image-format=jpeg --jpeg-quality=88 --timeout=240000 --log=error
echo "$(cd "$OUT" && pwd)/$NAME.jpg"
