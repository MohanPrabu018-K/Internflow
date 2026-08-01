import { apiClient } from "@/lib/api-client";
import type { Candidate } from "@/types/internflow";
import type { ApiListResponse } from "@/types/api";
import type { ListQueryParams } from "@/types/query";

export const candidatesService = {
  list: (query?: ListQueryParams) => apiClient<ApiListResponse<Candidate>>("/candidates", { query }),
  getById: (id: string) => apiClient<Candidate>(`/candidates/${id}`),
  create: (payload: Partial<Candidate>) => apiClient<Candidate, Partial<Candidate>>("/candidates", { method: "POST", body: payload }),
  update: (id: string, payload: Partial<Candidate>) => apiClient<Candidate, Partial<Candidate>>(`/candidates/${id}`, { method: "PATCH", body: payload }),
  remove: (id: string) => apiClient<void>(`/candidates/${id}`, { method: "DELETE" }),
};
