import { readFile, writeFile } from "fs/promises";
import env from "./environment";
import generateSkillIcons from "./modules/skillicons";
import { getAllActivity } from "./modules/githubActivity";
import { join } from "path";
import octokit from "./utils/github";
import { yearInMs } from "./utils/time";

void readFile(join(__dirname, "../src/template.md"), "utf8").then(async template => {
  const user = await octokit.rest.users.getByUsername({ username: env.username }).then(({ data }) => data);

  const output = template
    .replace(/<!--NAME-->/gmu, user.name ?? user.login)
    .replace(/<!--AGE-->/gmu, String(Math.round((Date.now() - env.birth) / yearInMs * 10_000) / 10_000))
    .replace(/<!--SKILLICONS-->/gmu, generateSkillIcons())
    .replace(/<!--ALL_ACTIVITY-->/gmu, await getAllActivity())
    .replace(/<!--DATE-->/gmu, new Date().toLocaleString());

  void writeFile("./README.md", output, "utf8");
});
