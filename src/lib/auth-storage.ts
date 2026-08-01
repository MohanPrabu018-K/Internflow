import { AUTH_COOKIE_NAME, AUTH_ROLE_COOKIE } from "./auth.constants";
import type { AuthSession } from "@/types/auth";

export function setAuthCookie(session: AuthSession) {
  document.cookie = `${AUTH_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(session))}; path=/; max-age=604800; samesite=lax`;
  document.cookie = `${AUTH_ROLE_COOKIE}=${encodeURIComponent(session.user.role)}; path=/; max-age=604800; samesite=lax`;
}

export function clearAuthCookie() {
  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; samesite=lax`;
  document.cookie = `${AUTH_ROLE_COOKIE}=; path=/; max-age=0; samesite=lax`;
}

export function readAuthCookie(): AuthSession | null {
  if (typeof document === "undefined") return null;
  const value = document.cookie.split("; ").find((row) => row.startsWith(`${AUTH_COOKIE_NAME}=`))?.split("=")[1];
  if (!value) return null;
  try {
    return JSON.parse(decodeURIComponent(value)) as AuthSession;
  } catch {
    return null;
  }
}
