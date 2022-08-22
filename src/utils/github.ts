import env from "../environment";
import { getOctokit } from "@actions/github";

const octokit = getOctokit(env.token);
export default octokit;
