export interface Config {
  token: string;
  repos: Record<string, {
    badges?: {
      workflowBadges?: Record<string, Workflow>;
      repoBadges?: string[];
    };
  }>;
}

export interface Workflow {
  name: string;
  file: string;
}
