import { activity, repositories } from "./widgets";
import { ageSinceEpoch, yearInMs } from "./utils/time";
import { readFile, writeFile } from "fs/promises";
import { capitalize } from "./utils/human";
import { join } from "path";
import { octokit } from "./utils/github";

readFile(join(__dirname, "../src/template.md"), "utf8").then(async template => {
  const user = await octokit.users.getAuthenticated().then(({ data }) => data);
  const file = template
    .replace(/<!--NAME-->/gm, user.name || capitalize(user.login))
    .replace(/<!--AGE-->/gm, `${Math.round((Date.now() - ageSinceEpoch) / yearInMs * 10_000) / 10_000}`)
    .replace(/<!--ACTIVITY-->/gm, await activity())
    .replace(/<!--REPOSITORIES-->/gm, await repositories());

  writeFile(join(__dirname, "../README.md"), file, "utf8");
});
