import { getOctokit } from "@actions/github";
import env from "../environment";

const octokit = getOctokit(env.token);
export default octokit;
