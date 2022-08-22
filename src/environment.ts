import "dotenv/config";
import { context } from "@actions/github";

if (!process.env["GITHUB_TOKEN"]) throw new Error("GITHUB_TOKEN is not set");

const env = {
  token: process.env["GITHUB_TOKEN"],
  username: (process.env["GITHUB_ACTOR"] ?? context.repo.owner) || "promise",
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
    "nodejs",
    "ts",
    "js",
    "discord",
    "bots",
    "mongodb",
    "github",
    "git",
    "express",
    "docker",
    "workers",
    "jest",
    "md",
    "html",
    "tailwind",
    "react",
    "css",
  ],
} as const;

export default env;
