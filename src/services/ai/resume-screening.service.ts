import type { ResumeAnalysis, ResumeMatchScore, AIRecommendation, MissingSkill, ParsedResume } from "@/types/ai";

const wait = (ms = 300) => new Promise((r) => setTimeout(r, ms));

// ─── Resume Screening Service (Mock AI) ──────────────────────────────────────

export const ResumeScreeningService = {
  async analyzeResume(resumeFileName: string, role: string): Promise<ResumeAnalysis> {
    await wait(500);
    const hash = resumeFileName.length + role.length;
    const skillsMatch = 60 + (hash % 35);
    const educationMatch = 55 + (hash % 40);
    const experienceMatch = 50 + (hash % 45);
    const overallFit = 50 + (hash % 40);

    let recommendation: AIRecommendation;
    const overall = Math.round((skillsMatch * 0.4 + educationMatch * 0.2 + experienceMatch * 0.25 + overallFit * 0.15));
    if (overall >= 85) recommendation = "Highly Recommended";
    else if (overall >= 70) recommendation = "Recommended";
    else if (overall >= 50) recommendation = "Average";
    else recommendation = "Not Recommended";

    return {
      matchScore: {
        overall,
        skillsMatch: Math.round(skillsMatch),
        educationMatch: Math.round(educationMatch),
        experienceMatch: Math.round(experienceMatch),
        overallFit: Math.round(overallFit),
      },
      recommendation,
      matchingSkills: role.toLowerCase().includes("frontend")
        ? ["React", "TypeScript", "HTML/CSS", "JavaScript"]
        : role.toLowerCase().includes("backend")
          ? ["Node.js", "PostgreSQL", "REST APIs", "Git"]
          : ["Python", "Data Analysis", "SQL", "Statistics"],
      missingSkills: role.toLowerCase().includes("frontend")
        ? [{ name: "Next.js", importance: "critical" as const }, { name: "GraphQL", importance: "nice-to-have" as const }]
        : [{ name: "Docker", importance: "critical" as const }, { name: "Kubernetes", importance: "nice-to-have" as const }],
      strengths: ["Strong academic background", "Relevant project experience", "Good technical skills"],
      weaknesses: ["Limited industry experience", "Missing some advanced tools"],
      summary: `Candidate shows ${overall >= 70 ? "strong" : "moderate"} alignment with the ${role} role. ${recommendation}.`,
    };
  },

  async batchAnalyze(candidateIds: number[], role: string): Promise<Map<number, ResumeAnalysis>> {
    await wait(800);
    const results = new Map<number, ResumeAnalysis>();
    for (const id of candidateIds) {
      results.set(id, await this.analyzeResume(`resume-${id}.pdf`, role));
    }
    return results;
  },
};
