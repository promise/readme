import { copy, ensureDir } from "fs-extra";
import { readFile, writeFile } from "fs/promises";
import env from "./environment";
import generateSkillIcons from "./modules/skillicons";
import { getActivity } from "./modules/githubActivity";
import { join } from "path";
import octokit from "./utils/github";
import { yearInMs } from "./utils/time";

void readFile(join(__dirname, "../src/template.md"), "utf8").then(async template => {
  const user = await octokit.rest.users.getByUsername({ username: env.username }).then(({ data }) => data);

  const output = template
    .replace(/<!--NAME-->/gmu, user.name ?? user.login)
    .replace(/<!--AGE-->/gmu, String(Math.round((Date.now() - env.birth) / yearInMs * 10_000) / 10_000))
    .replace(/<!--SKILLICONS-->/gmu, generateSkillIcons())
    .replace(/<!--ACTIVITY-->/gmu, await getActivity())
    .replace(/<!--DATE-->/gmu, new Date().toLocaleString());

  await ensureDir(join(__dirname, "../output")).catch(() => null);
  void writeFile(join(__dirname, "../output/README.md"), output, "utf8");
  void copy(join(__dirname, "../.github"), join(__dirname, "../output/.github"));
});
