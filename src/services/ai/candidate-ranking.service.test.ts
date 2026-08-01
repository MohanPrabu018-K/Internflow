import { describe, it, expect } from "vitest";
import { CandidateRankingService } from "@/services/ai/candidate-ranking.service";

describe("CandidateRankingService", () => {
  it("should return ranked leaderboard", async () => {
    const entries = await CandidateRankingService.getLeaderboard();
    expect(entries.length).toBeGreaterThan(0);
    expect(entries[0].rank).toBe(1);
    expect(entries[0].totalScore).toBeGreaterThan(0);
    expect(entries[0].resumeScore).toBeGreaterThan(0);
    expect(entries[0].trend).toBeDefined();
  });

  it("should be sorted by totalScore descending", async () => {
    const entries = await CandidateRankingService.getLeaderboard();
    for (let i = 1; i < entries.length; i++) {
      expect(entries[i].totalScore).toBeLessThanOrEqual(entries[i - 1].totalScore);
    }
  });
});
