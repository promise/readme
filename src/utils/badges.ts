import type { Workflow } from "../types";
import emojis from "./emojis";

export type RepoBadgeType = "issues" | "lastCommit" | "pulls" | "stars";
export type WorkflowBadgeType = "build" | "lint" | "scan" | "test";

export default (repo: string): {
  repoBadges: Record<RepoBadgeType, () => string>;
  workflowBadges: Record<WorkflowBadgeType, (workflow: Workflow) => string>;
} => ({
  repoBadges: {
    issues: () => `[![${repo} issues](https://img.shields.io/github/issues-raw/${repo}?label=${emojis.issue})](https://github.com/${repo}/issues)`,
    lastCommit: () => `[![${repo} last commit](https://img.shields.io/github/last-commit/${repo}?label=${emojis.push})](https://github.com/${repo}/commits)`,
    pulls: () => `[![${repo} pull requests](https://img.shields.io/github/issues-pr-raw/${repo}?label=${emojis.pr})](https://github.com/${repo}/pulls)`,
    stars: () => `[![${repo} stars](https://img.shields.io/github/stars/${repo}?label=${emojis.star})](https://github.com/${repo}/stargazers)`,
  },
  workflowBadges: {
    build: workflow => `[![${repo} build badge](https://img.shields.io/github/workflow/status/${repo}/${encodeURIComponent(workflow.name)}?label=${emojis.build})](https://github.com/${repo}/actions/workflows/${workflow.file})`,
    lint: workflow => `[![${repo} lint badge](https://img.shields.io/github/workflow/status/${repo}/${encodeURIComponent(workflow.name)}?label=${emojis.lint})](https://github.com/${repo}/actions/workflows/${workflow.file})`,
    scan: workflow => `[![${repo} scan badge](https://img.shields.io/github/workflow/status/${repo}/${encodeURIComponent(workflow.name)}?label=${emojis.scan})](https://github.com/${repo}/actions/workflows/${workflow.file})`,
    test: workflow => `[![${repo} test badge](https://img.shields.io/github/workflow/status/${repo}/${encodeURIComponent(workflow.name)}?label=${emojis.test})](https://github.com/${repo}/actions/workflows/${workflow.file})`,
  },
});
