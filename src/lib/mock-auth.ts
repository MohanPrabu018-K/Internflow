import type { AuthSession, AuthUser, LoginCredentials } from "@/types/auth";
import type { UserRole } from "@/types/prisma";

const demoUsers: Record<UserRole, AuthUser> = {
  ADMIN: { id: "u-admin", name: "Priya Kapoor", email: "priya@acme.com", role: "ADMIN", department: "Operations" },
  RECRUITER: { id: "u-recruiter", name: "Rahul Verma", email: "rahul@acme.com", role: "RECRUITER", department: "Engineering" },
  VIEWER: { id: "u-viewer", name: "Meera Nair", email: "meera@acme.com", role: "VIEWER", department: "HR" },
};

export function mockAuthenticate(credentials: LoginCredentials): AuthSession {
  const role = credentials.role ?? "RECRUITER";
  const user = demoUsers[role];
  return {
    token: `mock-jwt-${role.toLowerCase()}-${Date.now()}`,
    user,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  };
}

export function mockSessionFromCookieSession(session: AuthSession): AuthSession {
  return session;
}
