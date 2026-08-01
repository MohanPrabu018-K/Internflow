# InternFlow AI — Complete Bug & Issue Report

**Audit Method:** Full code audit of all 22 route pages, 18 feature modules, 11 AI services, 16 API services, all layouts, auth, middleware, and shared components. TypeScript compiles clean (0 errors) but several **runtime/logic bugs** exist.

---

## 🔴 CRITICAL BUGS (Will Cause Runtime Errors)

| # | File | Line | Bug | Impact |
|---|------|------|-----|--------|
| **B1** | `src/features/coding/coding-platform.tsx` | 16-22 | `useState(() => { ... })` used as initialization function — fires on **every render**, causing infinite API calls to `CodingEvaluatorService.getChallenge()`. Should use `useEffect(() => {...}, [challengeId])`. | Infinite re-renders, API spam, performance crash |
| **B2** | `src/app/page.tsx` | 1-18 | `InternFlowApp` defaults to `initialAppView="app"` (line 40 of internflow-app.tsx). The root `/` page renders `InternFlowApp` without passing `initialAppView="landing"`. Result: **users see the dashboard at `/` instead of the landing page.** | Landing page inaccessible from `/` |
| **B3** | `src/app/login/page.tsx` | 1-14 | LoginForm reads `isAuthenticated` from auth-context which always returns `true` (mock session). LoginForm immediately redirects to dashboard on line 44-45. **Login page flashes and redirects — unusable for testing.** | Login page broken |

---

## 🟠 MAJOR BUGS (Dead Buttons / Non-functional UI)

| # | Location | Button | Issue |
|---|----------|--------|-------|
| **B4** | `app-shell.tsx:151` | **"Add Candidate"** button | No `onClick` handler. Clicking does nothing. |
| **B5** | `app-shell.tsx:137` | **Notifications bell** | No `onClick` handler. Clicking does nothing. |
| **B6** | `app-shell.tsx:128` | **TopNav search input** | No `onChange` handler. Typing in search does nothing. |
| **B7** | `pipeline-view.tsx:34` | **Pipeline filter buttons** ("Frontend", "Backend", "AI/ML", "Design", "HR") | No `onClick` handler. Clicking does nothing. |
| **B8** | `pipeline-view.tsx:37` | **"Filters" button** | No `onClick` handler. Clicking does nothing. |
| **B9** | `dashboard-view.tsx:91` | **Dashboard month selector** `<select>` | No `onChange` handler. Selecting a month does nothing. |
| **B10** | `candidates-view.tsx:87` | **"Filters" button** | No `onClick` handler. |
| **B11** | `candidates-view.tsx:88` | **"Export" button** | No `onClick` handler. |
| **B12** | `candidates-view.tsx:95` | **"Approve", "Reject", "Move Stage", "Export"** bulk action buttons | No `onClick` handlers. |
| **B13** | `candidate-profile-view.tsx:384-420` | **"Approve Resume", "Reject Resume", "Assign Assessment", "Schedule Interview", "Generate Offer Letter"** | These call `saveStage()` which works, but the Archive button calls `CandidateService.updateCandidate` directly — inconsistent. |
| **B14** | `assessments-view.tsx:55` | **"Edit" assessment button** | No `onClick` handler. |
| **B15** | `assessments-view.tsx:56` | **"Send to Candidates"** button | No `onClick` handler. |
| **B16** | `emails-view.tsx:53` | **"Preview"** button | No `onClick` handler. |
| **B17** | `emails-view.tsx:54` | **"Send Email"** button | No `onClick` handler. |
| **B18** | `offers-view.tsx:36` | **"Duplicate"** button | No `onClick` handler. |
| **B19** | `offers-view.tsx:37` | **"Generate PDF"** button | No `onClick` handler. |
| **B20** | `offers-view.tsx:38` | **"Send via Email"** button | No `onClick` handler. |
| **B21** | `interviews-view.tsx:46` | **"Reschedule"** button | No `onClick` handler. |
| **B22** | `interviews-view.tsx:47` | **"Send Invite"** button | No `onClick` handler. |
| **B23** | `app-shell.tsx:92` | **Sidebar "Logout"** button | Calls `logout()` which sets `MOCK_SESSION` again (keeps user logged in). |
| **B24** | `settings-view.tsx:45` | **"Save Changes"** button | No `onClick` handler. |
| **B25** | `settings-view.tsx:31` | **"Upload Logo"** button | No `onClick` handler. |
| **B26** | `settings-view.tsx:58` | **"Invite Member"** button | No `onClick` handler. |

---

## 🟡 MEDIUM BUGS (Logic / UX Issues)

| # | File | Issue |
|---|------|-------|
| **B27** | `app-shell.tsx:58` | Sidebar header "InternFlow" text missing `dark:text-slate-100` class. |
| **B28** | `app-shell.tsx:84` | Sidebar user name/password missing `dark:` color classes. |
| **B29** | All feature views | No `dark:` classes — dark mode only works in shell (sidebar+topnav), content stays light. |
| **B30** | `profile/page.tsx` | Missing `ProtectedRoute` wrapper. |
| **B31** | `portal/login/page.tsx` | Candidate Portal login has no auth protection — but should be public. OK as-is. |
| **B32** | `candidate-portal-app.tsx` | Email-based "login" finds candidates by email from `CANDIDATES` — works but is mock-only. |
| **B33** | `scheduler/page.tsx` | `candidateId={1}` hardcoded — cannot schedule for other candidates. |
| **B34** | `video-interview/[sessionId]/page.tsx` | `sessionId` passed as string but `VideoInterviewService.analyzeInterview()` doesn't use it meaningfully. |

---

## 🔵 LOW / COSMETIC ISSUES

| # | File | Issue |
|---|------|-------|
| **B35** | `internflow-app.tsx:135` | CopilotPanel `onCandidateClick` searches `CANDIDATES` constant (100 items) to find candidate by ID — O(n) search on every click. |
| **B36** | `login/page.tsx` | LoginForm wrapped in `<Suspense>` but LoginForm uses `useSearchParams()` which requires Suspense boundary — correct usage. |
| **B37** | `candidate-profile-view.tsx:58` | `useEffect` auto-saves notes every 600ms on change — could cause unnecessary API calls. |
| **B38** | `next.config.ts` | `distDir: ".next"` is default — redundant but harmless. |

---

## 📊 SUMMARY

| Severity | Count | Fixed? |
|----------|-------|--------|
| 🔴 Critical | 3 | ❌ |
| 🟠 Major (Dead Buttons) | 23 | ❌ |
| 🟡 Medium (UX/Logic) | 8 | ❌ |
| 🔵 Low/Cosmetic | 4 | ❌ |
| **Total** | **38** | — |

### Top 3 Must-Fix:
1. **B1** — Coding platform infinite re-renders (useState misuse)
2. **B2** — `/` shows dashboard instead of landing page
3. **B3** — Login page immediately redirects (auth always true)

### Next Priority:
- **B4-B26**: 23 dead buttons across all views — add onClick handlers or connect to services
- **B27-B29**: Dark mode incomplete — add `dark:` classes to feature views
- **B30**: Profile page missing ProtectedRoute
