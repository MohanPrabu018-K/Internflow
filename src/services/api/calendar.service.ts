const wait = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export interface CalendarSlot {
  date: string;
  time: string;
  available: boolean;
  interviewer?: string;
}

export const CalendarService = {
  async getAvailability(interviewer?: string): Promise<CalendarSlot[]> {
    await wait(400);
    const slots: CalendarSlot[] = [];
    const today = new Date();
    for (let d = 1; d <= 10; d++) {
      const date = new Date(today);
      date.setDate(today.getDate() + d);
      if (date.getDay() === 0 || date.getDay() === 6) continue;
      for (let h = 9; h <= 17; h++) {
        const available = Math.random() > 0.3;
        slots.push({
          date: date.toISOString().split("T")[0],
          time: `${h.toString().padStart(2, "0")}:00`,
          available,
          interviewer: available ? (interviewer ?? "Priya Kapoor") : undefined,
        });
      }
    }
    return slots;
  },

  async scheduleInterview(candidateId: number, date: string, time: string, platform: string): Promise<{ success: boolean; meetingLink: string }> {
    await wait(500);
    const link = platform === "Google Meet" ? `https://meet.google.com/${Date.now().toString(36)}` : platform === "Zoom" ? `https://zoom.us/j/${Date.now()}` : `https://teams.microsoft.com/l/meetup/${Date.now()}`;
    return { success: true, meetingLink: link };
  },

  async checkConflicts(date: string, time: string): Promise<boolean> {
    await wait(200);
    return Math.random() > 0.8;
  },
};
