"use client";

import { useApiState } from "./use-api-state";
import type { CompanySettings } from "@/services/api/settings.service";

export function useSettings() {
  return useApiState<CompanySettings>({ companyName: "" });
}
