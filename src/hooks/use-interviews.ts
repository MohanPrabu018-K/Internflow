"use client";

import { useApiState } from "./use-api-state";
import type { InterviewSchedule } from "@/services/api/interviews.service";

export function useInterviews() {
  return useApiState<InterviewSchedule[]>([]);
}
