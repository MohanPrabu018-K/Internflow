// ─── Server-Side Auth Helpers ────────────────────────────────────────────
// Use in: Server Components, Route Handlers, API Routes, Server Actions
import { auth } from "@/lib/auth.config";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { Session } from "next-auth";

export type AuthedUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role: string;
};

/**
 * Require authentication. Redirects to /login if not signed in.
 * Returns the session's user with guaranteed id and role.
 */
export async function requireAuth(): Promise<AuthedUser> {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  return session.user as AuthedUser;
}

/**
 * Require specific role(s). Throws 403 if role doesn't match.
 */
export async function requireRole(allowedRoles: string[]): Promise<AuthedUser> {
  const user = await requireAuth();

  if (!allowedRoles.includes(user.role)) {
    redirect("/403");
  }

  return user;
}

/**
 * Require ADMIN role only.
 */
export async function requireAdmin(): Promise<AuthedUser> {
  return requireRole(["ADMIN"]);
}

/**
 * Require ADMIN or RECRUITER role.
 */
export async function requireRecruiter(): Promise<AuthedUser> {
  return requireRole(["ADMIN", "RECRUITER"]);
}

/**
 * Get session without redirecting. Returns null for unauthenticated users.
 */
export async function getOptionalSession() {
  const session = await auth();
  if (!session?.user?.email) return null;
  return session.user as AuthedUser;
}

/**
 * Get the full user record from the database.
 */
export async function getCurrentUser() {
  const session = await auth();
  if (!session?.user?.email) return null;

  return prisma.user.findUnique({
    where: { email: session.user.email },
    include: { department: true },
  });
}
