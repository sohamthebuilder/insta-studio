#!/bin/bash
# Render every slide of one piece to social/<slug>/ at the repo root and make a contact sheet.
# usage: bash render-piece.sh <slug> [--guides]
#   --guides  shades the safe zones in red, into social/<slug>/guides/ (for checking only)
set -e
cd "$(dirname "$0")"
SLUG="$1"; [ -z "$SLUG" ] && { echo "usage: bash render-piece.sh <slug> [--guides]"; exit 1; }
OUT=../social/$SLUG; GUIDES=false
if [ "$2" = "--guides" ]; then OUT=$OUT/guides; GUIDES=true; fi
mkdir -p "$OUT"
IDS=$(npx remotion compositions src/index.ts --timeout=240000 --quiet 2>/dev/null | tr " " "\n" | grep "^$SLUG--[0-9]*$" || true)
[ -z "$IDS" ] && { echo "No slides found for '$SLUG'. Is it listed in src/pieces/index.ts?"; exit 1; }
ARGS=(); FILT=""; i=0
for id in $IDS; do
  n=${id##*--}
  # input props merge over the piece's default props, so only the guides flag changes
  npx remotion still src/index.ts "$id" --timeout=240000 "$OUT/$n.png" --image-format=png --props="{\"guides\":$GUIDES}" --log=error
  echo "  $OUT/$n.png"
  ARGS+=(-i "$OUT/$n.png"); FILT+="[$i]scale=-2:640,pad=iw+12:652:6:6:#ECE7DD[s$i];"; i=$((i+1))
done
LABELS=$(for j in $(seq 0 $((i-1))); do printf "[s$j]"; done)
if [ $i -gt 1 ]; then ffmpeg -v error -y "${ARGS[@]}" -filter_complex "${FILT}${LABELS}hstack=$i" "$OUT/sheet.png"
else ffmpeg -v error -y "${ARGS[@]}" -vf "scale=-2:640" "$OUT/sheet.png"; fi
echo "-> $OUT/sheet.png"
