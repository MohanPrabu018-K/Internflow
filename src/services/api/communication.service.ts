import type { Communication, CommunicationChannel, Notification } from "@/types/ai";

const wait = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export const CommunicationService = {
  async send(options: { channel: CommunicationChannel; recipient: string; template: string; subject?: string; body: string }): Promise<Communication> {
    await wait(400);
    return {
      id: `comm-${Date.now()}`,
      channel: options.channel,
      recipient: options.recipient,
      template: options.template,
      subject: options.subject,
      body: options.body,
      status: "sent",
      sentAt: new Date().toISOString(),
    };
  },

  async bulkSend(recipients: string[], channel: CommunicationChannel, template: string, body: string): Promise<Communication[]> {
    await wait(800);
    return recipients.map((r) => ({
      id: `comm-${Date.now()}-${r.slice(0, 4)}`,
      channel, recipient: r, template, body,
      status: "sent" as const,
      sentAt: new Date().toISOString(),
    }));
  },

  async getHistory(): Promise<Communication[]> {
    await wait(200);
    return [
      { id: "h1", channel: "email", recipient: "aarav@iitb.ac.in", template: "Application Received", body: "Thank you for applying...", status: "sent", sentAt: new Date().toISOString() },
      { id: "h2", channel: "whatsapp", recipient: "+919876543210", template: "Interview Reminder", body: "Your interview is scheduled...", status: "sent", sentAt: new Date().toISOString() },
    ];
  },

  async getNotifications(): Promise<Notification[]> {
    await wait(200);
    return [
      { id: "n1", type: "info", title: "New Application", message: "Sneha Reddy applied for Data Analyst Intern", read: false, createdAt: new Date().toISOString() },
      { id: "n2", type: "success", title: "Offer Accepted", message: "Rohan Gupta accepted the AI/ML Intern offer", read: false, createdAt: new Date().toISOString() },
      { id: "n3", type: "warning", title: "Assessment Overdue", message: "Priya Sharma assessment deadline is today", read: true, createdAt: new Date().toISOString() },
    ];
  },
};
