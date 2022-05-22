import { dirname } from "https://deno.land/std/path/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import * as dejs from "https://deno.land/x/dejs/mod.ts";
import * as colors from "https://deno.land/std/fmt/colors.ts";

export interface TemplateData {
  dayName: string;
  dayNumber: string;
}

const templateFiles = (): Array<string> => [
  `script/templates/day.template.ejs`,
  `script/templates/day_test.template.ejs`,
  `script/templates/main.template.ejs`,
  `script/templates/readme.template.ejs`,
];

const targetFiles = (dayName: string): Array<string> => [
  `src/${dayName}/${dayName}.ts`,
  `src/${dayName}/${dayName}_test.ts`,
  `src/${dayName}/main.ts`,
  `src/${dayName}/README.md`,
];

const targetInput = (dayName: string): string =>
  `src/${dayName}/resources/input.txt`;

const zip = (a: Array<string>, b: Array<string>) => a.map((v, i) => [v, b[i]]);

const pipeAsync = (...funcs: CallableFunction[]) =>
  (input: any) =>
    funcs.reduce(
      async (v: any, func: CallableFunction) => func(await v),
      input,
    );

// const asyncLog = async (content: string): Promise<string> => {
//   console.log(content);
//   return content;
// };

// read the template file
async function readTemplate(templateFile: string): Promise<string> {
  return Deno.readTextFile(templateFile);
}

// rendered the template with the data
function renderTemplate(templateData: TemplateData) {
  return async function (content: string) {
    return dejs.renderToString(content, { data: templateData });
  };
}

// create the file with the rendered content
function createFile(filename: string) {
  return async function (content: string) {
    const pathname = dirname(filename);

    try {
      // the folder exist
      await Deno.stat(pathname);
    } catch (err) {
      // the folder doesn't exist, create it
      await Deno.mkdir(pathname, { recursive: true });
    }

    try {
      // if the file exist, end the script
      await Deno.stat(filename);
      console.log(colors.yellow("* ignoring ") + `${filename} already exists`);
      return;
    } catch (_) {}

    await Deno.writeTextFile(filename, content);
    console.log(colors.green("* creating ") + `${filename}`);
  };
}

// return the default year
function defaultYear(): string {
  const today = new Date();
  const year = (today.getMonth() == 11)
    ? today.getFullYear()
    : today.getFullYear() - 1;

  return year.toString();
}

// get the environment data
function getEnv() {
  config({ export: true });

  const session = Deno.env.get("AOC_SESSION")?.toString() || "";
  let year = Deno.env.get("AOC_YEAR")?.toString() || "";
  year = year == "" ? defaultYear() : year;

  return { session: session, year: year };
}

// fetch the puzzle input
async function getInput(
  session: string,
  year: string,
  day: string,
): Promise<string> {
  if (session != "") {
    const url = `https://adventofcode.com/${year}/day/${day}/input`;
    const headers = { "cookie": `session=${session}` };

    try {
      const content = await fetch(url, { headers: headers });
      return content.status == 200 ? content.text() : "";
    } catch (err) {
      console.error(err);
    }
  }

  return "";
}

// run the main routine
(async function () {
  // check if exists one only argument
  if (Deno.args.length != 1) {
    console.log("--- `deno task gen` needs one only argument ---");
    return;
  }

  const dayName = Deno.args[0];

  // check the argument string format
  const re = /(?<=day)\d+(?!\w)/;
  const dayArray = re.exec(dayName) || [];
  const dayNumber = dayArray.length == 1
    ? parseInt(dayArray[0]).toString()
    : "0";

  if (dayNumber == "0") {
    console.log("--- The argument must be `day + NUM` (e.g. day01) ---");
    return;
  }

  const data: TemplateData = {
    dayName: dayName,
    dayNumber: dayNumber,
  };

  const { session, year } = getEnv();
  const contentInput = await getInput(session, year, dayNumber);

  try {
    // create the input file
    await createFile(targetInput(dayName))(contentInput);

    // create and render the template files
    zip(templateFiles(), targetFiles(dayName))
      .forEach((filePaths) => {
        pipeAsync(
          readTemplate,
          renderTemplate(data),
          // asyncLog,
          createFile(filePaths[1]),
        )(filePaths[0]);
      });
  } catch (err) {
    console.error(err);
  }
})();
