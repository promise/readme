import type { RepoBadgeType, WorkflowBadgeType } from "./utils/badges";

export interface Config {
  token: string;
  repos: Record<string, {
    badges?: {
      workflowBadges?: Partial<Record<WorkflowBadgeType, Workflow>>;
      repoBadges?: RepoBadgeType[];
    };
  }>;
}

export interface Workflow {
  name: string;
  file: string;
}
