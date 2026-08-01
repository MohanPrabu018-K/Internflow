// ─── Security Utilities ──────────────────────────────────────────────────
// CSRF protection, input sanitization, security headers, audit logging

// ─── Input Sanitization ──────────────────────────────────────────────────

const XSS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /on\w+\s*=\s*"[^"]*"/gi,
  /on\w+\s*=\s*'[^']*'/gi,
  /javascript\s*:/gi,
  /<iframe\b/gi,
  /<embed\b/gi,
  /<object\b/gi,
  /data:text\/html/gi,
];

export function sanitizeInput(input: string): string {
  if (!input) return "";
  let sanitized = input;

  for (const pattern of XSS_PATTERNS) {
    sanitized = sanitized.replace(pattern, "");
  }

  sanitized = sanitized
    .replace(/&/g, "\u0026amp;")
    .replace(/</g, "\u0026lt;")
    .replace(/>/g, "\u0026gt;")
    .replace(/"/g, "\u0026quot;")
    .replace(/'/g, "\u0026#x27;");

  return sanitized;
}

export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const sanitized = { ...obj };
  for (const key of Object.keys(sanitized)) {
    const val = sanitized[key];
    if (typeof val === "string") {
      sanitized[key as keyof T] = sanitizeInput(val) as T[keyof T];
    } else if (typeof val === "object" && val !== null) {
      sanitized[key as keyof T] = sanitizeObject(val as Record<string, unknown>) as T[keyof T];
    }
  }
  return sanitized;
}

// ─── Security Headers ────────────────────────────────────────────────────

export const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
};

// ─── Rate Limiter Configuration ──────────────────────────────────────────

export const RATE_LIMIT_CONFIG = {
  global: {
    points: Number(process.env.RATE_LIMIT_MAX || 100),
    duration: Number(process.env.RATE_LIMIT_WINDOW_SEC || 60),
  },
  auth: {
    points: 5,
    duration: 60,
    blockDuration: 300,
  },
  api: {
    points: 30,
    duration: 60,
  },
} as const;

// ─── Password Validation ─────────────────────────────────────────────────

export function validatePasswordStrength(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  if (password.length < 8) errors.push("Password must be at least 8 characters");
  if (!/[A-Z]/.test(password)) errors.push("Password must contain an uppercase letter");
  if (!/[a-z]/.test(password)) errors.push("Password must contain a lowercase letter");
  if (!/[0-9]/.test(password)) errors.push("Password must contain a number");
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password))
    errors.push("Password must contain a special character");
  return { valid: errors.length === 0, errors };
}
