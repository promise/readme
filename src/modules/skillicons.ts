import dedent from "dedent";
import env from "../environment";

export default function generateSkillIcons(): string {
  const url = `https://skillicons.dev/icons?i=${env.icons.join(encodeURIComponent(","))}&perline=19`;
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
