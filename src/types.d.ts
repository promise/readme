export type Config = {
  token: string;
  repos: Record<string, {
    badges?: {
      workflowBadges?: Record<string, Workflow>;
      repoBadges?: Array<string>;
    }
  }>;
}

export type Workflow = {
  name: string;
  file: string;
};
