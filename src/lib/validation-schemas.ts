import { z } from "zod";

export const candidateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  college: z.string().min(2, "College is required"),
  department: z.string().min(2, "Department is required"),
  role: z.string().min(2, "Role is required"),
  cgpa: z.number().min(0).max(10),
  year: z.string(),
  location: z.string(),
  skills: z.array(z.string()).min(1, "At least one skill required"),
  experience: z.string(),
  notes: z.string().optional(),
});

export const offerLetterSchema = z.object({
  candidateName: z.string().min(1),
  role: z.string().min(1),
  duration: z.string().min(1),
  joiningDate: z.string().min(1),
  reportingManager: z.string().min(1),
  workingMode: z.string().min(1),
  stipend: z.string().optional(),
});

export const assessmentSchema = z.object({
  role: z.string().min(1),
  type: z.enum(["MCQ", "Coding", "SQL", "Aptitude", "Technical"]),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  questionCount: z.number().min(1).max(50),
  timeLimit: z.number().min(5).max(180),
});

export const interviewSchema = z.object({
  candidateId: z.number(),
  date: z.string().min(1),
  time: z.string().min(1),
  platform: z.enum(["Google Meet", "Zoom", "Microsoft Teams"]),
  interviewer: z.string().min(1),
});

export const jobDescriptionSchema = z.object({
  title: z.string().min(3),
  department: z.string().min(2),
  skills: z.array(z.string()).min(1),
  experience: z.string(),
  stipend: z.string(),
  location: z.string(),
});

export const referralSchema = z.object({
  referrerName: z.string().min(2),
  candidateName: z.string().min(2),
  candidateEmail: z.string().email(),
  role: z.string().min(2),
});

export const onboardingSchema = z.object({
  candidateId: z.number(),
  tasks: z.array(z.object({
    label: z.string(),
    status: z.enum(["pending", "in-progress", "completed"]),
    required: z.boolean(),
    category: z.enum(["document", "form", "policy", "asset", "training"]),
  })),
});

export type CandidateFormData = z.infer<typeof candidateSchema>;
export type OfferLetterFormData = z.infer<typeof offerLetterSchema>;
export type AssessmentFormData = z.infer<typeof assessmentSchema>;
export type InterviewFormData = z.infer<typeof interviewSchema>;
export type JobDescriptionFormData = z.infer<typeof jobDescriptionSchema>;
export type ReferralFormData = z.infer<typeof referralSchema>;
export type OnboardingFormData = z.infer<typeof onboardingSchema>;
