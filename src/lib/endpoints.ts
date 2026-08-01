export const apiEndpoints = {
  auth: {
    login: "/api/auth/login",
    logout: "/api/auth/logout",
    me: "/api/auth/me",
    refresh: "/api/auth/refresh",
  },
  candidates: {
    list: "/api/candidates",
    byId: (id: string) => `/api/candidates/${id}`,
  },
  applications: {
    list: "/api/applications",
    byId: (id: string) => `/api/applications/${id}`,
  },
  assessments: {
    list: "/api/assessments",
    byId: (id: string) => `/api/assessments/${id}`,
  },
  interviews: {
    list: "/api/interviews",
    byId: (id: string) => `/api/interviews/${id}`,
  },
  offers: {
    list: "/api/offers",
    byId: (id: string) => `/api/offers/${id}`,
  },
  emails: {
    list: "/api/emails",
    byId: (id: string) => `/api/emails/${id}`,
  },
  reports: {
    summary: "/api/reports/summary",
    funnel: "/api/reports/funnel",
  },
  settings: {
    get: "/api/settings",
    update: "/api/settings",
  },
} as const;
