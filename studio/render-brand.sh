#!/bin/bash
# Render the whole brand kit from ../account.json in one go:
#   ../brand/templates/png/*.png + ../brand/templates/template-sheet.png
#   ../brand/assets/avatar/avatar-{A,B,C}.png + avatar-options.png (pick one, set "logoOption")
#   ../brand/assets/profile/profile-instagram-1080.png, profile-youtube-800.png
#   ../brand/assets/youtube-banner.jpg (+ youtube-banner-guides.png)
# usage: bash render-brand.sh
set -e
cd "$(dirname "$0")"
A=../brand/assets; mkdir -p "$A/avatar" "$A/profile"
TMP=$(mktemp -d)
bash render-templates.sh
T=../brand/templates/png

# template sheet: two rows of thumbnails 640 px tall, rows padded to the same width
FILES=($(ls $T/*.png | grep -v youtube-banner)); N=${#FILES[@]}; H=$(( (N+1)/2 ))
row() { local out="$1"; shift; local a=() f="" n=0
  for x in "$@"; do a+=(-i "$x"); f+="[$n]scale=-2:640,pad=iw+12:652:6:6:#ECE7DD[s$n];"; n=$((n+1)); done
  local l=$(for j in $(seq 0 $((n-1))); do printf "[s$j]"; done)
  ffmpeg -v error -y "${a[@]}" -filter_complex "${f}${l}hstack=$n" "$out"; }
row "$TMP/r1.png" "${FILES[@]:0:$H}"; row "$TMP/r2.png" "${FILES[@]:$H}"
w1=$(ffprobe -v error -show_entries stream=width -of csv=p=0 "$TMP/r1.png"); w2=$(ffprobe -v error -show_entries stream=width -of csv=p=0 "$TMP/r2.png")
W=$(( w1 > w2 ? w1 : w2 ))
ffmpeg -v error -y -i "$TMP/r1.png" -i "$TMP/r2.png" -filter_complex "[0]pad=$W:ih:0:0:#ECE7DD[a];[1]pad=$W:ih:0:0:#ECE7DD[b];[a][b]vstack" ../brand/templates/template-sheet.png
echo "  template-sheet.png"

# avatars, profile pictures, banner
for id in A B C; do npx remotion still src/index.ts Avatar$id "$A/avatar/avatar-$id.png" --image-format=png --log=error; done
npx remotion still src/index.ts AvatarSheet "$A/avatar/avatar-options.png" --image-format=png --log=error
LOGO=$(python3 -c "import json;print(json.load(open('../account.json'))['logoOption'])")
cp "$A/avatar/avatar-$LOGO.png" "$A/profile/profile-instagram-1080.png"
ffmpeg -v error -y -i "$A/avatar/avatar-$LOGO.png" -vf scale=800:800 "$A/profile/profile-youtube-800.png"
npx remotion still src/index.ts youtube-banner "$A/youtube-banner.jpg" --image-format=jpeg --jpeg-quality=92 --log=error
npx remotion still src/index.ts youtube-banner "$A/youtube-banner-guides.png" --image-format=png --props='{"guides":true}' --log=error
rm -rf "$TMP"
echo "-> brand kit rendered into ../brand/"
