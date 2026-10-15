import { tutorials } from "../data/mockData";
import type { IssueId, Tutorial } from "../types";

export function getTutorials(): Tutorial[] {
  return tutorials;
}

export function getTutorialById(id: string): Tutorial | undefined {
  return tutorials.find((item) => item.id === id);
}

export function getTutorialForIssue(issueId: IssueId): Tutorial | null {
  return tutorials.find((item) => item.issueIds.includes(issueId)) ?? null;
}
