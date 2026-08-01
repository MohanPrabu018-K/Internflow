"use client";

import { useApiState } from "./use-api-state";

export function useReports() {
  return useApiState<Record<string, unknown>>({});
}
