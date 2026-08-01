import { apiClient } from "@/lib/api-client";
import type { ListQueryParams } from "@/types/query";

export interface InterviewSchedule {
  id: string;
  candidateId: string;
  date: string;
  platform: string;
  interviewer?: string;
  status?: string;
}

export const interviewsService = {
  schedule: (payload: InterviewSchedule) => apiClient<void, InterviewSchedule>("/interviews", { method: "POST", body: payload }),
  list: (query?: ListQueryParams) => apiClient<InterviewSchedule[]>("/interviews", { query }),
};
