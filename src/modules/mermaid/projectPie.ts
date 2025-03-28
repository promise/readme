import dedent from "dedent";
import { events } from "../githubActivity";

export default async function getActivityPie(): Promise<string> {
  const eventsLast7Days = (await events).filter(event => new Date(String(event.created_at)) > new Date(Date.now() - 1000 * 60 * 60 * 24 * 7) && event.type === "PushEvent");
  const repositories: Record<string, number> = {};
  eventsLast7Days.forEach(event => {
    repositories[event.repo.name] = (repositories[event.repo.name] ?? 0) + (event.payload as { size: number }).size;
  });

  return dedent`
    \`\`\`mermaid
      pie showData
        title GitHub Commits the last 7 days
        ${Object.entries(repositories)
          .sort((a, b) => b[1] - a[1])
          .map(([repository, commits]) => `"${repository}" : ${commits}`)
          .join("\n        ")}
    \`\`\`
  `;
}
