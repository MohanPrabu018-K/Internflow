import type { Referral } from "@/types/ai";

const wait = (ms = 200) => new Promise((r) => setTimeout(r, ms));

export const ReferralService = {
  async submitReferral(data: { referrerId: string; referrerName: string; candidateName: string; candidateEmail: string; role: string }): Promise<Referral> {
    await wait(400);
    return {
      id: `ref-${Date.now()}`,
      referrerId: data.referrerId,
      referrerName: data.referrerName,
      candidateName: data.candidateName,
      candidateEmail: data.candidateEmail,
      role: data.role,
      status: "submitted",
      bonus: 5000,
      createdAt: new Date().toISOString(),
    };
  },

  async getReferrals(): Promise<Referral[]> {
    await wait(300);
    return [
      { id: "r1", referrerId: "u1", referrerName: "Priya Kapoor", candidateName: "Aarav Mehta", candidateEmail: "aarav@iitb.ac.in", role: "Frontend Developer Intern", status: "interviewed", bonus: 5000, createdAt: "2024-12-15" },
      { id: "r2", referrerId: "u2", referrerName: "Rahul Verma", candidateName: "Ananya Patel", candidateEmail: "ananya@iitd.ac.in", role: "UI/UX Designer Intern", status: "reviewed", bonus: 5000, createdAt: "2024-12-18" },
    ];
  },

  async generateReferralLink(referrerId: string): Promise<{ url: string }> {
    await wait(200);
    const code = Buffer.from(referrerId).toString("base64").slice(0, 8);
    return { url: `https://internflow.io/refer/${code}` };
  },
};
