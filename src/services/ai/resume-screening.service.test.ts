import { describe, it, expect } from "vitest";
import { ResumeScreeningService } from "@/services/ai/resume-screening.service";

describe("ResumeScreeningService", () => {
  it("should return analysis for a frontend role", async () => {
    const result = await ResumeScreeningService.analyzeResume("resume.pdf", "Frontend Developer Intern");
    expect(result.matchScore.overall).toBeGreaterThan(0);
    expect(result.matchScore.overall).toBeLessThanOrEqual(100);
    expect(result.recommendation).toBeDefined();
    expect(result.matchingSkills.length).toBeGreaterThan(0);
    expect(result.missingSkills.length).toBeGreaterThan(0);
    expect(result.strengths.length).toBeGreaterThan(0);
    expect(result.summary).toBeTruthy();
  });

  it("should score differently for different roles", async () => {
    const r1 = await ResumeScreeningService.analyzeResume("a.pdf", "Frontend Developer Intern");
    const r2 = await ResumeScreeningService.analyzeResume("xyz.pdf", "Backend Developer Intern");
    // Different resume names + roles should produce different scores
    expect(r1.matchScore.overall).not.toBe(r2.matchScore.overall);
  });
});
