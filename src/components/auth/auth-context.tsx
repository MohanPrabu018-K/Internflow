"use client";

// ─── Production AuthContext ──────────────────────────────────────────────
// Wraps NextAuth.js v5 session for client components
import { SessionProvider, useSession, signIn, signOut } from "next-auth/react";
import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { AuthContextValue, LoginCredentials } from "@/types/auth";
import type { UserRole } from "@/types/prisma";

const AuthContext = createContext<AuthContextValue | null>(null);

function AuthContextInner({ children }: { children: ReactNode }) {
  const { data: session, status, update } = useSession();

  const value = useMemo<AuthContextValue>(() => {
    const isLoading = status === "loading";

    if (!session?.user) {
      return {
        user: null,
        session: null,
        isLoading,
        isAuthenticated: false,
        login: async (credentials: LoginCredentials) => {
          const result = await signIn("credentials", {
            email: credentials.email,
            password: credentials.password,
            redirect: false,
          });
          if (result?.error) {
            throw new Error(result.error);
          }
        },
        logout: async () => {
          await signOut({ redirect: false });
        },
        refreshSession: async () => {
          await update();
        },
      };
    }

    const role: UserRole = (session.user.role as UserRole) || "RECRUITER";
    const expiresAt = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();

    return {
      user: {
        id: session.user.id,
        name: session.user.name ?? "User",
        email: session.user.email ?? "",
        role,
        department: undefined,
      },
      session: {
        token: "",
        user: {
          id: session.user.id,
          name: session.user.name ?? "User",
          email: session.user.email ?? "",
          role,
          department: undefined,
        },
        expiresAt,
      },
      isLoading: false,
      isAuthenticated: true,
      login: async () => {
        throw new Error("Already authenticated");
      },
      logout: async () => {
        await signOut({ redirect: false });
      },
      refreshSession: async () => {
        await update();
      },
    };
  }, [session, status, update]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AuthContextInner>{children}</AuthContextInner>
    </SessionProvider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext must be used within AuthProvider");
  return context;
}
