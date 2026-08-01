import type { ChatbotSession, ChatbotCollectedInfo } from "@/types/ai";

const wait = (ms = 300) => new Promise((r) => setTimeout(r, ms));

const CHAT_FLOW: Array<{ question: string; field: keyof ChatbotCollectedInfo }> = [
  { question: "When can you start? (Immediately / 2 weeks / 1 month)", field: "availability" },
  { question: "Expected monthly stipend?", field: "expectedStipend" },
  { question: "Preferred work location? (Remote / On-site / Hybrid)", field: "preferredLocation" },
  { question: "Notice period if employed? (None / 15 days / 30 days)", field: "noticePeriod" },
  { question: "Rate your communication skills? (Beginner / Intermediate / Advanced)", field: "communicationLevel" },
  { question: "Share portfolio/GitHub links:", field: "portfolioLinks" },
];

export const ChatbotService = {
  async createSession(candidateId: number): Promise<ChatbotSession> {
    await wait(300);
    return {
      id: `chat-${candidateId}-${Date.now()}`,
      candidateId,
      messages: [{ role: "bot", text: CHAT_FLOW[0].question, timestamp: new Date().toISOString() }],
      collectedInfo: {} as ChatbotCollectedInfo,
      status: "active",
      createdAt: new Date().toISOString(),
    };
  },

  async sendMessage(sessionId: string, userMessage: string): Promise<ChatbotSession> {
    await wait(400);
    const step = Math.min(userMessage.length % CHAT_FLOW.length, CHAT_FLOW.length - 1);
    const nextFlow = CHAT_FLOW[Math.min(step + 1, CHAT_FLOW.length - 1)];

    return {
      id: sessionId,
      candidateId: 1,
      messages: [
        { role: "user", text: userMessage, timestamp: new Date().toISOString() },
        { role: "bot", text: step >= CHAT_FLOW.length - 1 ? "Thank you! We've collected all the information. A recruiter will review your profile." : `Great! ${nextFlow.question}`, timestamp: new Date().toISOString() },
      ],
      collectedInfo: {
        availability: "Immediately", expectedStipend: "₹20,000", preferredLocation: "Remote",
        noticePeriod: "None", communicationLevel: "Advanced", portfolioLinks: [],
      },
      status: step >= CHAT_FLOW.length - 1 ? "completed" : "active",
      createdAt: new Date().toISOString(),
    };
  },
};
