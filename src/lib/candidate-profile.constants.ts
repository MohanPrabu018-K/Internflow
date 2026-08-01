import type { Stage } from "@/types/internflow";

export const CANDIDATE_PROFILE_TABS = ["overview", "resume", "assessments", "timeline", "ai-analysis"] as const;

export const CANDIDATE_RATING_BREAKDOWN = [
  { label: "Technical Skills", val: 88 },
  { label: "Communication", val: 75 },
  { label: "Problem Solving", val: 90 },
];

export const CANDIDATE_TIMELINE_TEMPLATE = [
  { event: "Application Submitted", date: "", status: "completed" as const },
  { event: "Resume Uploaded", date: "", status: "completed" as const },
  { event: "Resume Approved", date: "", status: "pending" as const },
  { event: "Assessment Assigned", date: "", status: "pending" as const },
  { event: "Assessment Submitted", date: "", status: "pending" as const },
  { event: "Interview Scheduled", date: "", status: "pending" as const },
  { event: "Interview Completed", date: "", status: "pending" as const },
  { event: "Offer Generated", date: "", status: "pending" as const },
  { event: "Offer Accepted", date: "", status: "pending" as const },
  { event: "Joined", date: "", status: "pending" as const },
];

export const CANDIDATE_STAGE_SEQUENCE: Stage[] = ["New", "Screening", "Assessment", "Interview", "Selected", "Offer Sent", "Joined"];
