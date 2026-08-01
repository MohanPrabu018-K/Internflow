import type { UserRole } from "@/types/prisma";
import { rolePermissions } from "@/types/permissions";
import type { Page } from "@/types/internflow";

export function hasPermission(role: UserRole, permission: string) {
  return rolePermissions[role].includes(permission as never);
}

export const pagePermissions: Partial<Record<Page, string>> = {
  dashboard: "reports:read",
  pipeline: "applications:read",
  candidates: "candidates:read",
  "candidate-profile": "candidates:read",
  assessments: "assessments:read",
  interviews: "interviews:read",
  "offer-letters": "offers:read",
  emails: "emails:read",
  reports: "reports:read",
  settings: "settings:read",
};

export function canAccessPage(role: UserRole, page: Page) {
  const permission = pagePermissions[page];
  return permission ? hasPermission(role, permission) : true;
}
