import { AUTH_PUBLIC_ROUTES } from "./auth.constants";

export function isPublicRoute(pathname: string) {
  return AUTH_PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}
