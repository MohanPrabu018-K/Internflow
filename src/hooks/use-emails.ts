"use client";

import { useApiState } from "./use-api-state";
import type { EmailPayload } from "@/services/api/emails.service";

export function useEmails() {
  return useApiState<EmailPayload[]>([]);
}
