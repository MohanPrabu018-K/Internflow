// ─── NextAuth.js v5 Configuration ────────────────────────────────────────
// Supports: Google/GitHub OAuth, credentials (email+password)
// Dev mode: falls back to mock users when PostgreSQL is not available
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

// ─── Dev Mock Users (used when DB is unavailable) ─────────────────────────
const MOCK_USERS: Record<string, { id: string; name: string; email: string; passwordHash: string; role: string; isActive: boolean }> = {
  "admin@internflow.com": {
    id: "mock-admin-001",
    name: "Admin User",
    email: "admin@internflow.com",
    passwordHash: bcrypt.hashSync("password123", 12),
    role: "ADMIN",
    isActive: true,
  },
  "priya@internflow.com": {
    id: "mock-recruiter-001",
    name: "Priya Sharma",
    email: "priya@internflow.com",
    passwordHash: bcrypt.hashSync("password123", 12),
    role: "RECRUITER",
    isActive: true,
  },
  "viewer@internflow.com": {
    id: "mock-viewer-001",
    name: "Read-Only Viewer",
    email: "viewer@internflow.com",
    passwordHash: bcrypt.hashSync("password123", 12),
    role: "VIEWER",
    isActive: true,
  },
};

// ─── Detect if DB is available ────────────────────────────────────────────
let dbAvailable = false;

async function checkDbAvailable(): Promise<boolean> {
  try {
    await prisma.$queryRawUnsafe("SELECT 1");
    dbAvailable = true;
    return true;
  } catch {
    dbAvailable = false;
    if (process.env.NODE_ENV === "development") {
      console.warn("[auth] PostgreSQL not available — using mock users for dev");
    }
    return false;
  }
}

// ─── Find user (DB or mock) ──────────────────────────────────────────────
async function findUser(email: string) {
  const isDb = await checkDbAvailable();

  if (isDb) {
    return prisma.user.findUnique({ where: { email } });
  }

  return MOCK_USERS[email] || null;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as never,

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  pages: {
    signIn: "/login",
    error: "/login?error=true",
  },

  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || "mock",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "mock",
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID || "mock",
      clientSecret: process.env.AUTH_GITHUB_SECRET || "mock",
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const email = (credentials.email as string).toLowerCase().trim();
        const password = credentials.password as string;

        const user = await findUser(email);

        if (!user) {
          throw new Error("Invalid email or password");
        }

        if (!user.passwordHash) {
          throw new Error("Please sign in with Google");
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
          throw new Error("Invalid email or password");
        }

        if (!user.isActive) {
          throw new Error("Account has been deactivated");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: null,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
        token.role = (user as Record<string, unknown>).role as string | undefined;
      }

      if (trigger === "update" && token.email) {
        const isDb = await checkDbAvailable();
        if (isDb) {
          try {
            const dbUser = await prisma.user.findUnique({
              where: { email: token.email as string },
              include: { department: true },
            });
            if (dbUser) {
              token.role = dbUser.role;
              token.departmentId = dbUser.departmentId ?? undefined;
              token.title = dbUser.title ?? undefined;
            }
          } catch {
            // Ignore DB errors during session update
          }
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as string) || "RECRUITER";
      }
      return session;
    },
  },

  debug: process.env.NODE_ENV === "development",
});
