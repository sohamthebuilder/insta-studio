#!/bin/bash
# One-time setup: checks tools, installs the brand studio and the shared faster-whisper venv.
# usage: bash scripts/setup.sh
set -e
cd "$(dirname "$0")/.."
ok() { command -v "$1" >/dev/null && echo "  ✓ $1 $($1 $2 2>&1 | head -1)" || { echo "  ✗ $1 missing: $3"; MISSING=1; }; }
echo "Checking tools"
ok node -v "install Node 18+ LTS from nodejs.org"
ok ffmpeg -version "brew install ffmpeg (Mac) / winget install ffmpeg (Windows)"
ok python3 --version "install Python 3"
[ -n "$MISSING" ] && { echo "Install the missing tools, then run this again."; exit 1; }
echo "Installing the brand studio"
(cd studio && npm install --no-audit --no-fund)
if [ ! -x .venv/bin/python ]; then
  echo "Creating .venv with faster-whisper (word timing)"
  python3 -m venv .venv && .venv/bin/pip install -q faster-whisper
fi
echo "Done. ElevenLabs: connect the ElevenLabs connector in the Claude app (Settings → Connectors),"
echo "or export ELEVENLABS_API_KEY. Then open this folder in Claude Code and say 'set up a new account'."
