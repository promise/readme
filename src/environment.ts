import { context } from "@actions/github";
import { config } from "dotenv";

config();
if (!process.env["GITHUB_TOKEN"]) throw new Error("GITHUB_TOKEN is not set");

const env = {
  token: process.env["GITHUB_TOKEN"],
  username: context.repo.owner || "promise",
  birth: new Date(process.env["DATE_OF_BIRTH"] ?? "2004-02-03").getTime(),
  myRepositories: [
    "biaw/*",
    "countr/*",
    "project-blurple/blurple-hammer",
    "project-blurple/blurple-contests",
    "project-blurple/bot-icon-sync",
    "promise/*",
  ],
  icons: [
    "ts",
    "nodejs",
    "js",
    "discord",
    "bots",
    "express",
    "docker",
    "github",
    "githubactions",
    "mongodb",
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
    "nginx",
    "html",
    "css",
  ],
} as const;

export default env;
