import type { AuditLogEntry } from "@/types/ai";

const wait = (ms = 200) => new Promise((r) => setTimeout(r, ms));

export const AuditLogService = {
  async getLogs(): Promise<AuditLogEntry[]> {
    await wait(300);
    return [
      { id: "a1", userId: "u-admin", action: "LOGIN", resource: "session", resourceId: "s1", details: "Priya Kapoor logged in", timestamp: new Date().toISOString() },
      { id: "a2", userId: "u-admin", action: "UPDATE_STAGE", resource: "candidate", resourceId: "1", details: "Moved Aarav Mehta to Interview stage", timestamp: new Date(Date.now() - 3600000).toISOString() },
      { id: "a3", userId: "u-recruiter", action: "SEND_ASSESSMENT", resource: "assessment", resourceId: "asm-1", details: "Python Developer assessment sent to 12 candidates", timestamp: new Date(Date.now() - 7200000).toISOString() },
      { id: "a4", userId: "u-admin", action: "GENERATE_OFFER", resource: "offer", resourceId: "off-5", details: "Offer letter generated for Karan Singh", timestamp: new Date(Date.now() - 14400000).toISOString() },
    ];
  },
};
