#!/usr/bin/env sh

DAY=$1
deno run --allow-read ./src/${DAY}/main.ts
