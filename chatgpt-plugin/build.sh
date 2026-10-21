#!/bin/sh
# Builds the ChatGPT plugin ZIP for platform.openai.com/plugins.
# plugin.json must sit at the archive root, so zip from inside this folder.
set -e
cd "$(dirname "$0")"
mkdir -p ../dist
rm -f ../dist/didyouseo-chatgpt-plugin.zip
zip -q -X -r ../dist/didyouseo-chatgpt-plugin.zip plugin.json mcp.json assets
echo "Built $(cd ../dist && pwd)/didyouseo-chatgpt-plugin.zip"
