/* eslint-disable camelcase */
import env from "../environment";
import octokit from "../utils/github";
import { capitalize } from "../utils/text";

export const events = (async (numberOfEvents: number) => {
  const allEvents = [];
  let page = 0;
  let lastPage = 0;
  while (allEvents.length < numberOfEvents && lastPage >= page) {
    const response = await octokit.rest.activity.listPublicEventsForUser({ username: env.username, per_page: 100, page });
    if (response.headers.link) {
      const parts = response.headers.link.split(",").map(part => part.trim());
      const lastPart = parts.find(part => part.endsWith("rel=\"last\""));
      lastPage = Number(lastPart?.split("&page=")[1]?.split(">;")[0] ?? 0);
    }
    allEvents.push(...response.data.filter(event => !env.ignoreRepositories.includes(event.repo.name)));
    page += 1;
  }

  return allEvents.slice(0, numberOfEvents);
})(1000);

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
const eventList: Record<string, (event: any) => null | string> = { // eslint-disable-line @typescript-eslint/no-explicit-any
  IssueCommentEvent: (event: Event) => `${emojis.comment} Commented on #${event.payload.issue?.number ?? 0} in ${event.repo.name}`,
  IssuesEvent: (event: Event) => `${emojis.issue} ${capitalize(event.payload.action!)} issue #${event.payload.issue?.number ?? 0} in ${event.repo.name}`,
  PullRequestEvent: (event: { payload: { pull_request: { merged_at?: string; number: number } } } & Event) => `${event.payload.pull_request.merged_at ? `${emojis.prMerged} Merged` : `${event.payload.action === "opened" ? emojis.pr : emojis.prRejected} ${capitalize(event.payload.action!)}`} PR #${event.payload.pull_request.number} in ${event.repo.name}`,
  PullRequestReviewEvent: (event: { payload: { pull_request: { number: number }; review: { state: string } } } & Event) => `${emojis.review} ${capitalize(event.payload.action!)} review (${event.payload.review.state}) on PR #${event.payload.pull_request.number} in ${event.repo.name}`,
  ForkEvent: (event: { payload: { forkee: { full_name: string } } } & Event) => `${emojis.fork} Forked ${event.payload.forkee.full_name} from ${event.repo.name}`,
  PushEvent: (event: { payload: { size: number } } & Event) => `${emojis.push} Pushed ${event.payload.size} commit${event.payload.size > 1 ? "s" : ""} to ${event.repo.name}`,
  CreateEvent: (event: { payload: { ref_type: string } } & Event) => event.payload.ref_type === "repository" ? `${emojis.create} Created ${event.repo.name}` : null,
  DeleteEvent: (event: { payload: { ref_type: string } } & Event) => event.payload.ref_type === "repository" ? `${emojis.delete} Deleted ${event.repo.name}` : null,
};

export async function getAllActivity(): Promise<string> {
  return (await events)
    .filter(event => event.type && event.type in eventList)
    .slice(0, 200)
    .map(event => eventList[event.type!]!(event))
    .filter(Boolean)
    .join("\n");
}
