"use client";

import { useApiState } from "./use-api-state";
import type { ApiListResponse } from "@/types/api";
import type { ApplicationRecord } from "@/services/api/applications.service";

export function useApplications() {
  return useApiState<ApiListResponse<ApplicationRecord>>({ items: [], total: 0 });
}
