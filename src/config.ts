import { Config } from "./types";

if (!process.env.GITHUB_TOKEN) throw new Error("GITHUB_TOKEN not found");

export default {
  token: process.env.GITHUB_TOKEN,
  repos: {
    "biaw/phone": {
      badges: {
        repoBadges: ["lastCommit", "issues", "pulls", "stars"],
        workflowBadges: {
          build: {
            name: "Build and publish",
            file: "build-and-publish.yml",
          },
        },
      },
    },
  },
} as Config;
