// Advent of Code - Day 1

import { part1, part2 } from "./day01.ts";

try {
  const input = await Deno.readTextFile("src/day01/resources/input.txt");

  console.log("--- Part One ---");
  console.log("Result:", part1(input));

  console.log("--- Part Two ---");
  console.log("Result:", part2(input));

} catch (err) {
    console.error(err);
}
