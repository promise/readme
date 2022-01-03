import { context, getOctokit } from "@actions/github";
import config from "../config";

export const octokit = getOctokit(config.token);

export const username = context.repo.owner;
