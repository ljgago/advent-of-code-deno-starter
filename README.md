# Advent of Code Deno Starter

[![Run on Repl.it](https://repl.it/badge/github/ljgago/advent-of-code-deno-starter)](https://repl.it/github/ljgago/advent-of-code-deno-starter)

A template for [Advent of Code](https://adventofcode.com) written in Typescript
with Deno.

## Usage

The project use [Deno](https://deno.land/) as typescript runtime and testing.

    $ git clone https://github.com/ljgago/advent-of-code-deno-starter aoc-deno
    $ cd aoc-deno

    # run tests for day01
    $ deno task test day01

    # run the day01
    # deno task run day01

    # run tests and run day01 if tests pass
    # deno task testrun day01

## Generate

You can generate all necesary files for use in the event with a simple
command:

    $ deno task gen day01

This command generate these files:

    * creating src/day01/resources/input.txt
    * creating src/day01/day01.ts
    * creating src/day01/day01_test.ts
    * creating src/day01/main.js
    * creating src/day01/README.md

- `src/day01/resources/input.txt`: the input data.
- `src/day01/day01.ts`: solutions for part 1 and part 2.
- `src/day01/day01_test.ts`: tests for part 1 and part 2.
- `src/day01/main.ts`: the main module.
- `src/day01/README.md`: you can write the challenge statement.

## Config

You can configure the automatic input download from the Advent of Code session
token.

For dowload the inputs from web, you needs to set the environment var
`AOC_SESSION`. You can to get the session token from the cookie web browser.

Also can you set the `AOC_YEAR` to select a certain year.
(It is not mandatory use the `AOC_YEAR`, the `npm run gen` can get the year
automatically)

You can set an `.env` file with these variables.

Folder structure:

    └── src
        └── day01
            ├── day01.ts
            ├── day01_test.ts
            ├── main.ts
            ├── README.md
            └── resources
                └── input.txt

## Replit

You can clone and run the project on Replit.

## Nix

You can use `nix-shell` for install the project dependencies.

Happy coding!

[MIT License](LICENSE)

