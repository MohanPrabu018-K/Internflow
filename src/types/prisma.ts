export type PrismaId = string;
export type PrismaDate = string;

export type UserRole = "ADMIN" | "RECRUITER" | "VIEWER";

export interface PrismaUser {
  id: PrismaId;
  name: string;
  email: string;
  role: UserRole;
  createdAt: PrismaDate;
  updatedAt: PrismaDate;
}

export interface PrismaRecruiterProfile {
  id: PrismaId;
  userId: PrismaId;
  departmentId: PrismaId;
  title?: string | null;
}

export interface PrismaDepartment {
  id: PrismaId;
  name: string;
  slug: string;
  createdAt: PrismaDate;
  updatedAt: PrismaDate;
}

export interface PrismaCollege {
  id: PrismaId;
  name: string;
  city?: string | null;
  state?: string | null;
  createdAt: PrismaDate;
  updatedAt: PrismaDate;
}

export interface PrismaCandidate {
  id: PrismaId;
  name: string;
  email: string;
  phone?: string | null;
  collegeId: PrismaId;
  departmentId: PrismaId;
  year?: string | null;
  cgpa?: number | null;
  portfolioUrl?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  notes?: string | null;
  createdAt: PrismaDate;
  updatedAt: PrismaDate;
}

export interface PrismaApplication {
  id: PrismaId;
  candidateId: PrismaId;
  role: string;
  stage: string;
  appliedAt: PrismaDate;
  updatedAt: PrismaDate;
}

export interface PrismaAssessment {
  id: PrismaId;
  candidateId: PrismaId;
  templateName: string;
  score?: number | null;
  status: string;
  deadline?: PrismaDate | null;
  createdAt: PrismaDate;
  updatedAt: PrismaDate;
}

export interface PrismaInterview {
  id: PrismaId;
  candidateId: PrismaId;
  interviewerId: PrismaId;
  scheduledAt: PrismaDate;
  platform: string;
  meetingLink?: string | null;
  status: string;
  createdAt: PrismaDate;
  updatedAt: PrismaDate;
}

export interface PrismaOffer {
  id: PrismaId;
  candidateId: PrismaId;
  templateName: string;
  status: string;
  startDate?: PrismaDate | null;
  stipend?: number | null;
  createdAt: PrismaDate;
  updatedAt: PrismaDate;
}

export interface PrismaEmailLog {
  id: PrismaId;
  to: string;
  subject: string;
  templateName?: string | null;
  status: string;
  sentAt?: PrismaDate | null;
  createdAt: PrismaDate;
  updatedAt: PrismaDate;
}

export interface PrismaReportSnapshot {
  id: PrismaId;
  label: string;
  payload: Record<string, unknown>;
  createdAt: PrismaDate;
  updatedAt: PrismaDate;
}

export interface PrismaSetting {
  id: PrismaId;
  key: string;
  value: string;
  createdAt: PrismaDate;
  updatedAt: PrismaDate;
}
