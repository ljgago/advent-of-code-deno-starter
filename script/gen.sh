#!/usr/bin/env sh

DAY=$1
deno run --allow-all script/gen.ts ${DAY}
