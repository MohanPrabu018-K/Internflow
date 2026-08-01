import type { UserRole } from "./prisma";

export type Permission =
  | "auth:read"
  | "auth:write"
  | "candidates:read"
  | "candidates:write"
  | "applications:read"
  | "applications:write"
  | "assessments:read"
  | "assessments:write"
  | "interviews:read"
  | "interviews:write"
  | "offers:read"
  | "offers:write"
  | "emails:read"
  | "emails:write"
  | "reports:read"
  | "reports:write"
  | "settings:read"
  | "settings:write";

export const rolePermissions: Record<UserRole, Permission[]> = {
  ADMIN: [
    "auth:read",
    "auth:write",
    "candidates:read",
    "candidates:write",
    "applications:read",
    "applications:write",
    "assessments:read",
    "assessments:write",
    "interviews:read",
    "interviews:write",
    "offers:read",
    "offers:write",
    "emails:read",
    "emails:write",
    "reports:read",
    "reports:write",
    "settings:read",
    "settings:write",
  ],
  RECRUITER: [
    "auth:read",
    "candidates:read",
    "candidates:write",
    "applications:read",
    "applications:write",
    "assessments:read",
    "assessments:write",
    "interviews:read",
    "interviews:write",
    "offers:read",
    "emails:read",
    "emails:write",
    "reports:read",
    "settings:read",
  ],
  VIEWER: [
    "auth:read",
    "candidates:read",
    "applications:read",
    "assessments:read",
    "interviews:read",
    "offers:read",
    "emails:read",
    "reports:read",
    "settings:read",
  ],
};
