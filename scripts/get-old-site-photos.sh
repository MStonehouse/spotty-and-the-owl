#!/usr/bin/env bash
# Downloads the 27 gallery photos from Dan's old WordPress site
# (spottyandtheowlapparel.com) into old-site-photos/, then packs them into
# old-site-photos.zip so they can be reviewed and the best ones added to the
# Work gallery.
#
# Run it from the project folder:   bash scripts/get-old-site-photos.sh
#
# The folder and the zip are listed in .gitignore, so they never get committed
# by accident. Only the photos we pick get added to the site, resized.

set -euo pipefail   # stop at the first error instead of carrying on

BASE="https://spottyandtheowlapparel.com/wp-content/uploads/2025/03/spottyandtheowlapparel-Gallery"
OUT="old-site-photos"

# Photo numbers on the old site. Most are "-scaled" copies; 12, 13, 14 and 27 aren't.
SCALED=(1 2 3 4 5 6 7 8 9 10 11 15 16 17 18 19 22 23 24 25 26 28 29)
PLAIN=(12 13 14 27)

mkdir -p "$OUT"
got=0; failed=0

fetch() {   # fetch <url> <file name>
  if [[ -s "$OUT/$2" ]]; then echo "  already have $2"; got=$((got+1)); return; fi
  if curl -fsSL --retry 2 -o "$OUT/$2" "$1"; then
    echo "  downloaded $2"; got=$((got+1))
  else
    echo "  FAILED     $2"; rm -f "$OUT/$2"; failed=$((failed+1))
  fi
}

echo "Downloading from the old site into $OUT/ ..."
for n in "${SCALED[@]}"; do fetch "$BASE-$n-scaled.jpg" "gallery-$(printf %02d "$n").jpg"; done
for n in "${PLAIN[@]}";  do fetch "$BASE-$n.jpg"        "gallery-$(printf %02d "$n").jpg"; done

echo
echo "$got of 27 photos in $OUT/  ($failed failed)"

if [[ $got -eq 0 ]]; then
  echo "Nothing downloaded. Check the internet connection, or whether the old site is still up"
  echo "(open spottyandtheowlapparel.com in a browser), then run this again."
  exit 1
fi

# Pack them into one file to attach in the chat.
if command -v zip >/dev/null; then
  rm -f old-site-photos.zip && zip -qr old-site-photos.zip "$OUT"
  echo "Made old-site-photos.zip ($(du -h old-site-photos.zip | cut -f1)). Attach that file in the chat."
else
  tar -czf old-site-photos.tar.gz "$OUT"
  echo "Made old-site-photos.tar.gz ($(du -h old-site-photos.tar.gz | cut -f1)). Attach that file in the chat."
fi
