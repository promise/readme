import { capitalize } from "../utils/text";
import env from "../environment";
import octokit from "../utils/github";

const events = octokit.rest.activity.listPublicEventsForUser({ username: env.username, per_page: 100 }).then(({ data }) => {
  const eventsAfterTwoWeeksAgo = data.filter(({ created_at }) => new Date(String(created_at)) > new Date(Date.now() - 1000 * 60 * 60 * 24 * 14));
  return eventsAfterTwoWeeksAgo.map(({ type, repo, payload, created_at }) => ({ type, repo, payload, date: new Date(String(created_at)) })).sort((a, b) => b.date.getTime() - a.date.getTime());
});

const emojis = {
  push: "✨",
  issue: "❓",
  pr: "💪",
  prRejected: "❌",
  prMerged: "✅",
  star: "⭐",
  build: "📦",
  lint: "👌",
  scan: "🔎",
  test: "🔬",
  comment: "🗣",
  fork: "🍴",
  review: "📝",
  create: "🎨",
  delete: "🗑",
};

export type Event = Awaited<ReturnType<typeof octokit.rest.activity.listEventsForAuthenticatedUser>>["data"][number];
const eventList: Record<string, (event: any) => string | null> = { // eslint-disable-line @typescript-eslint/no-explicit-any
  IssueCommentEvent: (event: Event) => `${emojis.comment} Commented on #${event.payload.issue?.number ?? 0} in ${event.repo.name}`,
  IssuesEvent: (event: Event) => `${emojis.issue} ${capitalize(event.payload.action!)} issue #${event.payload.issue?.number ?? 0} in ${event.repo.name}`,
  PullRequestEvent: (event: Event & { payload: { pull_request: { number: number; merged_at?: string }}}) => `${event.payload.pull_request.merged_at ? `${emojis.prMerged} Merged` : `${event.payload.action === "opened" ? emojis.pr : emojis.prRejected} ${capitalize(event.payload.action!)}`} PR #${event.payload.pull_request.number} in ${event.repo.name}`,
  PullRequestReviewEvent: (event: Event & { payload: { pull_request: { number: number }; review: { state: string }}}) => `${emojis.review} ${capitalize(event.payload.action!)} review (${event.payload.review.state}) on PR #${event.payload.pull_request.number} in ${event.repo.name}`,
  ForkEvent: (event: Event & { payload: { forkee: { full_name: string }}}) => `${emojis.fork} Forked ${event.payload.forkee.full_name} from ${event.repo.name}`,
  PushEvent: (event: Event & { payload: { size: number }}) => `${emojis.push} Pushed ${event.payload.size} commit${event.payload.size > 1 ? "s" : ""} to ${event.repo.name}`,
  CreateEvent: (event: Event & { payload: { ref_type: string }}) => event.payload.ref_type === "repository" ? `${emojis.create} Created ${event.repo.name}` : null,
  DeleteEvent: (event: Event & { payload: { ref_type: string }}) => event.payload.ref_type === "repository" ? `${emojis.delete} Deleted ${event.repo.name}` : null,
};

export async function getActivity(): Promise<string> {
  return (await events)
    .filter(event => event.type && event.type in eventList)
    .slice(0, 25)
    .map(event => eventList[event.type!]!(event))
    .filter(Boolean)
    .join("\n");
}
