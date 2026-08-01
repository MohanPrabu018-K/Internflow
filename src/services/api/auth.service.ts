import { apiClient } from "@/lib/api-client";
import type { UserRole } from "@/types/prisma";

export interface LoginPayload {
  email: string;
  password: string;
  role?: UserRole;
}

export interface AuthSession {
  accessToken: string;
  userName: string;
  role: UserRole;
}

export interface RefreshPayload {
  refreshToken: string;
}

export interface GoogleOAuthPayload {
  code: string;
  redirectUri: string;
}

export interface GoogleOAuthUrlPayload {
  provider: "google";
  redirectUri: string;
}

export interface GoogleOAuthUrlResponse {
  url: string;
}

export const authService = {
  login: (payload: LoginPayload) => apiClient<AuthSession, LoginPayload>("/auth/login", { method: "POST", body: payload }),
  logout: () => apiClient<void>("/auth/logout", { method: "POST" }),
  me: () => apiClient<AuthSession>("/auth/me"),
  refresh: (payload: RefreshPayload) => apiClient<AuthSession, RefreshPayload>("/auth/refresh", { method: "POST", body: payload }),
  googleAuthorizeUrl: (payload: GoogleOAuthUrlPayload) =>
    apiClient<GoogleOAuthUrlResponse, GoogleOAuthUrlPayload>("/auth/google/url", { method: "POST", body: payload }),
  googleCallback: (payload: GoogleOAuthPayload) =>
    apiClient<AuthSession, GoogleOAuthPayload>("/auth/google/callback", { method: "POST", body: payload }),
};
