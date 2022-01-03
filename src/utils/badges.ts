import { Workflow } from "../types";

export default (repo: string) => ({
  repoBadges: {
    lastCommit: () => `[![${repo} last commit](https://img.shields.io/github/last-commit/${repo}?label=📦)](https://github.com/${repo}/commits)`,
    issues: () => `[![${repo} issues](https://img.shields.io/github/issues-raw/${repo}?label=❗️)](https://github.com/${repo}/issues)`,
    pulls: () => `[![${repo} pull requests](https://img.shields.io/github/issues-pulls-raw/${repo}?label=💪)](https://github.com/${repo}/pulls)`,
    stars: () => `[![${repo} stars](https://img.shields.io/github/stars/${repo}?label=⭐)](https://github.com/${repo}/stargazers)`,
  },
  workflowBadges: {
    build: workflow => `[![${repo} build badge](https://img.shields.io/github/workflow/status/${repo}/${encodeURIComponent(workflow.name)})](https://github.com/${repo}/actions/workflows/${encodeURIComponent(workflow.file)})`,
  },
}) as {
  repoBadges: Record<string, () => string>;
  workflowBadges: Record<string, (workflow: Workflow) => string>;
};
