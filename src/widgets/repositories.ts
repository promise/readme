import config from "../config";
import getBadges from "../utils/badges";
import { octokit } from "../utils/github";

export async function repositories() {
  const repos = (
    await Promise.all(Object.keys(config.repos)
      .map(name => name.split("/"))
      .map(([owner, repo]) => octokit.repos.get({ owner, repo }).then(({ data }) => data)))
  ).sort((a, b) => b.stargazers_count - a.stargazers_count);

  return repos.map(repo => {
    const badges = getBadges(repo.full_name);
    const badgeList: Array<string> = [];

    const repoBadges = config.repos[repo.full_name].badges?.repoBadges;
    if (repoBadges) badgeList.push(...repoBadges.map(badge => badges.repoBadges[badge]()));

    const workflowBadges = config.repos[repo.full_name].badges?.workflowBadges;
    if (workflowBadges) badgeList.push(...Object.entries(workflowBadges).map(([name, workflow]) => badges.workflowBadges[name](workflow)));

    return `* [\`${repo.full_name}\`](${repo.html_url}): ${repo.description || "*No description available*"}\\\n${badgeList.join("\n")}`;
  }).join("\n\n");
}
