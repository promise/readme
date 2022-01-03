import { activity, repositories } from "./widgets";
import { readFile, writeFile } from "fs/promises";
import { ageSinceEpoch } from "./utils/time";
import { join } from "path";

readFile(join(__dirname, "../src/template.md"), "utf8").then(async template => {
  const file = template
    .replace(/<!--AGE-->/gm, `${Math.round((Date.now() - ageSinceEpoch) * 1000) / 1000}`)
    .replace(/<!--ACTIVITY-->/gm, await activity())
    .replace(/<!--REPOSITORIES-->/gm, await repositories());

  writeFile(join(__dirname, "../README.md"), file, "utf8");
});
