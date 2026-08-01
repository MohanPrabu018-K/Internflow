import type { ElementType } from "react";

export type Stage = "New" | "Screening" | "Assessment" | "Interview" | "Selected" | "Offer Sent" | "Joined";
export type AppView = "landing" | "onboarding" | "app";
export type Page =
  | "dashboard"
  | "pipeline"
  | "candidates"
  | "candidate-profile"
  | "assessments"
  | "interviews"
  | "offer-letters"
  | "emails"
  | "reports"
  | "settings";

import type { ParsedResume, ResumeAnalysis, SkillBadge, ChatbotCollectedInfo, CodeEvaluation, OnboardingTask } from "./ai";

export interface Candidate {
  id: number;
  name: string;
  initials: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  role: string;
  stage: Stage;
  rating: number;
  cgpa: number;
  year: string;
  appliedDate: string;
  location: string;
  github: string;
  linkedin: string;
  skills: string[];
  color: string;
  recruiter: string;
  assignedRecruiter?: string;
  experience: string;
  projects?: string[];
  portfolio?: string;
  resumeFileName?: string;
  resumeUploadedAt?: string;
  resumeMimeType?: string;
  resumePreviewUrl?: string;
  recruiterNotes?: string;
  internalNotes?: string;
  averageRating?: number;
  archived?: boolean;
  notes: string;
  timeline?: Array<{
    event: string;
    date: string;
    status?: "completed" | "current" | "pending";
  }>;
  // ─── AI Fields ──────────────────────────────────────────
  parsedResume?: ParsedResume;
  resumeAnalysis?: ResumeAnalysis;
  skillBadges?: SkillBadge[];
  chatbotData?: ChatbotCollectedInfo;
  codingResults?: CodeEvaluation[];
  onboardingStatus?: OnboardingTask[];
  referralCode?: string;
  aiTotalScore?: number;
}

export interface NavItem {
  id: Page;
  label: string;
  icon: ElementType;
}
