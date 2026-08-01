# InternFlow AI — Execution Plan (15 Phases, Bottom-Up)

> Ordered to minimize rework: foundation → core → intelligence → portals → enterprise → deploy.

---

## 📦 PHASE 1 — Production Foundation

**Goal:** Upgrade the project skeleton for enterprise scale before adding features.

| Action | Files |
|--------|-------|
| Add npm packages | `zustand`, `@tanstack/react-query`, `zod`, `react-hook-form`, `date-fns`, `jspdf`, `qrcode`, `@monaco-editor/react` |
| Create AI type system | `src/types/ai.ts` — all AI interfaces (ResumeMatchScore, ParsedResume, CopilotQuery, AssessmentTemplate, CodingChallenge, VideoInterviewScore, ChatbotSession, SkillBadge, TalentPoolEntry, DuplicateReport, JobDescription, LeaderboardEntry, RecruiterMetrics, etc.) |
| Extend Candidate type | `src/types/internflow.ts` — add `aiScore`, `resumeData`, `skillBadges`, `chatbotData`, `videoScore`, `codingResults`, `onboardingStatus`, `referralCode` |
| Global store | `src/store/app-store.ts` — Zustand store: `aiPanel`, `copilotOpen`, `notifications`, `theme`, `sidebarCollapsed` |
| Query provider | Add `@tanstack/react-query` provider in `layout.tsx` |
| Error boundary | `src/components/shared/error-boundary.tsx` |
| Dark mode support | Tailwind `darkMode: "class"`, theme toggle in `app-shell.tsx` |
| Responsive audit | Make Sidebar collapsible on mobile, add hamburger menu |

**No new routes. No visual changes (except dark mode).**

---

## 📦 PHASE 2 — Core ATS Enhancement

**Goal:** Solidify the existing ATS workflows before adding AI.

| Action | Files |
|--------|-------|
| `react-hook-form` + `zod` integration | `src/features/candidates/candidates-view.tsx` — validated forms for add/edit candidate |
| Form validation schemas | `src/lib/validation-schemas.ts` — Zod schemas for Candidate, Offer, Assessment, Interview |
| Bulk operations | Mass stage move, mass email, mass archive in candidates view |
| Pipeline enhancements | Undo drag-drop, stage transition history, stage SLA indicators |
| Candidate timeline | Enrich with real events from services |
| `package.json` scripts | Add `"type-check"`, `"test"`, `"test:watch"` |

**Enhances existing UX without AI.**

---

## 📦 PHASE 3 — Resume Intelligence

**Goal:** AI-powered resume screening + parsing engine.

| New Files | Purpose |
|-----------|---------|
| `src/services/ai/resume-screening.service.ts` | Mock AI: scores resume against role requirements |
| `src/services/ai/resume-parser.service.ts` | Mock parser: extracts name, email, phone, college, CGPA, skills, projects, certifications, experience |
| `src/services/ai/skill-badges.service.ts` | Auto-assigns badges: "React Expert", "Python Developer", "Fast Learner", etc. |
| `src/features/candidate/ai-resume-screen.tsx` | Upload → parse → score panel |
| `src/features/candidate/resume-match-card.tsx` | Score breakdown card (skills 40%, education 20%, experience 25%, fit 15%) |
| `src/components/shared/ai-score-badge.tsx` | Visual score badge: green/yellow/red |

| Enhanced | Change |
|----------|--------|
| `src/features/candidate/candidate-profile-view.tsx` | Add "AI Analysis" tab with parsed resume + match score + badges |

---

## 📦 PHASE 4 — AI Recruiter Copilot

**Goal:** Natural language query interface for recruiters.

| New Files | Purpose |
|-----------|---------|
| `src/services/ai/recruiter-copilot.service.ts` | Parses NL → structured filters, returns ranked results |
| `src/features/copilot/copilot-panel.tsx` | Slide-in chat panel with input + results |
| `src/features/copilot/copilot-results.tsx` | Ranked candidate cards with explanations |

| Enhanced | Change |
|----------|--------|
| `src/components/layouts/app-shell.tsx` | Add Copilot button (sparkle icon) in TopNav |
| `src/features/internflow/internflow-app.tsx` | Add `copilotOpen` state, render CopilotPanel |

**Queries supported:** "Show React candidates with CGPA > 8", "Recommend top 5 for interview today", "Find Python developers rejected earlier", "Best candidates for Backend role"

---

## 📦 PHASE 5 — AI Assessment & Live Coding

**Goal:** AI-generated assessments + live coding IDE.

### 5A — AI Assessment Generator

| New Files | Purpose |
|-----------|---------|
| `src/services/ai/assessment-generator.service.ts` | Generates MCQs, coding, SQL, aptitude, technical questions by role |
| `src/features/assessments/assessment-generator.tsx` | Role + type + difficulty + count → generate |
| `src/features/assessments/question-card.tsx` | Individual question with options/answer/explanation |

| Enhanced | Change |
|----------|--------|
| `src/features/assessments/assessments-view.tsx` | Add "Generate with AI" button |

### 5B — Live Coding Platform

| New Files | Purpose |
|-----------|---------|
| `src/features/coding/coding-platform.tsx` | Full-page IDE (Monaco) |
| `src/features/coding/problem-statement.tsx` | Left pane: challenge description |
| `src/features/coding/code-editor.tsx` | Right pane: Monaco editor |
| `src/features/coding/test-results.tsx` | Pass/fail test case results |
| `src/services/ai/coding-evaluator.service.ts` | Mock execution + plagiarism + scoring |

| New Route | `/coding/[challengeId]` |

---

## 📦 PHASE 6 — AI Interview Suite

**Goal:** Video interview analysis + smart scheduler.

### 6A — AI Video Interview

| New Files | Purpose |
|-----------|---------|
| `src/services/ai/video-interview.service.ts` | Mock analysis: communication, confidence, clarity, grammar, eye contact, speed, overall |
| `src/features/video-interview/video-recorder.tsx` | Mock recording interface |
| `src/features/video-interview/ai-analysis-panel.tsx` | Radar chart + scores + insights |

| New Route | `/video-interview/[sessionId]` |

### 6B — Smart Interview Scheduler

| New Files | Purpose |
|-----------|---------|
| `src/features/scheduler/scheduler-calendar.tsx` | Calendar grid + slot picker |
| `src/features/scheduler/availability-grid.tsx` | Interviewer availability view |
| `src/services/api/calendar.service.ts` | Mock Google/Outlook calendar integration |

| Enhanced | Change |
|----------|--------|
| `src/features/interviews/interviews-view.tsx` | "Smart Schedule" button → opens scheduler |

---

## 📦 PHASE 7 — Communication Hub

**Goal:** Unified multi-channel communication.

| New Files | Purpose |
|-----------|---------|
| `src/services/api/communication.service.ts` | Email + WhatsApp mock + SMS mock |
| `src/features/communications/communication-center.tsx` | Unified hub: email + WhatsApp + SMS |
| `src/features/communications/notification-center.tsx` | Bell icon dropdown with notification history |
| `src/features/communications/notification-log.tsx` | Full sent history |

| Enhanced | Change |
|----------|--------|
| `src/components/layouts/app-shell.tsx` | Replace static bell icon with live NotificationCenter |
| `src/features/emails/emails-view.tsx` | Add WhatsApp/SMS templates |

---

## 📦 PHASE 8 — Candidate Portal

**Goal:** Self-service portal for applicants.

| New Files | Purpose |
|-----------|---------|
| `src/features/portal/candidate-portal-app.tsx` | Portal orchestrator |
| `src/features/portal/application-tracker.tsx` | Status timeline with progress |
| `src/features/portal/offer-acceptance.tsx` | View + accept/reject offer |
| `src/features/portal/assessment-taker.tsx` | Take assessments in-portal |
| `src/features/chatbot/chatbot-widget.tsx` | Floating AI chatbot for candidate queries |
| `src/features/chatbot/chat-message.tsx` | Message bubble |
| `src/services/ai/chatbot.service.ts` | Mock: collects availability, stipend, location, notice period |
| `src/components/layouts/portal-layout.tsx` | Portal-specific layout |

| New Routes | `/portal/login`, `/portal/dashboard`, `/portal/application`, `/portal/assessments`, `/portal/interviews`, `/portal/offers`, `/portal/profile` |

---

## 📦 PHASE 9 — Talent Intelligence

**Goal:** Talent pool, duplicate detection, candidate ranking.

| New Files | Purpose |
|-----------|---------|
| `src/services/ai/duplicate-detector.service.ts` | Email/phone/resume similarity matching |
| `src/services/ai/candidate-ranking.service.ts` | Multi-factor ranking algorithm |
| `src/features/talent-pool/talent-pool-view.tsx` | Archived + reusable candidates |
| `src/features/talent-pool/duplicate-alert.tsx` | Inline duplicate warning banner |
| `src/features/reports/candidate-leaderboard.tsx` | Ranked by AI composite score |

| New Routes | `/talent-pool`, `/leaderboard` |

---

## 📦 PHASE 10 — HR Intelligence

**Goal:** Enhanced analytics + recruiter performance.

| New Files | Purpose |
|-----------|---------|
| `src/features/reports/recruiter-dashboard.tsx` | Per-recruiter metrics + charts |
| `src/features/reports/ai-insights-panel.tsx` | AI-generated hiring insights |

| Enhanced | Change |
|----------|--------|
| `src/features/reports/reports-view.tsx` | Add funnel analysis, time-to-hire, source analytics, college analytics, predictive hiring, AI insights tab |

---

## 📦 PHASE 11 — Employee Onboarding

**Goal:** Digital onboarding + certificates + referrals.

| New Files | Purpose |
|-----------|---------|
| `src/features/onboarding-employee/onboarding-checklist.tsx` | Step-by-step checklist |
| `src/features/onboarding-employee/document-upload.tsx` | ID, education docs (mock) |
| `src/features/onboarding-employee/certificate-generator.tsx` | PDF certificate + QR code |
| `src/features/referral/referral-form.tsx` | Employee referral submission |
| `src/features/referral/referral-tracker.tsx` | Status + bonus tracking |
| `src/services/api/onboarding.service.ts` | Onboarding operations |
| `src/services/api/referral.service.ts` | Referral operations |

| New Routes | `/onboarding-employee`, `/referrals` |

---

## 📦 PHASE 12 — Hiring Automation

**Goal:** JD generator + multi-platform posting.

| New Files | Purpose |
|-----------|---------|
| `src/services/ai/job-description.service.ts` | AI JD generation by role/skills |
| `src/features/jobs/job-description-generator.tsx` | Input → generate → edit JD |
| `src/features/jobs/job-posting-dashboard.tsx` | Multi-platform posting mock |

| New Routes | `/jobs/create`, `/jobs/manage` |

---

## 📦 PHASE 13 — Enterprise Features

**Goal:** Production-grade infrastructure.

| Action | Details |
|--------|---------|
| Route groups | `src/app/(recruiter)/` and `src/app/(candidate)/` grouping |
| Loading states | `loading.tsx` skeletons for every route |
| Error boundaries | Wrap each feature module |
| Accessibility | ARIA labels, keyboard nav, focus management |
| API rate limiting mock | `src/lib/rate-limit.ts` |
| Audit log service | `src/services/api/audit-log.service.ts` |
| Activity timeline | `src/features/settings/activity-log.tsx` |

---

## 📦 PHASE 14 — Quality & Performance

| Action | Details |
|--------|---------|
| `React.memo` | Wrap StatCard, CandidateCard, StageBadge, AvatarCircle |
| Bundle analysis | `@next/bundle-analyzer` setup |
| Image optimization | `next/image` for any static assets |
| CSS audit | Remove unused Tailwind classes |
| `vitest` setup | `vitest.config.ts`, sample tests for services |
| `@testing-library/react` | Component render tests for CandidateProfileView, LoginForm |
| Lint all | `npm run lint` — fix warnings |
| Type check | `npx tsc --noEmit` — must be 0 errors |

---

## 📦 PHASE 15 — Production Deployment

| Action | Details |
|--------|---------|
| Full build | `npm run build` — verify 30+ routes compile |
| Final README | Update with AI architecture, new routes, deployment guide |
| `.env.example` | Template for production env vars |
| Dockerfile | Optional: `Dockerfile` for containerized deployment |
| `vercel.json` / `next.config.ts` | Production config review |

---

## 📊 Summary

| Metric | Count |
|--------|-------|
| New feature modules | 20+ |
| New routes | 16 |
| New files | ~70 |
| Modified files | ~20 |
| New npm packages | 8 |
| New AI services | 10 |
| Enhancement of existing features | 12 |

## 🔗 Dependency Flow

```
Phase 1 ───────────────────────────────────────────────────────────── (no deps)
  │
  ├─ Phase 2 (Core ATS) ─────────────── depends on Phase 1
  │
  ├─ Phase 3 (Resume Intelligence) ─── depends on Phase 1
  │    └─ Phase 4 (Copilot) ────────── depends on Phase 3
  │
  ├─ Phase 5 (Assessment+Coding) ───── depends on Phase 1
  ├─ Phase 6 (Interview Suite) ──────── depends on Phase 1
  ├─ Phase 7 (Communication Hub) ────── depends on Phase 1
  │
  ├─ Phase 8 (Candidate Portal) ────── depends on Phase 3,5,6,7
  │
  ├─ Phase 9 (Talent Intelligence) ─── depends on Phase 3,4
  ├─ Phase 10 (HR Intelligence) ────── depends on Phase 3,4,5,6
  ├─ Phase 11 (Onboarding) ─────────── depends on Phase 3
  ├─ Phase 12 (Hiring Automation) ──── depends on Phase 1
  │
  └─ Phase 13 (Enterprise) ─────────── depends on ALL above
       └─ Phase 14 (Quality) ────────── depends on Phase 13
            └─ Phase 15 (Deploy) ────── final step
```
