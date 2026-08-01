import type { OnboardingTask, EmployeeCertificate } from "@/types/ai";

const wait = (ms = 200) => new Promise((r) => setTimeout(r, ms));

export const OnboardingService = {
  async getTasks(candidateId: number): Promise<OnboardingTask[]> {
    await wait(300);
    return [
      { id: "ot1", label: "Upload ID Proof", status: "pending", required: true, category: "document" },
      { id: "ot2", label: "Upload Education Certificates", status: "pending", required: true, category: "document" },
      { id: "ot3", label: "Upload PAN Card", status: "pending", required: true, category: "document" },
      { id: "ot4", label: "Sign Non-Disclosure Agreement", status: "pending", required: true, category: "policy" },
      { id: "ot5", label: "Complete Personal Details Form", status: "pending", required: true, category: "form" },
      { id: "ot6", label: "Read Company Policy Handbook", status: "pending", required: true, category: "policy" },
      { id: "ot7", label: "Request Laptop/Asset", status: "pending", required: false, category: "asset" },
      { id: "ot8", label: "Complete First-Day Training", status: "pending", required: false, category: "training" },
    ];
  },

  async updateTask(candidateId: number, taskId: string, status: "pending" | "in-progress" | "completed"): Promise<OnboardingTask[]> {
    await wait(200);
    const tasks = await this.getTasks(candidateId);
    return tasks.map((t) => (t.id === taskId ? { ...t, status } : t));
  },

  async generateCertificate(candidateId: number, candidateName: string, role: string, duration: string): Promise<EmployeeCertificate> {
    await wait(500);
    const certId = `CERT-${Date.now().toString(36).toUpperCase()}`;
    return {
      id: `cert-${candidateId}`,
      candidateName,
      role,
      duration,
      issueDate: new Date().toISOString(),
      certificateId: certId,
      qrCodeData: `https://internflow.io/verify/${certId}`,
    };
  },
};
