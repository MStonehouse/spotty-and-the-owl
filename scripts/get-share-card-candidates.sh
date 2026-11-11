#!/usr/bin/env bash
# Downloads 10 free stock photos (Unsplash and Pexels licences: free for commercial
# use, no attribution required) that might suit the share card's embroidery hoop,
# then zips them so they can be attached in the chat for mockups.
#
# Run from the project folder:   bash scripts/get-share-card-candidates.sh
# The folder and zip are git-ignored. Delete this script once a photo is chosen.

set -euo pipefail
OUT="share-card-candidates"
mkdir -p "$OUT"

# file name | photographer and source | download address (1600px wide)
PHOTOS=(
  "01-spools-in-a-line.jpg|Zulfugar Karimov, Unsplash|https://images.unsplash.com/photo-1776107490710-f5c08a0c6a98?w=1600&q=80&fm=jpg"
  "02-threads-on-a-rack.jpg|Annie Spratt, Unsplash|https://images.unsplash.com/photo-1474128670149-7082a8d370ea?w=1600&q=80&fm=jpg"
  "03-screen-printing.jpg|Anthony Roberts, Unsplash|https://images.unsplash.com/photo-1663433567177-9f94be0bff4c?w=1600&q=80&fm=jpg"
  "04-folded-shirts.jpg|Md Salman, Unsplash|https://images.unsplash.com/photo-1562157873-818bc0726f68?w=1600&q=80&fm=jpg"
  "05-tshirt-stacks.jpg|Kibeom Jin, Unsplash|https://images.unsplash.com/photo-1786280870376-888fa1b03bba?w=1600&q=80&fm=jpg"
  "06-embroidery-machine.jpg|Rendy Novantino, Unsplash|https://images.unsplash.com/photo-1772351721253-1008627c8c50?w=1600&q=80&fm=jpg"
  "07-thread-box.jpg|Melike B, Pexels|https://images.pexels.com/photos/7523526/pexels-photo-7523526.jpeg?auto=compress&cs=tinysrgb&w=1600"
  "08-spools-in-rows.jpg|Wendy van Zyl, Pexels|https://images.pexels.com/photos/1212179/pexels-photo-1212179.jpeg?auto=compress&cs=tinysrgb&w=1600"
  "09-spools-close-up.jpg|Michaela St, Pexels|https://images.pexels.com/photos/20578931/pexels-photo-20578931.jpeg?auto=compress&cs=tinysrgb&w=1600"
  "10-wooden-spools.jpg|Suzy Hazelwood, Pexels|https://images.pexels.com/photos/1772891/pexels-photo-1772891.jpeg?auto=compress&cs=tinysrgb&w=1600"
)

got=0; failed=0
: > "$OUT/credits.txt"
for row in "${PHOTOS[@]}"; do
  IFS='|' read -r name who url <<< "$row"
  if curl -fsSL --retry 2 -o "$OUT/$name" "$url"; then
    echo "  downloaded $name"; echo "$name  $who" >> "$OUT/credits.txt"; got=$((got+1))
  else
    echo "  FAILED     $name"; rm -f "$OUT/$name"; failed=$((failed+1))
  fi
done
echo; echo "$got of ${#PHOTOS[@]} photos in $OUT/  ($failed failed)"
[[ $got -eq 0 ]] && { echo "Nothing downloaded. Check the internet connection and try again."; exit 1; }

if command -v zip >/dev/null; then
  rm -f share-card-candidates.zip && zip -qr share-card-candidates.zip "$OUT"
  echo "Made share-card-candidates.zip. Attach it in the chat."
else
  tar -czf share-card-candidates.tar.gz "$OUT"
  echo "Made share-card-candidates.tar.gz. Attach it in the chat."
fi
