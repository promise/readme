import { context } from "@actions/github";
import { config } from "dotenv";

config();
if (!process.env["GITHUB_TOKEN"]) throw new Error("GITHUB_TOKEN is not set");

const env = {
  token: process.env["GITHUB_TOKEN"],
  username: context.repo.owner || "promise",
  birth: new Date(process.env["DATE_OF_BIRTH"] ?? "2004-02-03").getTime(),
  ignoreRepositories: [
    "promise/promise",
    "promise/discord-tokens",
  ] as string[],
  icons: [
    "ts",
    "nodejs",
    "js",
    "discord",
    "bots",
    "discordjs",
    "express",
    "py",
    "django",
    "docker",
    "github",
    "githubactions",
    "mongodb",
    "redis",
    "vscode",
    "cloudflare",
    "workers",
    "tailwind",
    "jest",
    "react",
    "git",
    "md",
    "regex",
    "linux",
    "ubuntu",
    "nginx",
    "html",
    "css",
  ],
} as const;

export default env;
