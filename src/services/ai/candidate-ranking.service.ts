import type { CandidateLeaderboardEntry } from "@/types/ai";
import { CandidateService } from "@/services/api/candidate.service";

const wait = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export const CandidateRankingService = {
  async getLeaderboard(): Promise<CandidateLeaderboardEntry[]> {
    await wait(500);
    const candidates = (await CandidateService.getCandidates()).data;

    const entries: CandidateLeaderboardEntry[] = candidates
      .map((c) => ({
        resumeScore: Math.round(c.cgpa * 8 + c.rating * 5 + (c.skills.length * 2) + 10),
        assessmentScore: Math.round(c.rating * 15 + 10),
        interviewScore: Math.round(c.rating * 12 + 15),
        codingScore: Math.round((c.cgpa - 6) * 10 + c.rating * 5 + 20),
      }))
      .map((scores, i) => {
        const total = Math.round((scores.resumeScore * 0.35 + scores.assessmentScore * 0.3 + scores.interviewScore * 0.25 + scores.codingScore * 0.1));
        return {
          rank: 0,
          candidateId: candidates[i].id,
          name: candidates[i].name,
          role: candidates[i].role,
          ...scores,
          totalScore: Math.min(100, total),
          trend: (["up", "down", "stable"] as const)[i % 3],
        };
      })
      .sort((a, b) => b.totalScore - a.totalScore)
      .map((entry, i) => ({ ...entry, rank: i + 1 }));

    return entries;
  },
};
