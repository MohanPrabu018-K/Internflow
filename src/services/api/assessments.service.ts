import { apiClient } from "@/lib/api-client";
import type { ListQueryParams } from "@/types/query";

export interface AssessmentTemplate {
  id: string;
  name: string;
  description?: string;
}

export interface AssessmentRecord {
  id: string;
  candidateId: string;
  templateName: string;
  score?: number;
  status: string;
}

export const assessmentsService = {
  listTemplates: () => apiClient<AssessmentTemplate[]>("/assessments/templates"),
  list: (query?: ListQueryParams) => apiClient<AssessmentRecord[]>("/assessments", { query }),
  assign: (candidateId: string, templateId: string) =>
    apiClient<void, { templateId: string }>(`/assessments/${candidateId}/assign`, { method: "POST", body: { templateId } }),
};
