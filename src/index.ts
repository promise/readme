import { mkdir, readFile, writeFile } from "fs/promises";
import { join } from "path";
import env from "./environment";
import { getAllActivity } from "./modules/githubActivity";
import getActivityPie from "./modules/mermaid/projectPie";
import generateSkillIcons from "./modules/skillicons";
import octokit from "./utils/github";
import { yearInMs } from "./utils/time";

void readFile(join(__dirname, "../src/template.md"), "utf8").then(async template => {
  const user = await octokit.rest.users.getByUsername({ username: env.username }).then(({ data }) => data);

  const output = template
    .replace(/<!--NAME-->/gmu, user.name ?? user.login)
    .replace(/<!--AGE-->/gmu, String(Math.round((Date.now() - env.birth) / yearInMs * 10_000) / 10_000))
    .replace(/<!--SKILLICONS-->/gmu, generateSkillIcons())
    .replace(/<!--MERMAID_PIE-->/gmu, await getActivityPie())
    .replace(/<!--ALL_ACTIVITY-->/gmu, await getAllActivity())
    .replace(/<!--TIMESTAMP-->/gmu, String(Math.floor(Date.now() / 1000)));

  await mkdir("./output").catch(() => null);
  void writeFile("./output/README.md", output, "utf8");
});
