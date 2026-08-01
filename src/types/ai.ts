// ─── AI Type System ───────────────────────────────────────────────────────────
// All AI-related interfaces, types, and enums for InternFlow AI features.

// ─── Resume Screening ────────────────────────────────────────────────────────

export type AIRecommendation =
  | "Highly Recommended"
  | "Recommended"
  | "Average"
  | "Not Recommended";

export interface ResumeMatchScore {
  overall: number; // 0-100
  skillsMatch: number; // 0-100 (%)
  educationMatch: number; // 0-100 (%)
  experienceMatch: number; // 0-100 (%)
  overallFit: number; // 0-100 (%)
}

export interface MissingSkill {
  name: string;
  importance: "critical" | "nice-to-have";
}

export interface ResumeAnalysis {
  matchScore: ResumeMatchScore;
  recommendation: AIRecommendation;
  matchingSkills: string[];
  missingSkills: MissingSkill[];
  strengths: string[];
  weaknesses: string[];
  summary: string;
}

// ─── Resume Parser ───────────────────────────────────────────────────────────

export interface ParsedResume {
  name: string;
  email: string;
  phone: string;
  college: string;
  cgpa: number | null;
  skills: string[];
  projects: string[];
  certifications: string[];
  experience: ParsedExperience[];
  education: ParsedEducation[];
  parsedAt: string; // ISO date
}

export interface ParsedExperience {
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface ParsedEducation {
  institution: string;
  degree: string;
  year: string;
  cgpa: number | null;
}

// ─── Recruiter Copilot ───────────────────────────────────────────────────────

export interface CopilotQuery {
  naturalLanguage: string;
  parsed: CopilotParsedQuery;
}

export interface CopilotParsedQuery {
  intent: "search" | "recommend" | "filter" | "rank" | "analyze";
  filters: CopilotFilter[];
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  limit?: number;
}

export interface CopilotFilter {
  field: string;
  operator: "equals" | "contains" | "gt" | "lt" | "gte" | "lte" | "in";
  value: string | number | string[];
}

export interface CopilotResult {
  candidates: CopilotCandidate[];
  explanation: string;
  totalMatches: number;
  queryTime: string;
}

export interface CopilotCandidate {
  id: number;
  name: string;
  role: string;
  matchReason: string;
  score: number;
}

export interface CopilotSession {
  id: string;
  queries: Array<{ query: string; timestamp: string }>;
  createdAt: string;
}

// ─── Assessment Generator ────────────────────────────────────────────────────

export type AssessmentType = "MCQ" | "Coding" | "SQL" | "Aptitude" | "Technical";
export type Difficulty = "Easy" | "Medium" | "Hard";

export interface AssessmentTemplate {
  id: string;
  role: string;
  type: AssessmentType;
  difficulty: Difficulty;
  title: string;
  timeLimit: number; // minutes
  questions: AssessmentQuestion[];
  generatedAt: string;
}

export interface AssessmentQuestion {
  id: string;
  text: string;
  options?: string[]; // for MCQ
  correctAnswer?: string;
  explanation: string;
  points: number;
  testCases?: CodeTestCase[]; // for Coding
  starterCode?: string; // for Coding
}

// ─── Coding Challenge ────────────────────────────────────────────────────────

export interface CodingChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  languages: CodeLanguage[];
  starterCode: Record<CodeLanguage, string>;
  testCases: CodeTestCase[];
  timeLimit: number; // minutes
  constraints: string[];
}

export type CodeLanguage = "javascript" | "typescript" | "python" | "java" | "cpp";

export interface CodeTestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export interface CodeSubmission {
  challengeId: string;
  language: CodeLanguage;
  code: string;
  submittedAt: string;
}

export interface CodeEvaluation {
  passed: boolean;
  score: number; // 0-100
  testResults: TestResult[];
  executionTime: number; // ms
  plagiarismScore: number; // 0-100
  feedback: string;
}

export interface TestResult {
  testCaseId: string;
  passed: boolean;
  input: string;
  expected: string;
  actual: string;
  executionTime: number; // ms
}

// ─── AI Chatbot ──────────────────────────────────────────────────────────────

export interface ChatbotSession {
  id: string;
  candidateId: number;
  messages: ChatMessage[];
  collectedInfo: ChatbotCollectedInfo;
  status: "active" | "completed";
  createdAt: string;
}

export interface ChatMessage {
  role: "bot" | "user";
  text: string;
  timestamp: string;
}

export interface ChatbotCollectedInfo {
  availability: string;
  expectedStipend: string;
  preferredLocation: string;
  noticePeriod: string;
  communicationLevel: string;
  portfolioLinks: string[];
}

// ─── Skill Badges ────────────────────────────────────────────────────────────

export type SkillBadgeName =
  | "React Expert"
  | "Python Developer"
  | "TypeScript Pro"
  | "Full Stack Developer"
  | "AI/ML Enthusiast"
  | "Fast Learner"
  | "Team Player"
  | "Problem Solver"
  | "Communication Expert"
  | "Database Expert"
  | "DevOps Ready"
  | "Cloud Practitioner"
  | "UI/UX Specialist"
  | "Data Analyst";

export type SkillBadgeCategory = "technical" | "soft" | "domain";

export interface SkillBadge {
  name: SkillBadgeName;
  category: SkillBadgeCategory;
  earnedAt: string;
  description: string;
  icon: string;
  color: string;
}

// ─── Talent Pool ─────────────────────────────────────────────────────────────

export interface TalentPoolEntry {
  candidateId: number;
  name: string;
  email: string;
  skills: string[];
  experience: string;
  lastStage: string;
  lastRating: number;
  archivedAt: string;
  tags: string[];
  aiRelevanceScore?: number;
}

export interface TalentPoolSearch {
  query: string;
  skills?: string[];
  experience?: string;
  minRating?: number;
}

// ─── Duplicate Detection ─────────────────────────────────────────────────────

export interface DuplicateReport {
  candidateA: number;
  candidateB: number;
  matchFields: string[];
  similarityScore: number; // 0-100
  isDuplicate: boolean;
  details: string;
}

// ─── Job Description ─────────────────────────────────────────────────────────

export interface JobDescription {
  id: string;
  title: string;
  department: string;
  skills: string[];
  experience: string;
  stipend: string;
  location: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  generatedAt: string;
  postedOn?: JobPlatform[];
}

export type JobPlatform = "LinkedIn" | "Naukri" | "Indeed" | "Internshala" | "Company Career Page";

export interface JobPostingStatus {
  platform: JobPlatform;
  status: "draft" | "published" | "closed";
  postedAt?: string;
  applicationCount: number;
}

// ─── Candidate Ranking ───────────────────────────────────────────────────────

export interface CandidateLeaderboardEntry {
  rank: number;
  candidateId: number;
  name: string;
  role: string;
  resumeScore: number;
  assessmentScore: number;
  interviewScore: number;
  codingScore: number;
  totalScore: number;
  trend: "up" | "down" | "stable";
}

// ─── Recruiter Metrics ───────────────────────────────────────────────────────

export interface RecruiterMetrics {
  recruiterId: string;
  name: string;
  interviewsConducted: number;
  candidatesHired: number;
  responseTimeAvg: number; // hours
  conversionRate: number; // %
  averageRating: number;
  monthlyStats: RecruiterMonthlyStat[];
}

export interface RecruiterMonthlyStat {
  month: string;
  interviews: number;
  hires: number;
  responseTime: number;
}

// ─── Onboarding ──────────────────────────────────────────────────────────────

export interface OnboardingTask {
  id: string;
  label: string;
  status: "pending" | "in-progress" | "completed";
  required: boolean;
  category: "document" | "form" | "policy" | "asset" | "training";
}

export interface EmployeeCertificate {
  id: string;
  candidateName: string;
  role: string;
  duration: string;
  issueDate: string;
  certificateId: string;
  qrCodeData: string;
}

// ─── Referral ────────────────────────────────────────────────────────────────

export interface Referral {
  id: string;
  referrerId: string;
  referrerName: string;
  candidateName: string;
  candidateEmail: string;
  role: string;
  status: "submitted" | "reviewed" | "interviewed" | "hired" | "rejected";
  bonus: number;
  createdAt: string;
}

// ─── Communication ───────────────────────────────────────────────────────────

export type CommunicationChannel = "email" | "whatsapp" | "sms";

export interface Communication {
  id: string;
  channel: CommunicationChannel;
  recipient: string;
  template: string;
  subject?: string;
  body: string;
  status: "draft" | "sent" | "failed";
  sentAt?: string;
}

export interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// ─── Audit ───────────────────────────────────────────────────────────────────

export interface AuditLogEntry {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  details: string;
  timestamp: string;
}
