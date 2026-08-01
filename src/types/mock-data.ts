import type { Candidate, Stage } from "./internflow";

export interface Recruiter {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Recruiter" | "Viewer";
  department: string;
}

export interface Department {
  id: string;
  name: string;
}

export interface College {
  id: string;
  name: string;
  city: string;
}

export interface Application {
  id: string;
  candidateId: number;
  role: string;
  stage: Stage;
  appliedAt: string;
}

export interface AssessmentSubmission {
  id: string;
  candidateId: number;
  template: string;
  score: number;
  status: "Pending" | "Submitted" | "Approved" | "Rejected";
}

export interface InterviewSchedule {
  id: string;
  candidateId: number;
  date: string;
  time: string;
  platform: string;
  interviewer: string;
}

export interface OfferLetter {
  id: string;
  candidateId: number;
  role: string;
  status: "Draft" | "Sent" | "Accepted" | "Rejected";
}

export interface ReportMetric {
  label: string;
  value: string;
  delta: string;
}

export interface MockDataSet {
  candidates: Candidate[];
  recruiters: Recruiter[];
  departments: Department[];
  colleges: College[];
  applications: Application[];
  assessments: AssessmentSubmission[];
  interviews: InterviewSchedule[];
  offers: OfferLetter[];
  reports: ReportMetric[];
}
