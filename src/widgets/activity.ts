import { octokit, username } from "../utils/github";
import { capitalize } from "../utils/human";
import emojis from "../utils/emojis";

// make event a global type
export type Event = Awaited<ReturnType<typeof octokit.activity.listEventsForAuthenticatedUser>>["data"][number];

// they really fucked up the types on this one, had to make my own just to satisfy TypeScript
const eventList: Record<string, (event: Event & any) => string | null> = { // eslint-disable-line @typescript-eslint/no-explicit-any
  IssueCommentEvent: (event: Event) => `${emojis.comment} Commented on #${event.payload.issue?.number} in ${event.repo.name}`,
  IssuesEvent: (event: Event) => `${emojis.issue} ${capitalize(event.payload.action as string)} issue #${event.payload.issue?.number} in ${event.repo.name}`,
  PullRequestEvent: (event: Event & { payload: { pull_request: { number: number; merged_at?: string } }}) => `${event.payload.pull_request?.merged_at ? `${emojis.prMerged} Merged` : `${event.payload.action === "opened" ? emojis.pr : emojis.prRejected} ${capitalize(event.payload.action as string)}`} PR #${event.payload.pull_request?.number} in ${event.repo.name}`,
  PullRequestReviewEvent: (event: Event & { payload: { pull_request: { number: number; }; review: { state: string; } }}) => `${emojis.review} ${capitalize(event.payload.action as string)} review (${event.payload.review.state}) on PR #${event.payload.pull_request?.number} in ${event.repo.name}`,
  ForkEvent: (event: Event & { payload: { forkee: { full_name: string; }}}) => `${emojis.fork} Forked ${event.payload.forkee.full_name} from ${event.repo.name}`,
  PushEvent: (event: Event & { payload: { size: number; }}) => `${emojis.push} Pushed ${event.payload.size} commit${event.payload.size > 1 ? "s" : ""} to ${event.repo.name}`,
  CreateEvent: (event: Event & { payload: { ref_type: string; }}) => event.payload.ref_type === "repository" ? `${emojis.create} Created ${event.repo.name}` : null,
  DeleteEvent: (event: Event & { payload: { ref_type: string; }}) => event.payload.ref_type === "repository" ? `${emojis.delete} Deleted ${event.repo.name}` : null,
};

export async function activity(rows = 25) {
  const events = await octokit.activity.listPublicEventsForUser({ username, per_page: 100 }).then(({ data }) => data); // eslint-disable-line camelcase
  return events
    .filter(event => event.type && event.type in eventList)
    .slice(0, rows)
    .map(event => eventList[event.type as string](event))
    .filter(Boolean)
    .join("\n");
}
