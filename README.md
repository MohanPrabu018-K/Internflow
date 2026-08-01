# InternFlow — Internship Recruitment Automation Platform

A modern, production-grade web application for managing the complete internship recruitment lifecycle — from application intake to onboarding — built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Recharts.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Directory Structure](#directory-structure)
- [Features](#features)
- [Routing](#routing)
- [Feature Modules](#feature-modules)
- [Shared Components](#shared-components)
- [Services & Data Layer](#services--data-layer)
- [Hooks](#hooks)
- [State Management](#state-management)
- [Type System](#type-system)
- [Authentication](#authentication)
- [Middleware](#middleware)
- [Installation & Setup](#installation--setup)
- [Development](#development)
- [Build & Deployment](#build--deployment)
- [Scripts](#scripts)
- [Coding Standards](#coding-standards)
- [Performance Optimizations](#performance-optimizations)
- [Security](#security)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Contribution Guidelines](#contribution-guidelines)
- [Roadmap](#roadmap)

---

## Project Overview

**InternFlow** is a single-page web application that streamlines internship hiring for HR teams. It provides:

- A **landing page** for marketing and onboarding
- A full **dashboard** with hiring funnel analytics
- **Candidate management** with search, filter, sort, and stage tracking
- A **Kanban pipeline** with drag-and-drop stage transitions
- **Assessment workflows** for assigning and scoring technical tests
- **Interview scheduling** with platform links (Google Meet, Zoom, Teams)
- **Offer letter generation** from customizable templates
- **Email automation** with variable substitution
- **Reports & analytics** with interactive charts
- **Settings** for company profile, integrations, and team management

The application currently runs with **authentication bypassed** for development and testing. A mock authentication layer is scaffolded and ready to be activated.

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **UI Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5.7](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Charts** | [Recharts 2](https://recharts.org/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Linting** | [ESLint 9](https://eslint.org/) with `eslint-config-next` |
| **Build** | Next.js built-in (Turbopack in dev) |

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Browser / Client                    │
├─────────────────────────────────────────────────────┤
│  InternFlowApp (orchestrator)                        │
│    ├─ LandingPage                                   │
│    ├─ OnboardingWizard                              │
│    └─ App Shell                                     │
│         ├─ Sidebar  ──  TopNav                      │
│         └─ View Router                              │
│              ├─ DashboardView                       │
│              ├─ PipelineView                         │
│              ├─ CandidatesView                       │
│              ├─ CandidateProfileView                 │
│              ├─ AssessmentsView                      │
│              ├─ InterviewsView                       │
│              ├─ OfferLettersView                     │
│              ├─ EmailsView                           │
│              ├─ ReportsView                          │
│              └─ SettingsView                         │
├─────────────────────────────────────────────────────┤
│  Services Layer                                      │
│    ├─ CandidateService (mock CRUD)                  │
│    ├─ AuthService                                    │
│    └─ Other domain services                          │
├─────────────────────────────────────────────────────┤
│  Data Layer                                          │
│    ├─ mock-data.ts (100 seed candidates)            │
│    ├─ candidate-store.ts (in-memory store)          │
│    └─ internflow-data.ts (shared constants)         │
└─────────────────────────────────────────────────────┘
```

The application follows a **feature-based module architecture**:
- Each feature is self-contained in `src/features/<name>/`
- Shared UI components live in `src/components/shared/`
- Layout wrappers live in `src/components/layouts/`
- Data access goes through `src/services/api/`
- Type definitions are centralized in `src/types/`

---

## Directory Structure

```
├── next.config.ts              # Next.js configuration
├── middleware.ts               # Route middleware (auth disabled)
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── eslint.config.mjs           # ESLint configuration
├── postcss.config.mjs          # PostCSS configuration
├── package.json                # Dependencies and scripts
├── .gitignore                  # Git ignore rules
├── README.md                   # This documentation
│
└── src/
    ├── app/                    # Next.js App Router pages
    │   ├── layout.tsx          # Root layout (AuthProvider + globals)
    │   ├── page.tsx            # Landing page (→ InternFlowApp)
    │   ├── not-found.tsx       # 404 page
    │   ├── globals.css         # Global styles
    │   ├── 403/page.tsx        # Access denied page
    │   ├── login/page.tsx      # Login page
    │   ├── onboarding/page.tsx # Onboarding wizard
    │   ├── dashboard/page.tsx  # Dashboard
    │   ├── candidates/
    │   │   ├── page.tsx        # Candidates list
    │   │   └── [id]/page.tsx   # Candidate detail
    │   ├── pipeline/page.tsx   # Pipeline board
    │   ├── assessments/page.tsx
    │   ├── interviews/page.tsx
    │   ├── offers/page.tsx     # Offer letters
    │   ├── emails/page.tsx     # Email center
    │   ├── reports/page.tsx    # Reports & analytics
    │   ├── settings/page.tsx   # Settings
    │   └── profile/page.tsx    # User profile
    │
    ├── components/
    │   ├── auth/               # Auth context, protected route, user profile
    │   ├── layouts/            # Base, auth, landing, dashboard, main, app-shell
    │   └── shared/             # Reusable UI primitives (20+ components)
    │
    ├── features/               # Feature modules (one per domain)
    │   ├── internflow/         # App orchestrator shell
    │   ├── landing/            # Landing page sections
    │   ├── onboarding/         # Onboarding wizard
    │   ├── dashboard/          # Dashboard analytics view
    │   ├── pipeline/           # Kanban pipeline view
    │   ├── candidates/         # Candidate list view
    │   ├── candidate/          # Candidate profile view
    │   ├── assessments/        # Assessment management view
    │   ├── interviews/         # Interview scheduling view
    │   ├── offers/             # Offer letter generator view
    │   ├── emails/             # Email template view
    │   ├── reports/            # Reports & analytics view
    │   ├── settings/           # Settings view
    │   └── auth/               # Login form, role selector
    │
    ├── hooks/                  # Custom React hooks (14 hooks)
    ├── lib/                    # Utility libraries
    ├── services/api/           # API service layer (10 services)
    ├── types/                  # TypeScript type definitions (8 files)
    ├── styles/                 # Additional stylesheets
    ├── store/                  # State management (reserved)
    └── utils/                  # Utility functions (reserved)
```

---

## Features

### 1. Landing Page
Marketing page with hero section, feature highlights, workflow visualization, pricing plans, testimonials, FAQ, and footer. Renders `LandingPage` from `@/features/landing`.

### 2. Onboarding Wizard
5-step wizard: Google account connection → form URL → sheet verification → permissions → completion. Renders `OnboardingWizard` from `@/features/onboarding`.

### 3. Dashboard
- 6 stat cards (total applications, screening, assessments, interviews, offers sent, joined)
- Hiring funnel bar chart
- Department distribution pie chart
- Monthly trend area chart (applications vs hires)
- Recent activity feed
- Recent candidates table

### 4. Pipeline (Kanban Board)
- 7-stage board: New → Screening → Assessment → Interview → Selected → Offer Sent → Joined
- Drag-and-drop stage transitions
- Role filter buttons
- Candidate cards with avatar, rating, college, applied date

### 5. Candidates
- Full-featured data table with search, sort, stage filter
- Bulk selection with batch actions (approve, reject, move stage, export)
- Pagination with configurable page size
- Click-through to candidate profile
- Sourced from 100 seed candidates in mock-data

### 6. Candidate Profile
- Overview tab: personal info, skills, projects, education
- Resume tab: upload, replace, delete, preview (PDF mock)
- Assessments tab: submission status and score
- Timeline tab: stage progression history
- Sidebar: stage actions, recruiter rating, notes, assigned recruiter

### 7. Assessments
- Template sidebar with role-specific assessment templates
- Submission tracking with scores and status (approved/pending/rejected)
- Task list per assessment

### 8. Interviews
- Filterable tabs: upcoming, completed, cancelled
- Interview cards with date, time, platform, interviewer
- Reschedule and send-invite actions

### 9. Offer Letters
- 8 role-specific templates
- Editable fields: candidate name, role, duration, joining date, manager, mode
- Live document preview with letterhead
- Generate PDF and send via email actions

### 10. Email Center
- 7 stage-based email templates (application received, shortlisted, etc.)
- Subject, recipient, body fields
- Template variable system: `{{name}}`, `{{role}}`, `{{date}}`, `{{deadline}}`, `{{platform}}`, `{{link}}`

### 11. Reports & Analytics
- 4 stat cards (applications, acceptance rate, time-to-offer, sources)
- Monthly applications & hires area chart
- Department distribution pie chart with percentages
- College-wise applications bar chart

### 12. Settings
- Company profile: name, logo upload, industry, website, HR email
- Integrations: Google Workspace, Meet, Zoom, Teams, SMTP, Slack
- Team management: member list with roles, invite button

---

## Routing

All routes use Next.js App Router with file-system-based routing.

| Route | File | Description |
|-------|------|-------------|
| `/` | `src/app/page.tsx` | Landing page |
| `/login` | `src/app/login/page.tsx` | Login page |
| `/onboarding` | `src/app/onboarding/page.tsx` | Onboarding wizard |
| `/dashboard` | `src/app/dashboard/page.tsx` | Dashboard |
| `/candidates` | `src/app/candidates/page.tsx` | Candidates list |
| `/candidates/[id]` | `src/app/candidates/[id]/page.tsx` | Candidate profile |
| `/pipeline` | `src/app/pipeline/page.tsx` | Pipeline board |
| `/assessments` | `src/app/assessments/page.tsx` | Assessments |
| `/interviews` | `src/app/interviews/page.tsx` | Interviews |
| `/offers` | `src/app/offers/page.tsx` | Offer letters |
| `/emails` | `src/app/emails/page.tsx` | Email center |
| `/reports` | `src/app/reports/page.tsx` | Reports |
| `/settings` | `src/app/settings/page.tsx` | Settings |
| `/profile` | `src/app/profile/page.tsx` | User profile |
| `/403` | `src/app/403/page.tsx` | Access denied |

Each route wraps `InternFlowApp` with the appropriate layout (`DashboardLayout` or `AuthLayout`) and `ProtectedRoute` (currently pass-through).

---

## Feature Modules

Each feature module is an independent `"use client"` component exported from its directory:

| Module | Export | Purpose |
|--------|--------|---------|
| `@/features/landing` | `LandingPage` | Full marketing page with all sections |
| `@/features/onboarding` | `OnboardingWizard` | 5-step Google Workspace setup |
| `@/features/dashboard` | `DashboardView` | Analytics dashboard with charts |
| `@/features/pipeline` | `PipelineView` | Kanban board with drag-and-drop |
| `@/features/candidates` | `CandidatesView` | Data table with search/sort/filter |
| `@/features/candidate` | `CandidateProfileView` | Full candidate detail profile |
| `@/features/assessments` | `AssessmentsView` | Assessment templates & submissions |
| `@/features/interviews` | `InterviewsView` | Interview scheduling & management |
| `@/features/offers` | `OfferLettersView` | Offer letter generator |
| `@/features/emails` | `EmailsView` | Email template composer |
| `@/features/reports` | `ReportsView` | Charts & analytics |
| `@/features/settings` | `SettingsView` | Company, integrations, team |
| `@/features/auth` | `LoginForm`, `SelectRole` | Authentication UI |
| `@/features/internflow` | `InternFlowApp` | Orchestration shell (app router) |

---

## Shared Components

Located in `src/components/shared/`, these are the reusable UI building blocks:

| Component | File | Description |
|-----------|------|-------------|
| `Badge` | `badge.tsx` | Status/tone badge |
| `Breadcrumb` | `breadcrumb.tsx` | Navigation breadcrumbs |
| `Button` | `button.tsx` | Styled button with variants |
| `CandidatePrimitives` | `candidate-primitives.tsx` | `StageBadge`, `AvatarCircle`, `StarRating` |
| `Cards` | `cards.tsx` | `Card`, `CardBody`, `CardHeader` |
| `CommandPalette` | `command-palette.tsx` | Cmd+K search palette |
| `ConfirmationDialog` | `confirmation-dialog.tsx` | Confirm/cancel modal |
| `ContextMenu` | `context-menu.tsx` | Right-click menu |
| `DataTable` | `data-table.tsx` | Generic data table |
| `Drawer` | `drawer.tsx` | Slide-in panel |
| `Dropdown` | `dropdown.tsx` | Dropdown menu |
| `EmptyState` | `empty-state.tsx` | Empty state placeholder |
| `FilterBar` | `filter-bar.tsx` | Filter controls |
| `LoadingSkeleton` | `loading-skeleton.tsx` | Skeleton loader |
| `Modal` | `modal.tsx` | Dialog modal |
| `Notifications` | `notifications.tsx` | Notification system |
| `PageHeader` | `page-header.tsx` | Page title + actions |
| `PageLoader` | `page-loader.tsx` | Full-page spinner |
| `Search` | `search.tsx` | Search input |
| `Sidebar` | `sidebar.tsx` | Generic sidebar |
| `Toast` | `toast.tsx` | Toast notification provider |
| `Tooltip` | `tooltip.tsx` | Hover tooltip |
| `TopNavbar` | `top-navbar.tsx` | Generic top navigation |
| `UXProvider` | `ux-provider.tsx` | Keyboard shortcuts + command palette + toasts |

Layout components in `src/components/layouts/`:

| Component | Description |
|-----------|-------------|
| `BaseLayout` | Root wrapper with configurable background |
| `AuthLayout` | Layout for auth-related pages |
| `LandingLayout` | Layout for landing page |
| `MainLayout` | Generic main layout |
| `DashboardLayout` | Dashboard page layout |
| `AppShell` (`Sidebar`, `TopNav`) | Authenticated app chrome |

---

## Services & Data Layer

### API Services
Located in `src/services/api/`, each service provides mock implementations with simulated async delays (`~200ms`):

| Service | File | Methods |
|---------|------|---------|
| `CandidateService` | `candidate.service.ts` | `getCandidates`, `getCandidateById`, `createCandidate`, `updateCandidate`, `deleteCandidate`, `uploadResume`, `deleteResume`, `updateStage`, `addNotes`, `rateCandidate` |
| `AuthService` | `auth.service.ts` | Authentication operations |
| `ApplicationsService` | `applications.service.ts` | Application CRUD |
| `AssessmentsService` | `assessments.service.ts` | Assessment operations |
| `InterviewsService` | `interviews.service.ts` | Interview scheduling |
| `OffersService` | `offers.service.ts` | Offer letter operations |
| `EmailsService` | `emails.service.ts` | Email template operations |
| `ReportsService` | `reports.service.ts` | Report data |
| `SettingsService` | `settings.service.ts` | Settings operations |

### Data Store
- **`mock-data.ts`**: Generates 100 seed candidates with realistic data (IITs, NITs, BITS, VIT, etc.) plus recruiters, departments, colleges, applications, assessments, interviews, and offers.
- **`candidate-store.ts`**: In-memory mutable store for candidate CRUD. Resettable to seed data.
- **`internflow-data.ts`**: Shared constants: `NAV_ITEMS`, `PAGE_TITLES`, `CANDIDATES`.

---

## Hooks

| Hook | File | Purpose |
|------|------|---------|
| `useAuth` | `use-auth.ts` | Authentication state |
| `useCandidates` | `use-candidates.ts` | Candidates data fetching |
| `useCandidateManagement` | `use-candidate-management.ts` | Candidates with filters, sort, pagination |
| `useApplications` | `use-applications.ts` | Applications fetching |
| `useAssessments` | `use-assessments.ts` | Assessments fetching |
| `useInterviews` | `use-interviews.ts` | Interviews fetching |
| `useEmails` | `use-emails.ts` | Email data |
| `useOffers` | `use-offers.ts` | Offer data |
| `useReports` | `use-reports.ts` | Report data |
| `useSettings` | `use-settings.ts` | Settings data |
| `useApiState` | `use-api-state.ts` | Generic API state wrapper |
| `useDebouncedValue` | `use-debounced-value.ts` | Debounced input values |
| `useKeyboardShortcuts` | `use-keyboard-shortcuts.ts` | Keyboard shortcut bindings |
| `useMounted` | `use-mounted.ts` | Client-side mount detection |
| `useToggle` | `use-toggle.ts` | Boolean toggle state |

---

## State Management

The application uses **React Context + local state**:

- **`AuthProvider`** (`src/components/auth/auth-context.tsx`): Global auth context providing `user`, `session`, `isAuthenticated`, `isLoading`, `login()`, `logout()`, `refreshSession()`. Currently hardcoded to always-authenticated for testing.
- **`ToastProvider`** (`src/components/shared/toast.tsx`): Global toast notification context.
- **`UXProvider`** (`src/components/shared/ux-provider.tsx`): Keyboard shortcuts and command palette.
- **Feature-level state**: Each feature module manages its own UI state locally via `useState`/`useEffect`.
- **Service-backed state**: `useCandidateManagement` hook fetches from `CandidateService` and provides filters, sort, pagination, and selection.

---

## Type System

All TypeScript types are centralized in `src/types/`:

| File | Contents |
|------|----------|
| `internflow.ts` | Core domain types: `Stage`, `AppView`, `Page`, `Candidate`, `NavItem` |
| `auth.ts` | `AuthUser`, `AuthSession`, `LoginCredentials`, `AuthContextValue` |
| `prisma.ts` | Database-mapped types: `UserRole`, `PrismaCandidate`, `PrismaApplication`, etc. |
| `permissions.ts` | RBAC: `Permission`, `rolePermissions` record |
| `candidate-management.ts` | `CandidateFilterState`, `CandidateSortKey`, `ResumeRecord` |
| `mock-data.ts` | Mock data interfaces: `Recruiter`, `Department`, `College`, `Application`, etc. |
| `api.ts` | API response/request types |
| `query.ts` | Query parameter types |
| `rest.ts` | REST API types |

---

## Authentication

Authentication is **currently disabled** for development convenience. The system is fully scaffolded for re-enabling:

### Current State (Testing Mode)
- **`middleware.ts`**: Passes all requests through without auth checks
- **`auth-context.tsx`**: Hardcoded `MOCK_SESSION` with ADMIN role, `isAuthenticated: true`, `isLoading: false`
- **`protected-route.tsx`**: Pass-through wrapper
- **`internflow-app.tsx`**: Defaults to `app` mode (dashboard)

### Re-enabling Authentication
1. Restore `middleware.ts` to check `AUTH_COOKIE_NAME` cookie
2. Restore `auth-context.tsx` to read/write cookies via `auth-storage.ts`
3. Restore `protected-route.tsx` to redirect unauthenticated users to `/login`
4. Change `InternFlowApp` default back to `initialAppView="landing"`
5. The mock auth system supports three roles: `ADMIN`, `RECRUITER`, `VIEWER`

### Role-Based Access Control
Permissions defined in `src/types/permissions.ts`:
- **ADMIN**: Full access (read/write all resources)
- **RECRUITER**: Read/write candidates, applications, assessments, interviews; read offers, emails, reports, settings
- **VIEWER**: Read-only access

---

## Middleware

Located at [`middleware.ts`](middleware.ts), currently configured as pass-through. When re-enabled:

- Matches all routes except `_next/static`, `_next/image`, `favicon.ico`, and `api`
- Checks for `internflow_session` cookie
- Public routes (whitelisted): `/`, `/login`, `/onboarding`, `/403`
- Redirects unauthenticated users to `/login?redirect=<original_path>`

---

## Installation & Setup

### Prerequisites
- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### Install Dependencies
```bash
npm install
```

### Environment Variables
No environment variables are required for development. Create `.env.local` for production secrets:
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

---

## Development

### Start Dev Server
```bash
npm run dev
```
Runs on **http://localhost:3000** with hot module replacement.

### Type Checking
```bash
npx tsc --noEmit
```

### Linting
```bash
npm run lint
```

---

## Build & Deployment

### Production Build
```bash
npm run build
```
Outputs optimized standalone build to `.next/`.

### Start Production Server
```bash
npm start
```

### Build Configuration
- **`distDir`**: `.next` (Next.js default)
- **`output`**: `standalone` (self-contained deployment)
- **`outputFileTracingRoot`**: Project root for dependency tracing

---

## Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `next dev` | Start development server |
| `build` | `next build` | Create production build |
| `start` | `next start` | Start production server |
| `lint` | `next lint` | Run ESLint |

---

## Coding Standards

- **TypeScript strict mode** enabled (`"strict": true`)
- **Path aliases**: `@/*` maps to `./src/*`
- **Module resolution**: `bundler` mode
- **Component conventions**:
  - All components use `"use client"` directive
  - Feature modules export named functions (not default)
  - Props use inline type annotations
  - Shared icons imported from `lucide-react`
  - Tailwind utility classes for all styling
- **File naming**: `kebab-case` for files, `PascalCase` for components
- **Imports**: Absolute paths via `@/` alias, grouped: React → third-party → internal

---

## Performance Optimizations

- **Dynamic imports**: `InternFlowApp` loaded via `next/dynamic` with `ssr: false` on all page routes
- **Code splitting**: Each feature module is a separate chunk
- **Static generation**: All non-dynamic pages pre-rendered at build time
- **CSS**: Tailwind purges unused styles in production
- **Bundle**: First Load JS shared by all pages is ~102 kB

---

## Security

- **XSS**: React's built-in escaping prevents injection
- **CSRF**: Future Next.js API routes will use built-in CSRF protection
- **Auth cookies**: `SameSite=Lax`, `path=/`, 7-day expiry (when enabled)
- **Environment variables**: Sensitive values in `.env.local` (gitignored)
- **Input validation**: TypeScript strict mode catches type errors at compile time

---

## Testing

### Manual Testing
1. Run `npm run dev` and navigate to `http://localhost:3000`
2. Verify all 15+ routes load without errors
3. Test candidate search, filter, sort, and pagination
4. Test pipeline drag-and-drop
5. Test candidate profile tabs and actions
6. Verify charts render correctly

### Type Safety
```bash
npx tsc --noEmit   # Must exit with code 0
```

### Lint
```bash
npm run lint       # Must exit with code 0
```

### Build
```bash
npm run build      # Must compile all pages successfully
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `Module not found` errors | Run `npm install` |
| Build fails on type errors | Run `npx tsc --noEmit` to identify issues |
| Page not loading | Check dev server is running on port 3000 |
| Styles broken | Verify `tailwind.config.ts` content paths |
| Auth redirecting | Auth is bypassed; check `auth-context.tsx` for `MOCK_SESSION` |

---

## Contribution Guidelines

1. **Branch**: Create feature branches from `main`
2. **TypeScript**: Ensure `npx tsc --noEmit` passes before committing
3. **Lint**: Run `npm run lint` and fix all warnings
4. **Build**: Ensure `npm run build` succeeds
5. **Components**: Place new features in `src/features/<name>/`
6. **Shared UI**: Add reusable components to `src/components/shared/`
7. **Types**: Add new types to `src/types/` and import from `@/types`
8. **Services**: Add API service methods to `src/services/api/`
9. **Hooks**: Add custom hooks to `src/hooks/`
10. **Documentation**: Update this `README.md` when adding features

---

## Roadmap

### Phase 1 — Core Complete ✓
- [x] All 15+ pages with full UI
- [x] Feature module architecture
- [x] Mock data layer (100 candidates)
- [x] Charts and analytics
- [x] Candidate management (CRUD, search, filter, sort, pagination)
- [x] Pipeline with drag-and-drop
- [x] Assessment, interview, offer, email workflows
- [x] Settings and team management

### Phase 2 — Backend Integration
- [ ] Connect to real database (PostgreSQL via Prisma)
- [ ] Replace mock services with API calls
- [ ] Add server-side data validation
- [ ] Implement real authentication (NextAuth.js / Google OAuth)

### Phase 3 — Production Readiness
- [ ] Re-enable authentication and RBAC
- [ ] Add unit tests (Vitest + React Testing Library)
- [ ] Add E2E tests (Playwright)
- [ ] Implement rate limiting
- [ ] Add error monitoring (Sentry)
- [ ] Performance profiling and optimization

### Phase 4 — Advanced Features
- [ ] Real Google Forms/Sheets integration
- [ ] Email sending via SendGrid/Resend
- [ ] PDF generation for offer letters
- [ ] Real-time notifications (WebSocket)
- [ ] Calendar integration (Google Calendar, Outlook)
- [ ] AI-powered resume screening
- [ ] Multi-tenant SaaS support
