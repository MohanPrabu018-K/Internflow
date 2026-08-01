"use client";

import { useApiState } from "./use-api-state";
import type { Candidate } from "@/types/internflow";

export function useCandidates() {
  return useApiState<Candidate[]>([]);
}
