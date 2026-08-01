import { apiClient } from "@/lib/api-client";

export interface CompanySettings {
  id?: string;
  companyName: string;
  logoUrl?: string;
  brandColor?: string;
  emailSignature?: string;
}

export const settingsService = {
  get: () => apiClient<CompanySettings>("/settings"),
  update: (payload: Partial<CompanySettings>) =>
    apiClient<CompanySettings, Partial<CompanySettings>>("/settings", { method: "PATCH", body: payload }),
};
