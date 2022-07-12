import type { Config } from "./types";

if (!process.env.GITHUB_TOKEN) throw new Error("GITHUB_TOKEN not found");

export default {
  token: process.env.GITHUB_TOKEN,
  repos: {
    "biaw/phone": {
      badges: {
        repoBadges: ["stars", "lastCommit", "issues", "pulls"],
        workflowBadges: {
          build: { name: "Build and publish", file: "build-and-publish.yml" },
          lint: { name: "Linting", file: "linting.yml" },
          scan: { name: "Analysis and Scans", file: "analysis-and-scans.yml" },
        },
      },
    },
    "biaw/test-area": {
      badges: {
        repoBadges: ["stars", "lastCommit", "issues", "pulls"],
        workflowBadges: {
          build: { name: "Build and publish", file: "build-and-publish.yml" },
          lint: { name: "Linting", file: "linting.yml" },
          scan: { name: "Analysis and Scans", file: "analysis-and-scans.yml" },
        },
      },
    },
    "biaw/multidomain": {
      badges: {
        repoBadges: ["stars", "lastCommit", "issues", "pulls"],
        workflowBadges: {
          build: { name: "Build and publish", file: "build-and-publish.yml" },
          lint: { name: "Linting", file: "linting.yml" },
          scan: { name: "Analysis and Scans", file: "analysis-and-scans.yml" },
          test: { name: "Testing", file: "testing.yml" },
        },
      },
    },
    "biaw/imagehost": {
      badges: {
        repoBadges: ["stars", "lastCommit", "issues", "pulls"],
        workflowBadges: {
          build: { name: "Build and publish", file: "build-and-publish.yml" },
          lint: { name: "Linting", file: "linting.yml" },
          scan: { name: "Analysis and Scans", file: "analysis-and-scans.yml" },
          test: { name: "Testing", file: "testing.yml" },
        },
      },
    },
    "countr/countr": {
      badges: {
        repoBadges: ["stars", "lastCommit", "issues", "pulls"],
        workflowBadges: {
          build: { name: "Docker Compose", file: "docker-test.yml" },
          lint: { name: "Linting", file: "linting.yml" },
          scan: { name: "Analysis and Scans", file: "analysis-and-scans.yml" },
          test: { name: "Testing", file: "testing.yml" },
        },
      },
    },
    "project-blurple/blurple-hammer": {
      badges: {
        repoBadges: ["stars", "lastCommit", "issues", "pulls"],
        workflowBadges: {
          build: { name: "Docker Compose", file: "docker-test.yml" },
          lint: { name: "Linting", file: "linting.yml" },
          scan: { name: "Analysis and Scans", file: "analysis-and-scans.yml" },
        },
      },
    },
    "project-blurple/blurple-contests": {
      badges: {
        repoBadges: ["stars", "lastCommit", "issues", "pulls"],
        workflowBadges: {
          build: { name: "Docker Compose", file: "docker-test.yml" },
          lint: { name: "Linting", file: "linting.yml" },
          scan: { name: "Analysis and Scans", file: "analysis-and-scans.yml" },
        },
      },
    },
  },
} as Config;
