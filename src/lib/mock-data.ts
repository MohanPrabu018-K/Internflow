import type { Candidate, Stage } from "@/types/internflow";
import type {
  Application,
  AssessmentSubmission,
  College,
  Department,
  MockDataSet,
  OfferLetter,
  Recruiter,
  ReportMetric,
  InterviewSchedule,
} from "@/types/mock-data";

const stages: Stage[] = ["New", "Screening", "Assessment", "Interview", "Selected", "Offer Sent", "Joined"];

const roles = [
  "Frontend Developer Intern",
  "Backend Developer Intern",
  "Full Stack Developer Intern",
  "AI/ML Intern",
  "Data Analyst Intern",
  "UI/UX Designer Intern",
  "HR Intern",
  "Marketing Intern",
  "Python Developer Intern",
  "DevOps Intern",
];

const departments: Department[] = [
  { id: "eng", name: "Engineering" },
  { id: "design", name: "Design" },
  { id: "data", name: "Data Science" },
  { id: "hr", name: "HR" },
  { id: "mkt", name: "Marketing" },
  { id: "sales", name: "Sales" },
  { id: "ops", name: "Operations" },
  { id: "pm", name: "Product" },
  { id: "finance", name: "Finance" },
  { id: "qa", name: "QA" },
];

const colleges: College[] = Array.from({ length: 20 }, (_, i) => ({
  id: `college-${i + 1}`,
  name: [
    "IIT Bombay", "IIT Delhi", "IIT Madras", "IIT Hyderabad", "BITS Pilani",
    "NIT Trichy", "NIT Surathkal", "VIT Vellore", "SRM Chennai", "IIIT Bangalore",
    "DTU", "NSUT", "Jadavpur University", "Manipal Institute", "PES University",
    "Christ University", "LPU", "XLRI Jamshedpur", "IIM Indore", "IISc Bangalore",
  ][i],
  city: ["Mumbai", "Delhi", "Chennai", "Hyderabad", "Pilani", "Tiruchirappalli", "Mangalore", "Vellore", "Chennai", "Bangalore", "Delhi", "Delhi", "Kolkata", "Manipal", "Bangalore", "Bangalore", "Phagwara", "Jamshedpur", "Indore", "Bangalore"][i],
}));

const recruiterNames = [
  "Priya Kapoor", "Rahul Verma", "Meera Nair", "Ankit Sharma", "Sneha Iyer",
  "Aman Gupta", "Riya Sen", "Karthik Rao", "Neha Joshi", "Vivek Malhotra",
  "Pooja Menon", "Arjun Bansal", "Sana Khan", "Aditya Rao", "Nidhi Patel",
];

export const recruiters: Recruiter[] = recruiterNames.map((name, i) => ({
  id: `rec-${i + 1}`,
  name,
  email: `${name.toLowerCase().replace(/ /g, ".")}@acme.com`,
  role: i === 0 ? "Admin" : "Recruiter",
  department: departments[i % departments.length].name,
}));

const firstNames = ["Aarav", "Priya", "Rohan", "Ananya", "Karan", "Sneha", "Vikram", "Tanya", "Aditya", "Isha", "Kabir", "Mehul", "Naina", "Ritika", "Siddharth", "Aditi", "Rahul", "Mira", "Arjun", "Neha"];
const lastNames = ["Mehta", "Sharma", "Gupta", "Patel", "Singh", "Reddy", "Nair", "Kapoor", "Verma", "Iyer", "Rao", "Bose", "Khan", "Joshi", "Malhotra", "Bansal", "Sen", "Menon", "Jain", "Pillai"];
const colors = ["bg-blue-500", "bg-pink-500", "bg-violet-500", "bg-rose-500", "bg-orange-500", "bg-teal-500", "bg-green-500", "bg-indigo-500"];

function seedCandidate(index: number): Candidate {
  const first = firstNames[index % firstNames.length];
  const last = lastNames[index % lastNames.length];
  const college = colleges[index % colleges.length];
  const role = roles[index % roles.length];
  const stage = stages[index % stages.length];
  const initials = `${first[0]}${last[0]}`;
  return {
    id: index + 1,
    name: `${first} ${last}`,
    initials,
    email: `${first.toLowerCase()}.${last.toLowerCase()}${index + 1}@student.edu`,
    phone: `+91 ${90000 + index} ${50000 + index}`.slice(0, 15),
    college: college.name,
    department: departments[index % departments.length].name,
    role,
    stage,
    rating: Number((3.6 + (index % 15) * 0.09).toFixed(1)),
    cgpa: Number((7.5 + (index % 18) * 0.12).toFixed(1)),
    year: ["2nd Year", "3rd Year", "4th Year", "Masters"][index % 4],
    appliedDate: `Dec ${String(1 + (index % 28)).padStart(2, "0")}, 2024`,
    location: college.city,
    github: `github.com/${first.toLowerCase()}${last.toLowerCase()}`,
    linkedin: `linkedin.com/in/${first.toLowerCase()}${last.toLowerCase()}`,
    portfolio: `portfolio.example.com/${first.toLowerCase()}${last.toLowerCase()}`,
    skills: ["React", "TypeScript", "Node.js", "Python", "SQL"].slice(0, 3 + (index % 3)),
    color: colors[index % colors.length],
    recruiter: recruiters[index % recruiters.length].name,
    assignedRecruiter: recruiters[index % recruiters.length].name,
    experience: `${index % 4} internship${index % 4 === 1 ? "" : "s"}`,
    projects: [
      `${role.replace(" Intern", "")} Dashboard`,
      `${role.replace(" Intern", "")} Automation Tool`,
    ],
    resumeFileName: `${first.toLowerCase()}-${last.toLowerCase()}-resume.pdf`,
    resumeUploadedAt: `2025-01-${String(1 + (index % 20)).padStart(2, "0")}T10:00:00.000Z`,
    resumeMimeType: "application/pdf",
    resumePreviewUrl: "/sample-resume.pdf",
    recruiterNotes: `Recruiter notes for ${first} ${last}.`,
    internalNotes: `Internal notes for candidate ${index + 1}.`,
    averageRating: Number((3.8 + (index % 10) * 0.12).toFixed(1)),
    archived: false,
    notes: `Candidate ${index + 1} profile note for review and shortlisting.`,
    timeline: [
      { event: "Application Submitted", date: `2024-12-${String(1 + (index % 20)).padStart(2, "0")}`, status: "completed" },
      { event: "Resume Uploaded", date: `2024-12-${String(2 + (index % 20)).padStart(2, "0")}`, status: "completed" },
      { event: "Resume Approved", date: `2024-12-${String(3 + (index % 20)).padStart(2, "0")}`, status: stage !== "New" ? "completed" : "pending" },
      { event: "Assessment Assigned", date: `2024-12-${String(4 + (index % 20)).padStart(2, "0")}`, status: stage === "Assessment" || stage === "Interview" || stage === "Selected" || stage === "Offer Sent" || stage === "Joined" ? "completed" : "pending" },
      { event: "Assessment Submitted", date: `2024-12-${String(5 + (index % 20)).padStart(2, "0")}`, status: stage === "Interview" || stage === "Selected" || stage === "Offer Sent" || stage === "Joined" ? "completed" : "pending" },
      { event: "Interview Scheduled", date: `2024-12-${String(6 + (index % 20)).padStart(2, "0")}`, status: stage === "Interview" || stage === "Selected" || stage === "Offer Sent" || stage === "Joined" ? "completed" : "pending" },
      { event: "Interview Completed", date: `2024-12-${String(7 + (index % 20)).padStart(2, "0")}`, status: stage === "Selected" || stage === "Offer Sent" || stage === "Joined" ? "completed" : "pending" },
      { event: "Offer Generated", date: `2024-12-${String(8 + (index % 20)).padStart(2, "0")}`, status: stage === "Offer Sent" || stage === "Joined" ? "completed" : "pending" },
      { event: "Offer Accepted", date: `2024-12-${String(9 + (index % 20)).padStart(2, "0")}`, status: stage === "Joined" ? "completed" : "pending" },
      { event: "Joined", date: `2025-01-${String(1 + (index % 20)).padStart(2, "0")}`, status: stage === "Joined" ? "completed" : "pending" },
    ],
  };
}

export const candidates: Candidate[] = Array.from({ length: 100 }, (_, index) => seedCandidate(index));

export const applications: Application[] = Array.from({ length: 30 }, (_, index) => ({
  id: `app-${index + 1}`,
  candidateId: candidates[index].id,
  role: candidates[index].role,
  stage: candidates[index].stage,
  appliedAt: candidates[index].appliedDate,
}));

export const assessments: AssessmentSubmission[] = Array.from({ length: 30 }, (_, index) => ({
  id: `asm-${index + 1}`,
  candidateId: candidates[index].id,
  template: roles[index % roles.length],
  score: 60 + (index % 35),
  status: ["Pending", "Submitted", "Approved", "Rejected"][index % 4] as AssessmentSubmission["status"],
}));

export const interviews: InterviewSchedule[] = Array.from({ length: 20 }, (_, index) => ({
  id: `int-${index + 1}`,
  candidateId: candidates[index].id,
  date: `2025-01-${String(6 + (index % 18)).padStart(2, "0")}`,
  time: `${9 + (index % 8)}:00 AM`,
  platform: ["Google Meet", "Zoom", "Microsoft Teams"][index % 3],
  interviewer: recruiters[index % recruiters.length].name,
}));

export const offers: OfferLetter[] = Array.from({ length: 15 }, (_, index) => ({
  id: `off-${index + 1}`,
  candidateId: candidates[index].id,
  role: candidates[index].role,
  status: ["Draft", "Sent", "Accepted", "Rejected"][index % 4] as OfferLetter["status"],
}));

export const reports: ReportMetric[] = [
  { label: "Total Applications", value: "248", delta: "+24%" },
  { label: "Offer Acceptance Rate", value: "78%", delta: "+5%" },
  { label: "Avg Time to Offer", value: "18 days", delta: "-3 days" },
];

export const departmentsMock = departments;
export const collegesMock = colleges;

export const mockData: MockDataSet = {
  candidates,
  recruiters,
  departments: departmentsMock,
  colleges: collegesMock,
  applications,
  assessments,
  interviews,
  offers,
  reports,
};
