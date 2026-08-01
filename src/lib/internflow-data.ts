import type { Page, Stage } from "@/types/internflow";
import {
  LayoutDashboard,
  Users,
  GitBranch,
  ClipboardCheck,
  Calendar,
  Award,
  Mail,
  BarChart2,
  Settings,
} from "lucide-react";
import { mockData } from "./mock-data";

export const NAV_ITEMS: Array<{ id: Page; label: string; icon: typeof LayoutDashboard }> = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "candidates", label: "Candidates", icon: Users },
  { id: "pipeline", label: "Pipeline", icon: GitBranch },
  { id: "assessments", label: "Assessments", icon: ClipboardCheck },
  { id: "interviews", label: "Interviews", icon: Calendar },
  { id: "offer-letters", label: "Offer Letters", icon: Award },
  { id: "emails", label: "Email Center", icon: Mail },
  { id: "reports", label: "Reports", icon: BarChart2 },
  { id: "settings", label: "Settings", icon: Settings },
];

export const PAGE_TITLES: Record<string, string> = {
  dashboard: "Dashboard",
  pipeline: "Pipeline Board",
  candidates: "Candidates",
  "candidate-profile": "Candidate Profile",
  assessments: "Assessments",
  interviews: "Interviews",
  "offer-letters": "Offer Letters",
  emails: "Email Center",
  reports: "Reports & Analytics",
  settings: "Settings",
};

export const CANDIDATES = mockData.candidates;
