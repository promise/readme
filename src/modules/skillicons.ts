import dedent from "dedent";

export default function generateSkillIcons(): string {
  const url = "https://skillicons.dev/icons?i=nodejs,ts,js,discord,bots,mongodb,github,git,express,docker,workers,jest,md,html,tailwind,react,css&perline=19";
  return dedent`
    <p align="center">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="${url}&theme=dark">
        <source media="(prefers-color-scheme: light)" srcset="${url}&theme=light">
        <img alt="Skill icons">
      </picture>
    </p>
  `;
}
