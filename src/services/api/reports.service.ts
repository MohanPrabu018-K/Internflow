import { apiClient } from "@/lib/api-client";
import type { ListQueryParams } from "@/types/query";

export const reportsService = {
  summary: () => apiClient<Record<string, unknown>>("/reports/summary"),
  funnel: (query?: ListQueryParams) => apiClient<Record<string, unknown>[]>("/reports/funnel", { query }),
};
