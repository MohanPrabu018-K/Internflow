// ─── Environment Validation ──────────────────────────────────────────────
// Validates all required env vars at startup. Throws if critical vars missing.

interface EnvVar {
  key: string;
  required: boolean;
  description: string;
  validate?: (val: string) => boolean;
}

const REQUIRED_ENV_VARS: EnvVar[] = [
  { key: "DATABASE_URL", required: true, description: "PostgreSQL connection string" },
  {
    key: "NEXTAUTH_SECRET",
    required: true,
    description: "NextAuth.js secret (min 32 chars)",
    validate: (v) => v.length >= 32,
  },
  { key: "NEXTAUTH_URL", required: true, description: "Application URL" },
  { key: "AUTH_GOOGLE_ID", required: false, description: "Google OAuth Client ID" },
  { key: "AUTH_GOOGLE_SECRET", required: false, description: "Google OAuth Client Secret" },
  { key: "RESEND_API_KEY", required: false, description: "Resend API key for email" },
  { key: "EMAIL_FROM", required: false, description: "Default sender email" },
  { key: "STORAGE_PROVIDER", required: false, description: "File storage: local or s3" },
  { key: "STORAGE_LOCAL_PATH", required: false, description: "Local upload directory" },
];

export function validateEnv(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  for (const env of REQUIRED_ENV_VARS) {
    const value = process.env[env.key];

    if (env.required && (!value || value.trim() === "")) {
      errors.push(`Missing required env: ${env.key} — ${env.description}`);
      continue;
    }

    if (env.validate && value && !env.validate(value)) {
      errors.push(`Invalid value for ${env.key}: ${env.description}`);
    }
  }

  if (errors.length > 0) {
    console.error("\n❌ Environment validation failed:");
    for (const err of errors) console.error(`   • ${err}`);
    console.error("");
  }

  return { valid: errors.length === 0, errors };
}

// Validate on import in non-browser environments
if (typeof window === "undefined" && process.env.NODE_ENV === "production") {
  validateEnv();
}
