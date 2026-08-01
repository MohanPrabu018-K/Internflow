import { apiClient } from "@/lib/api-client";
import type { ListQueryParams } from "@/types/query";

export interface EmailPayload {
  id?: string;
  to: string;
  subject: string;
  body: string;
}

export const emailsService = {
  send: (payload: EmailPayload) => apiClient<void, EmailPayload>("/emails/send", { method: "POST", body: payload }),
  list: (query?: ListQueryParams) => apiClient<EmailPayload[]>("/emails", { query }),
};
