"use client";

import { useApiState } from "./use-api-state";
import type { AssessmentTemplate } from "@/services/api/assessments.service";

export function useAssessments() {
  return useApiState<AssessmentTemplate[]>([]);
}
