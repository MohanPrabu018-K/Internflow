import type { CopilotQuery, CopilotResult, CopilotCandidate } from "@/types/ai";
import { CandidateService } from "@/services/api/candidate.service";

const wait = (ms = 400) => new Promise((r) => setTimeout(r, ms));

// ─── AI Recruiter Copilot Service (Mock NLP) ─────────────────────────────────

export const RecruiterCopilotService = {
  async processQuery(naturalLanguage: string): Promise<CopilotResult> {
    await wait(600);
    const lower = naturalLanguage.toLowerCase();
    const allCandidates = (await CandidateService.getCandidates()).data;

    // Extract intent
    let limit = 5;
    let skillFilter = "";
    let minCgpa = 0;
    let stageFilter = "";

    if (lower.includes("cgpa") && /\b([89])\b/.test(lower)) {
      minCgpa = Number(lower.match(/\b([89])\b/)![1]);
    }
    if (/\b(\d+)\b.*(candidate|best|top)/.test(lower)) {
      limit = Number(lower.match(/\b(\d+)\b/)![1]) || 5;
    }
    const skills = ["react", "python", "node", "java", "sql", "typescript", "angular", "vue"];
    for (const s of skills) {
      if (lower.includes(s)) { skillFilter = s; break; }
    }
    const stages = ["new", "screening", "assessment", "interview", "selected", "offer sent", "joined"];
    for (const st of stages) {
      if (lower.includes(st)) { stageFilter = st; break; }
    }

    let filtered = [...allCandidates];
    if (skillFilter) filtered = filtered.filter((c) => c.skills.some((s) => s.toLowerCase().includes(skillFilter)));
    if (minCgpa > 0) filtered = filtered.filter((c) => c.cgpa >= minCgpa);
    if (stageFilter) filtered = filtered.filter((c) => c.stage.toLowerCase() === stageFilter);
    if (lower.includes("rejected") || lower.includes("previous")) filtered = filtered.filter((c) => c.archived);
    if (lower.includes("recommend") || lower.includes("best") || lower.includes("top")) {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    const results: CopilotCandidate[] = filtered.slice(0, limit).map((c) => ({
      id: c.id,
      name: c.name,
      role: c.role,
      matchReason: skillFilter
        ? `Has ${skillFilter.charAt(0).toUpperCase() + skillFilter.slice(1)} skills with ${c.cgpa} CGPA`
        : minCgpa > 0
          ? `Meets CGPA >= ${minCgpa} with ${c.cgpa} CGPA`
          : `Strong match — rating ${c.rating}/5`,
      score: Math.round(c.rating * 20 + (c.cgpa - 7) * 5),
    }));

    return {
      candidates: results,
      explanation: `Found ${results.length} candidates${skillFilter ? ` with ${skillFilter} skills` : ""}${minCgpa > 0 ? ` and CGPA >= ${minCgpa}` : ""}${stageFilter ? ` in ${stageFilter} stage` : ""}.`,
      totalMatches: filtered.length,
      queryTime: new Date().toISOString(),
    };
  },
};
