import { describe, it, expect } from "vitest";
import { RecruiterCopilotService } from "@/services/ai/recruiter-copilot.service";

describe("RecruiterCopilotService", () => {
  it("should find React candidates with CGPA filter", async () => {
    const result = await RecruiterCopilotService.processQuery("Show React candidates with CGPA above 8");
    expect(result.candidates.length).toBeGreaterThan(0);
    expect(result.explanation.toLowerCase()).toContain("react");
    expect(result.totalMatches).toBeGreaterThan(0);
  });

  it("should recommend top candidates", async () => {
    const result = await RecruiterCopilotService.processQuery("Recommend top 5 for interview today");
    expect(result.candidates.length).toBe(5);
    expect(result.candidates[0].score).toBeGreaterThan(0);
  });

  it("should find Python developers", async () => {
    const result = await RecruiterCopilotService.processQuery("Find Python developers in pipeline");
    expect(result.explanation).toBeTruthy();
  });
});
