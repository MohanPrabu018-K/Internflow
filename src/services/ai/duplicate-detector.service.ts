import type { DuplicateReport, TalentPoolEntry, TalentPoolSearch } from "@/types/ai";
import { CandidateService } from "@/services/api/candidate.service";

const wait = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export const DuplicateDetectorService = {
  async checkDuplicate(candidateId: number): Promise<DuplicateReport | null> {
    await wait(500);
    const candidates = (await CandidateService.getCandidates()).data;
    const target = candidates.find((c) => c.id === candidateId);
    if (!target) return null;

    for (const other of candidates) {
      if (other.id === candidateId) continue;
      if (other.email === target.email || other.phone === target.phone) {
        return {
          candidateA: candidateId,
          candidateB: other.id,
          matchFields: ["email", "phone"],
          similarityScore: 95,
          isDuplicate: true,
          details: `Candidate #${other.id} (${other.name}) has matching ${other.email === target.email ? "email" : "phone number"}.`,
        };
      }
    }

    return null; // No duplicate found
  },

  async getTalentPool(filters?: TalentPoolSearch): Promise<TalentPoolEntry[]> {
    await wait(400);
    const candidates = (await CandidateService.getCandidates()).data;
    const archived = candidates.filter((c) => c.archived ?? false);

    const entries: TalentPoolEntry[] = archived.map((c) => ({
      candidateId: c.id,
      name: c.name,
      email: c.email,
      skills: c.skills,
      experience: c.experience,
      lastStage: c.stage,
      lastRating: c.rating,
      archivedAt: c.appliedDate,
      tags: c.skills.slice(0, 3).map((s) => s.toLowerCase()),
      aiRelevanceScore: Math.round(c.rating * 20),
    }));

    if (filters?.query) {
      const q = filters.query.toLowerCase();
      return entries.filter((e) => e.name.toLowerCase().includes(q) || e.skills.some((s) => s.toLowerCase().includes(q)));
    }

    return entries;
  },
};
