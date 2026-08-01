import { apiClient } from "@/lib/api-client";
import type { ApiListResponse } from "@/types/api";
import type { ListQueryParams } from "@/types/query";

export interface ApplicationRecord {
  id: string;
  candidateId: string;
  stage: string;
}

export const applicationsService = {
  list: (query?: ListQueryParams) => apiClient<ApiListResponse<ApplicationRecord>>("/applications", { query }),
  getByCandidateId: (candidateId: string) => apiClient<ApplicationRecord[]>(`/applications/candidate/${candidateId}`),
};
