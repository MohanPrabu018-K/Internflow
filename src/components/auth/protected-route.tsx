"use client";

// ─── Protected Route (Production) ────────────────────────────────────────
// Redirects to /login if user is not authenticated
import { useAuthContext } from "@/components/auth/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { PageLoader } from "@/components/shared/page-loader";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
  fallback?: ReactNode;
}

export function ProtectedRoute({
  children,
  allowedRoles,
  fallback,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const loginUrl = new URL("/login", window.location.origin);
      loginUrl.searchParams.set("redirect", pathname);
      router.replace(loginUrl.toString());
    }
  }, [isLoading, isAuthenticated, router, pathname]);

  // Show loading state
  if (isLoading) {
    return fallback ?? <PageLoader />;
  }

  // Not authenticated — don't render children (redirect will happen via useEffect)
  if (!isAuthenticated) {
    return fallback ?? <PageLoader />;
  }

  // Role-based access check
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    if (typeof window !== "undefined") {
      router.replace("/403");
    }
    return fallback ?? <PageLoader />;
  }

  return <>{children}</>;
}
