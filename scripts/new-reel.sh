#!/bin/bash
# Start a new reel project from the engine template.
# usage: bash scripts/new-reel.sh <slug>     (slug: lowercase-with-dashes)
set -e
cd "$(dirname "$0")/.."
SLUG="$1"; [ -z "$SLUG" ] && { echo "usage: bash scripts/new-reel.sh <slug>"; exit 1; }
[ -e "reels/$SLUG" ] && { echo "reels/$SLUG already exists"; exit 1; }
cp -R engine/template "reels/$SLUG"
(cd "reels/$SLUG" && npm install --no-audit --no-fund)
[ -x .venv/bin/python ] && ln -s ../../.venv "reels/$SLUG/.venv"
mkdir -p "reels/$SLUG/public/audio" "reels/$SLUG/out"
echo "-> reels/$SLUG ready. Set SHAPES[\"9:16\"] in src/story.ts."
