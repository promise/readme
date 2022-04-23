import type { WorkflowBadgeType } from "../utils/badges";
import config from "../config";
import getBadges from "../utils/badges";
import { octokit } from "../utils/github";

export async function repositories(): Promise<string> {
  const repos = (
    await Promise.all(Object.keys(config.repos)
      .map(name => name.split("/"))
      .map(async ([owner, repo]) => octokit.repos.get({ owner, repo }).then(({ data }) => data)))
  ).sort((repo1, repo2) => repo2.stargazers_count - repo1.stargazers_count);

  return repos.map(repo => {
    const badges = getBadges(repo.full_name);
    const badgeList: string[] = [];

    const repoBadges = config.repos[repo.full_name].badges?.repoBadges;
    if (repoBadges) badgeList.push(...repoBadges.map(badge => badges.repoBadges[badge]()));

    const workflowBadges = config.repos[repo.full_name].badges?.workflowBadges;
    if (workflowBadges) badgeList.push(...Object.entries(workflowBadges).map(([name, workflow]) => badges.workflowBadges[name as WorkflowBadgeType](workflow)));

    return `* [\`${repo.full_name}\`](${repo.html_url}): ${repo.description ?? "*No description available*"}\\\n${badgeList.join("\n")}`;
  }).join("\n\n");
}
