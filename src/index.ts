import { activity, repositories } from "./widgets";
import { ageSinceEpoch, yearInMs } from "./utils/time";
import { octokit, username } from "./utils/github";
import { readFile, writeFile } from "fs/promises";
import { capitalize } from "./utils/human";
import { join } from "path";

// github has really shitty types including one being { [key: string]: unknown; } which sucks massive donkey balls
type User = Awaited<ReturnType<typeof octokit.users.getAuthenticated>>["data"];

void readFile(join(__dirname, "../src/template.md"), "utf8").then(async template => {
  const user = await octokit.users.getByUsername({ username }).then(({ data }) => data) as User;
  const file = template
    .replace(/<!--NAME-->/gmu, user.name ?? capitalize(user.login))
    .replace(/<!--AGE-->/gmu, String(Math.round((Date.now() - ageSinceEpoch) / yearInMs * 10_000) / 10_000))
    .replace(/<!--ACTIVITY-->/gmu, await activity())
    .replace(/<!--REPOSITORIES-->/gmu, await repositories());

  void writeFile(join(__dirname, "../README.md"), file, "utf8");
});
