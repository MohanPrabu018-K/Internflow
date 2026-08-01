import { apiClient } from "@/lib/api-client";
import type { ListQueryParams } from "@/types/query";

export interface OfferPayload {
  id?: string;
  candidateId: string;
  templateId: string;
}

export const offersService = {
  generate: (payload: OfferPayload) => apiClient<void, OfferPayload>("/offers/generate", { method: "POST", body: payload }),
  list: (query?: ListQueryParams) => apiClient<OfferPayload[]>("/offers", { query }),
};
