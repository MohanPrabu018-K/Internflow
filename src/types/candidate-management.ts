import type { Candidate, Stage } from "./internflow";

export interface CandidateFilterState {
  search: string;
  department: string;
  college: string;
  stage: Stage | "All";
  year: string;
  cgpa: string;
  experience: string;
  sortBy: CandidateSortKey;
  sortOrder: "asc" | "desc";
  page: number;
  pageSize: number;
}

export type CandidateSortKey =
  | "name"
  | "email"
  | "college"
  | "role"
  | "stage"
  | "rating"
  | "appliedDate";

export interface CandidateTimelineEvent {
  event: string;
  date: string;
  status?: "completed" | "current" | "pending";
}

export interface ResumeRecord {
  fileName: string;
  sizeLabel: string;
  uploadedAt: string;
  mimeType: string;
  previewUrl?: string;
}

export interface CandidateModuleState {
  candidates: Candidate[];
  total: number;
  loading: boolean;
  error: string | null;
}
