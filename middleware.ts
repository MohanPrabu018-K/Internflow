// ─── Production Middleware: Auth Protection + Rate Limiting ──────────────
// Uses NextAuth.js v5 for session validation on protected routes
import { auth } from "@/lib/auth.config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ─── Route Configuration ──────────────────────────────────────────────────
const PUBLIC_ROUTES = ["/login", "/", "/portal/login", "/403"];
const PUBLIC_PREFIXES = [
  "/_next",
  "/api/auth",
  "/favicon.ico",
  "/images",
  "/assets",
  "/public",
];

function isPublicPath(pathname: string): boolean {
  if (PUBLIC_ROUTES.includes(pathname)) return true;
  return PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

// ─── Rate Limiter (in-memory: per-IP sliding window) ──────────────────────
const rateLimitMap = new Map<
  string,
  { count: number; resetAt: number }
>();

const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX || 100);
const RATE_LIMIT_WINDOW_SEC = Number(process.env.RATE_LIMIT_WINDOW_SEC || 60);

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_SEC * 1000 });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

// Clean up stale entries periodically
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, val] of rateLimitMap) {
      if (now > val.resetAt) rateLimitMap.delete(key);
    }
  }, 60_000);
}

// ─── Middleware ────────────────────────────────────────────────────────────
export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? req.headers.get("x-real-ip")
    ?? "127.0.0.1";

  // 1. Public paths: pass through
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // 2. Rate limiting
  if (!checkRateLimit(ip)) {
    return new NextResponse(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      {
        status: 429,
        headers: { "Content-Type": "application/json", "Retry-After": String(RATE_LIMIT_WINDOW_SEC) },
      }
    );
  }

  // 3. Auth check: require session for all non-public routes
  if (!req.auth?.user?.email) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 4. Security headers
  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
