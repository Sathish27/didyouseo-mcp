#!/bin/sh
# Copy the SEO skills from the web repo (the single source: web/content/skills)
# into both plugins. Run after any skill changes on didyouseo.com.
# Usage: sh scripts/sync-skills.sh [path-to-web-repo]   (default ../didyouseo/web)
set -e
cd "$(dirname "$0")/.."
SRC="${1:-../didyouseo/web}/content/skills"
[ -d "$SRC" ] || { echo "No skills at $SRC"; exit 1; }
for dest in plugins/didyouseo/skills chatgpt-plugin/skills; do
  rm -rf "$dest"
  mkdir -p "$dest"
  for d in "$SRC"/*/; do
    name=$(basename "$d")
    mkdir -p "$dest/$name"
    cp "$d/SKILL.md" "$dest/$name/SKILL.md"
  done
  echo "Synced $(ls "$dest" | wc -l | tr -d ' ') skills into $dest"
done
