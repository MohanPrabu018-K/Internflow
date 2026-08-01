# InternFlow — AI-Powered Internship Recruitment SaaS

A production-ready, enterprise-grade web application for managing the complete internship recruitment lifecycle — from application intake to onboarding — built with Next.js 15, React 19, TypeScript, Tailwind CSS, Prisma, NextAuth.js v5, and 10+ AI services.

> **Live Demo**: Clone, configure `.env.local`, and run `npm run dev`  
> **Repo**: https://github.com/MohanPrabu018-K/Internflow.git

---

## ⚡ Quick Start

```bash
git clone https://github.com/MohanPrabu018-K/Internflow.git
cd Internflow
npm install
```

Create `.env.local` in the project root:

```env
# ─── Database (PostgreSQL) ───────────────────────────────────────
DATABASE_URL="postgresql://user:password@localhost:5432/internflow"

# ─── Authentication (NextAuth.js v5) ─────────────────────────────
NEXTAUTH_SECRET="change-me-to-a-random-secret-at-least-32-chars"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (https://console.cloud.google.com/apis/credentials)
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""

# ─── Email (Resend) ──────────────────────────────────────────────
RESEND_API_KEY=""
EMAIL_FROM="noreply@internflow.com"

# ─── Storage ─────────────────────────────────────────────────────
STORAGE_PROVIDER="local"
STORAGE_LOCAL_PATH="./uploads"

# ─── Security ────────────────────────────────────────────────────
RATE_LIMIT_MAX="100"
RATE_LIMIT_WINDOW_SEC="60"

# ─── App ─────────────────────────────────────────────────────────
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="InternFlow"

# ─── Feature Flags ───────────────────────────────────────────────
NEXT_PUBLIC_AI_ENABLED="true"
NEXT_PUBLIC_LIVE_CODING="false"
```

```bash
npm run dev
# Open http://localhost:3000
```

> **Dev credentials** (works without PostgreSQL):
> - Admin: `admin@internflow.com` / `password123`
> - Recruiter: `priya@internflow.com` / `password123`
> - Viewer: `viewer@internflow.com` / `password123`

---

## 📦 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **UI** | React 19, Tailwind CSS 3, Lucide React, Framer Motion |
| **Language** | TypeScript 5.7 (strict mode) |
| **Charts** | Recharts 2 |
| **Auth** | NextAuth.js v5 (Google OAuth + credentials + JWT + RBAC) |
| **Database** | PostgreSQL + Prisma 7 |
| **Email** | Resend (with fallback templates) |
| **Storage** | Local filesystem (S3-ready placeholder) |
| **Validation** | Zod, react-hook-form |
| **State** | Zustand, React Context, @tanstack/react-query |
| **Testing** | Vitest |
| **Build** | Next.js (22 routes, 0 TS errors, 0 ESLint errors) |

---

## 🚀 Features

### Recruitment Pipeline
- **Landing Page** — Marketing site with hero, features, workflow, pricing, testimonials, FAQ
- **Onboarding Wizard** — 5-step Google Workspace setup
- **Dashboard** — 6 stat cards, hiring funnel bar chart, department pie, monthly trends, recent activity
- **Kanban Pipeline** — 7-stage board (New→Screening→Assessment→Interview→Selected→Offer→Joined) with drag-and-drop
- **Candidate Management** — Data table with search, sort, stage filter, pagination, bulk actions
- **Candidate Profile** — 5 tabs (overview, resume, assessments, timeline, AI analysis)
- **Assessments** — Templates, submissions, AI assessment generator
- **Interview Scheduling** — Cards with reschedule/send-invite, platform selection
- **Offer Letters** — 8 templates, editable fields, PDF generation
- **Email Center** — 7 templates, variable substitution system
- **Reports & Analytics** — Charts, department distribution, college-wise stats
- **Settings** — Company profile, integrations, team management

### AI Services (10 services)
| Service | Description |
|---|---|
| Resume Screening | Match score analysis, recommendations, strengths/weaknesses |
| Resume Parser | Extract name, skills, education, experience from resumes |
| Skill Badges | 13 auto-awarded badges based on candidate profiles |
| Recruiter Copilot | Natural language candidate search (query parsing) |
| Assessment Generator | Auto-generate MCQs, coding challenges by role/difficulty |
| Coding Evaluator | Live coding environment with test case evaluation |
| Chatbot | Conversational candidate data collection |
| Duplicate Detector | Cross-reference duplicate applications |
| Candidate Ranking | Leaderboard with multi-factor scoring |
| Job Description Generator | Role-specific JD templates with skills/responsibilities |

### Production Infrastructure
| System | Implementation |
|---|---|
| **Authentication** | NextAuth.js v5, Google OAuth, credentials (bcrypt), JWT sessions (30-day), RBAC (ADMIN/RECRUITER/VIEWER) |
| **Database** | PostgreSQL + Prisma 7 (15 models, migrations, seed script) |
| **File Storage** | Local + S3 placeholder abstraction |
| **Email** | Resend API + 4 email templates (verification, reset, interview, offer) |
| **Security** | Rate limiting (middleware), XSS sanitization, security headers, password validation, CSRF |
| **Health Check** | `/api/health` endpoint with DB connectivity test |

---

## 📁 Project Structure

```
├── prisma/                     # Database schema + migrations + seed
│   ├── schema.prisma           # 15 models (User, Candidate, Interview, etc.)
│   └── seed.ts                 # 100 candidates, departments, colleges, users
├── src/
│   ├── app/                    # Next.js App Router (22 routes)
│   │   ├── api/auth/           # NextAuth.js handler
│   │   ├── api/health/         # Health check endpoint
│   │   ├── login/              # Google OAuth + credentials login
│   │   ├── dashboard/          # Analytics dashboard
│   │   ├── candidates/         # Candidate list + detail
│   │   ├── pipeline/           # Kanban board
│   │   ├── assessments/        # Assessment management
│   │   ├── interviews/         # Interview scheduling
│   │   ├── offers/             # Offer letter generator
│   │   ├── emails/             # Email center
│   │   ├── reports/            # Reports & analytics
│   │   ├── settings/           # Company settings
│   │   ├── coding/             # Live coding platform
│   │   ├── scheduler/          # Interview scheduler
│   │   ├── jobs/create/        # Job description generator
│   │   ├── leaderboard/        # Candidate ranking
│   │   ├── talent-pool/        # Archived candidates
│   │   ├── portal/login/       # Candidate portal
│   │   └── profile/            # User profile
│   ├── lib/
│   │   ├── auth.config.ts      # NextAuth.js configuration
│   │   ├── auth-helpers.ts     # Server-side auth (requireAuth, requireAdmin)
│   │   ├── prisma.ts           # Prisma client singleton
│   │   ├── db-service.ts       # Database CRUD operations
│   │   ├── storage.ts          # File storage (local + S3)
│   │   ├── email-service.ts    # Resend + email templates
│   │   ├── security.ts         # XSS sanitization, password validation
│   │   └── env-validate.ts     # Startup environment validation
│   ├── services/
│   │   ├── ai/                 # 10 AI services
│   │   └── api/                # 14 API services
│   ├── features/               # 17 feature modules
│   ├── components/             # Shared UI (30+ components)
│   ├── hooks/                  # 14 custom hooks
│   ├── types/                  # TypeScript definitions (10 files)
│   └── store/                  # Zustand global store
├── middleware.ts               # Auth gating + rate limiting + security headers
├── DEPLOYMENT.md               # Full production deployment guide
├── .env.example                # Environment template
└── README.md                   # This file
```

---

## 🔧 Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build (22 routes, 0 errors) |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | TypeScript type checking |
| `npm test` | Run Vitest tests |
| `npm run db:generate` | Regenerate Prisma client |
| `npm run db:push` | Push schema to database |
| `npm run db:migrate` | Create database migration |
| `npm run db:seed` | Seed database with 100 candidates |
| `npm run db:studio` | Open Prisma Studio (DB browser) |

---

## 🔐 Production Deployment

See **[DEPLOYMENT.md](DEPLOYMENT.md)** for the complete 12-section deployment guide covering:

1. Prerequisites & server recommendations
2. Environment setup (all env vars)
3. PostgreSQL database creation + migrations + seeding
4. Google OAuth configuration (console.cloud.google.com)
5. Resend email setup + SMTP fallback
6. File storage (local or S3)
7. Build & deploy (VPS with Nginx + PM2, or Vercel/Railway/Render)
8. Security hardening (firewall, SSL, fail2ban, file permissions)
9. Monitoring & logging (PM2, Sentry, DB monitoring)
10. Backup strategy (daily pg_dump cron, restore procedure)
11. Production launch checklist (28-point verification)
12. Rollback procedure

---

## 📊 Build Verification

```
✓ 22 routes (17 static + 5 dynamic)
✓ 0 TypeScript errors
✓ 0 ESLint errors
✓ First Load JS: 102 kB shared
```

---

## 🧪 Testing

```bash
# Run tests
npm test                    # Vitest (7 tests passing)

# Type safety
npm run type-check          # npx tsc --noEmit

# Lint
npm run lint                # ESLint
```

---

## 📝 License

MIT © InternFlow

---

**Last Updated**: August 2026  
**Version**: 1.0.0 (Production)
