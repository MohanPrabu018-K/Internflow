"use client";

import { useApiState } from "./use-api-state";
import type { OfferPayload } from "@/services/api/offers.service";

export function useOffers() {
  return useApiState<OfferPayload[]>([]);
}
