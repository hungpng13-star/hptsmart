#!/bin/zsh
set -e
cd "$(dirname "$0")"
if [ ! -d node_modules ]; then npm install; fi
if [ ! -d ios ]; then npm run cap:add:ios; fi
npm run cap:sync:ios
npx cap open ios
