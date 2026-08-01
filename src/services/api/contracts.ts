import type {
  PrismaAssessment,
  PrismaApplication,
  PrismaCandidate,
  PrismaCollege,
  PrismaDepartment,
  PrismaEmailLog,
  PrismaInterview,
  PrismaOffer,
  PrismaReportSnapshot,
  PrismaSetting,
  PrismaUser,
} from "@/types/prisma";
import type { PaginatedResponse } from "@/types/query";

export interface BackendContract {
  auth: {
    user: PrismaUser;
  };
  candidates: PaginatedResponse<PrismaCandidate>;
  applications: PaginatedResponse<PrismaApplication>;
  assessments: PaginatedResponse<PrismaAssessment>;
  interviews: PaginatedResponse<PrismaInterview>;
  offers: PaginatedResponse<PrismaOffer>;
  emails: PaginatedResponse<PrismaEmailLog>;
  reports: PrismaReportSnapshot;
  settings: PrismaSetting;
  departments: PaginatedResponse<PrismaDepartment>;
  colleges: PaginatedResponse<PrismaCollege>;
}
