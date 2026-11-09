#!/bin/bash
# Render every template to ../brand/templates/png (clean) and, with --guides, to ../brand/templates/guides.
# usage: bash render-templates.sh [--guides]
set -e
cd "$(dirname "$0")"
MODE=png; PROPS='{"guides":false}'
if [ "$1" = "--guides" ]; then MODE=guides; PROPS='{"guides":true}'; fi
OUT=../brand/templates/$MODE; mkdir -p "$OUT"
for id in $(grep -o '"[a-z]*-[0-9a-z-]*": { C' src/templates/registry.tsx | cut -d'"' -f2); do
  npx remotion still src/index.ts "$id" "$OUT/$id.png" --image-format=png --props="$PROPS" --log=error
  echo "  $id"
done
