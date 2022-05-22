#!/usr/bin/env sh

DAY=$1
deno test --allow-read ./src/${DAY}/${DAY}_test.ts \
&& deno run --allow-read ./src/${DAY}/main.ts
