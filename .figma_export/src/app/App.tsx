import { useState } from "react";
import type { ElementType } from "react";
import {
  LayoutDashboard, Users, GitBranch, ClipboardCheck, Calendar,
  Award, Mail, BarChart2, Settings, Search, Bell,
  Plus, ArrowRight, Check, Star, Filter,
  MoreHorizontal, GraduationCap,
  Globe, Github, Linkedin, Phone, Building2, MapPin,
  TrendingUp, ChevronRight, X, Edit,
  CheckCircle, XCircle, User, LogOut,
  CalendarDays, Video, ArrowUpRight,
  Upload, Sparkles, Shield, Code, Palette, Zap,
  Target, MessageSquare, Database, Menu,
  ChevronLeft, Link2, Trash2, Layers,
  ChevronDown, FileText, Eye, Send, Download,
  Activity, BookOpen, Copy, Inbox, RefreshCw,
  SlidersHorizontal, ExternalLink, AlertCircle
} from "lucide-react";
import {
  BarChart, Bar, AreaChart, Area,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from "recharts";

// ─── Types ──────────────────────────────────────────────────────────────────

type Stage = "New" | "Screening" | "Assessment" | "Interview" | "Selected" | "Offer Sent" | "Joined";
type AppView = "landing" | "onboarding" | "app";
type Page = "dashboard" | "pipeline" | "candidates" | "candidate-profile" | "assessments" | "interviews" | "offer-letters" | "emails" | "reports" | "settings";

interface Candidate {
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
  experience: string;
  notes: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const STAGE_CONFIG: Record<Stage, { text: string; bg: string; dot: string }> = {
  "New": { text: "text-slate-600", bg: "bg-slate-100", dot: "bg-slate-400" },
  "Screening": { text: "text-blue-700", bg: "bg-blue-50", dot: "bg-blue-500" },
  "Assessment": { text: "text-amber-700", bg: "bg-amber-50", dot: "bg-amber-500" },
  "Interview": { text: "text-violet-700", bg: "bg-violet-50", dot: "bg-violet-500" },
  "Selected": { text: "text-teal-700", bg: "bg-teal-50", dot: "bg-teal-500" },
  "Offer Sent": { text: "text-orange-700", bg: "bg-orange-50", dot: "bg-orange-500" },
  "Joined": { text: "text-green-700", bg: "bg-green-50", dot: "bg-green-500" },
};

const STAGE_HEX: Record<Stage, string> = {
  "New": "#94A3B8",
  "Screening": "#3B82F6",
  "Assessment": "#F59E0B",
  "Interview": "#8B5CF6",
  "Selected": "#14B8A6",
  "Offer Sent": "#F97316",
  "Joined": "#22C55E",
};

const CANDIDATES: Candidate[] = [
  {
    id: 1, name: "Aarav Mehta", initials: "AM", email: "aarav.mehta@iitb.ac.in",
    phone: "+91 98765 43210", college: "IIT Bombay", department: "Computer Science",
    role: "Frontend Developer Intern", stage: "Interview", rating: 4.5, cgpa: 9.1,
    year: "3rd Year", appliedDate: "Dec 12, 2024", location: "Mumbai",
    github: "github.com/aaravmehta", linkedin: "linkedin.com/in/aaravmehta",
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "Figma"],
    color: "bg-blue-500", recruiter: "Priya Kapoor", experience: "1 internship",
    notes: "Strong frontend skills, excellent communication. Highly recommended for the role. Demonstrated exceptional React knowledge during technical screen.",
  },
  {
    id: 2, name: "Priya Sharma", initials: "PS", email: "priya.sharma@nit.ac.in",
    phone: "+91 87654 32109", college: "NIT Trichy", department: "Electronics & CS",
    role: "Full Stack Developer Intern", stage: "Assessment", rating: 4.0, cgpa: 8.7,
    year: "4th Year", appliedDate: "Dec 14, 2024", location: "Chennai",
    github: "github.com/priyasharma", linkedin: "linkedin.com/in/priyasharma",
    skills: ["React", "Python", "Django", "PostgreSQL", "Docker"],
    color: "bg-pink-500", recruiter: "Rahul Verma", experience: "2 internships",
    notes: "Solid full-stack fundamentals. Good problem-solving approach. Django projects look production-ready.",
  },
  {
    id: 3, name: "Rohan Gupta", initials: "RG", email: "rohan.gupta@bits.ac.in",
    phone: "+91 76543 21098", college: "BITS Pilani", department: "Computer Science",
    role: "AI/ML Intern", stage: "Selected", rating: 5.0, cgpa: 9.4,
    year: "4th Year", appliedDate: "Dec 08, 2024", location: "Pilani",
    github: "github.com/rohangupta", linkedin: "linkedin.com/in/rohangupta",
    skills: ["Python", "TensorFlow", "PyTorch", "LangChain", "FastAPI"],
    color: "bg-violet-500", recruiter: "Priya Kapoor", experience: "2 internships",
    notes: "Outstanding AI/ML profile. Published research paper at NeurIPS workshop. Top candidate — do not miss.",
  },
  {
    id: 4, name: "Ananya Patel", initials: "AP", email: "ananya.patel@iitd.ac.in",
    phone: "+91 65432 10987", college: "IIT Delhi", department: "Design",
    role: "UI/UX Designer Intern", stage: "Screening", rating: 4.2, cgpa: 8.5,
    year: "3rd Year", appliedDate: "Dec 18, 2024", location: "Delhi",
    github: "github.com/ananyapatel", linkedin: "linkedin.com/in/ananyapatel",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "Framer"],
    color: "bg-rose-500", recruiter: "Meera Nair", experience: "1 internship",
    notes: "Beautiful portfolio. Strong user research background. Case studies show mature design thinking.",
  },
  {
    id: 5, name: "Karan Singh", initials: "KS", email: "karan.singh@vit.ac.in",
    phone: "+91 54321 09876", college: "VIT Vellore", department: "Computer Science",
    role: "Backend Developer Intern", stage: "Offer Sent", rating: 4.3, cgpa: 8.8,
    year: "3rd Year", appliedDate: "Dec 05, 2024", location: "Vellore",
    github: "github.com/karansingh", linkedin: "linkedin.com/in/karansingh",
    skills: ["Node.js", "Go", "PostgreSQL", "Redis", "Kubernetes"],
    color: "bg-orange-500", recruiter: "Rahul Verma", experience: "1 internship",
    notes: "Strong backend architecture skills. Familiar with microservices patterns. Offer sent on Dec 20.",
  },
  {
    id: 6, name: "Sneha Reddy", initials: "SR", email: "sneha.reddy@iith.ac.in",
    phone: "+91 43210 98765", college: "IIT Hyderabad", department: "Data Science",
    role: "Data Analyst Intern", stage: "New", rating: 3.8, cgpa: 8.2,
    year: "2nd Year", appliedDate: "Dec 22, 2024", location: "Hyderabad",
    github: "github.com/sneharedy", linkedin: "linkedin.com/in/sneharedy",
    skills: ["Python", "SQL", "Tableau", "Power BI", "Statistics"],
    color: "bg-teal-500", recruiter: "Meera Nair", experience: "No internship",
    notes: "Fresh application. Strong academic profile in Data Science. Needs resume review.",
  },
  {
    id: 7, name: "Vikram Nair", initials: "VN", email: "vikram.nair@iisc.ac.in",
    phone: "+91 32109 87654", college: "IISc Bangalore", department: "Computer Science",
    role: "Python Developer Intern", stage: "Joined", rating: 4.8, cgpa: 9.2,
    year: "Masters", appliedDate: "Nov 28, 2024", location: "Bangalore",
    github: "github.com/vikramnair", linkedin: "linkedin.com/in/vikramnair",
    skills: ["Python", "FastAPI", "Machine Learning", "AWS", "System Design"],
    color: "bg-green-500", recruiter: "Priya Kapoor", experience: "3 internships",
    notes: "Exceptional profile. Already joined Dec 16 and performing excellently. Mentor assigned.",
  },
  {
    id: 8, name: "Tanya Kapoor", initials: "TK", email: "tanya.kapoor@xlri.ac.in",
    phone: "+91 21098 76543", college: "XLRI Jamshedpur", department: "Human Resources",
    role: "HR Intern", stage: "Interview", rating: 4.1, cgpa: 8.6,
    year: "2nd Year MBA", appliedDate: "Dec 15, 2024", location: "Jamshedpur",
    github: "", linkedin: "linkedin.com/in/tanyakapoor",
    skills: ["HRMS", "Talent Acquisition", "Employee Relations", "Training & Development"],
    color: "bg-indigo-500", recruiter: "Meera Nair", experience: "1 internship",
    notes: "MBA specialization in HR. Great cultural fit. Interview scheduled for Dec 28.",
  },
];

const FUNNEL_DATA = [
  { stage: "Applied", value: 248 },
  { stage: "Screened", value: 164 },
  { stage: "Assessment", value: 89 },
  { stage: "Interview", value: 52 },
  { stage: "Selected", value: 23 },
  { stage: "Offer Sent", value: 18 },
  { stage: "Joined", value: 14 },
];

const MONTHLY_DATA = [
  { month: "Jul", applications: 28, hired: 4 },
  { month: "Aug", applications: 45, hired: 8 },
  { month: "Sep", applications: 62, hired: 12 },
  { month: "Oct", applications: 48, hired: 9 },
  { month: "Nov", applications: 74, hired: 15 },
  { month: "Dec", applications: 91, hired: 14 },
];

const DEPT_DATA = [
  { name: "Engineering", value: 112 },
  { name: "Design", value: 48 },
  { name: "Data Science", value: 35 },
  { name: "Marketing", value: 28 },
  { name: "HR", value: 15 },
  { name: "Finance", value: 10 },
];

const COLLEGE_DATA = [
  { college: "IIT", count: 45 },
  { college: "NIT", count: 38 },
  { college: "BITS", count: 25 },
  { college: "VIT", count: 32 },
  { college: "Delhi Univ", count: 22 },
  { college: "Others", count: 86 },
];

const DEPT_COLORS = ["#2563EB", "#14B8A6", "#8B5CF6", "#F59E0B", "#EF4444", "#64748B"];

const NAV_ITEMS = [
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

const PAGE_TITLES: Record<string, string> = {
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

// ─── Shared Components ────────────────────────────────────────────────────────

function StageBadge({ stage }: { stage: Stage }) {
  const cfg = STAGE_CONFIG[stage];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {stage}
    </span>
  );
}

function AvatarCircle({ initials, color, size = "md" }: { initials: string; color: string; size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-14 h-14 text-base" };
  return (
    <div className={`${sizes[size]} rounded-xl ${color} flex items-center justify-center text-white font-bold flex-shrink-0`}>
      {initials}
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i <= Math.floor(rating) ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"}`}
        />
      ))}
      <span className="text-xs text-slate-500 ml-1">{rating}</span>
    </div>
  );
}

// ─── Landing Page ─────────────────────────────────────────────────────────────

function LandingNav({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#2563EB] rounded-xl flex items-center justify-center">
            <GitBranch className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-slate-900">InternFlow</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["Features", "Workflow", "Pricing", "Testimonials"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onGetStarted}
            className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors px-4 py-2"
          >
            Sign In
          </button>
          <button
            onClick={onGetStarted}
            className="text-sm font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-4 py-2 rounded-xl transition-colors"
          >
            Start Free
          </button>
        </div>
      </div>
    </nav>
  );
}

function DashboardMockup() {
  return (
    <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200/60">
      <div className="flex items-center gap-2 bg-slate-50 border-b border-slate-100 px-4 py-3">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 mx-3">
          <div className="bg-white rounded-md border border-slate-100 text-xs text-slate-400 px-3 py-1 text-center font-mono">
            app.internflow.io/dashboard
          </div>
        </div>
      </div>
      <div className="flex" style={{ height: 420 }}>
        <div className="w-44 border-r border-slate-100 bg-white p-3 flex flex-col gap-1 flex-shrink-0">
          <div className="flex items-center gap-2 px-3 py-2 mb-2">
            <div className="w-6 h-6 bg-[#2563EB] rounded-lg flex items-center justify-center">
              <GitBranch className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs font-bold text-slate-800">InternFlow</span>
          </div>
          {[
            { label: "Dashboard", active: true },
            { label: "Candidates", active: false },
            { label: "Pipeline", active: false },
            { label: "Assessments", active: false },
            { label: "Interviews", active: false },
          ].map(({ label, active }) => (
            <div
              key={label}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${active ? "bg-blue-50 text-blue-600" : "text-slate-500"}`}
            >
              <div className={`w-3 h-3 rounded-sm ${active ? "bg-blue-200" : "bg-slate-200"}`} />
              {label}
            </div>
          ))}
        </div>
        <div className="flex-1 bg-[#F8FAFC] p-4 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-slate-800">Overview</p>
            <div className="text-xs text-slate-400 bg-white border border-slate-100 px-2 py-1 rounded-lg">Dec 2024</div>
          </div>
          <div className="grid grid-cols-4 gap-2 mb-3">
            {[
              { label: "Applications", value: "248", color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Screening", value: "164", color: "text-violet-600", bg: "bg-violet-50" },
              { label: "Interviews", value: "52", color: "text-teal-600", bg: "bg-teal-50" },
              { label: "Joined", value: "14", color: "text-green-600", bg: "bg-green-50" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl p-3 shadow-sm border border-slate-100">
                <p className="text-[10px] text-slate-400 mb-1">{stat.label}</p>
                <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-5 gap-2">
            <div className="col-span-3 bg-white rounded-xl p-3 shadow-sm border border-slate-100">
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-2">Hiring Funnel</p>
              <div className="space-y-1.5">
                {[
                  { label: "Applied", pct: 100, color: "bg-blue-500" },
                  { label: "Screened", pct: 66, color: "bg-violet-400" },
                  { label: "Interview", pct: 40, color: "bg-teal-400" },
                  { label: "Joined", pct: 10, color: "bg-green-400" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-2">
                    <span className="text-[9px] text-slate-400 w-12 text-right">{row.label}</span>
                    <div className="flex-1 bg-slate-100 rounded-full h-2">
                      <div className={`${row.color} h-2 rounded-full`} style={{ width: `${row.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-2 bg-white rounded-xl p-3 shadow-sm border border-slate-100">
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-2">Pipeline</p>
              {["Aarav M.", "Priya S.", "Rohan G."].map((name, i) => (
                <div key={name} className="flex items-center gap-1.5 py-1 border-b border-slate-50 last:border-0">
                  <div
                    className={`w-5 h-5 rounded-lg text-white text-[8px] font-bold flex items-center justify-center ${["bg-blue-500", "bg-pink-500", "bg-violet-500"][i]}`}
                  >
                    {name[0]}
                  </div>
                  <span className="text-[10px] text-slate-600 flex-1 truncate">{name}</span>
                  <span
                    className={`text-[8px] px-1.5 py-0.5 rounded-full font-medium ${["bg-violet-50 text-violet-600", "bg-amber-50 text-amber-600", "bg-teal-50 text-teal-600"][i]}`}
                  >
                    {["Interview", "Assess.", "Selected"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSection({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.08),transparent)]" />
      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-4 py-2 rounded-full border border-blue-100 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Trusted by 500+ companies across India
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6 max-w-4xl">
            Hire Better Interns.{" "}
            <span className="text-[#2563EB]">Faster.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl leading-relaxed mb-10">
            Manage internship applications, screen resumes, assign assessments, schedule interviews,
            and send offer letters — all in one platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onGetStarted}
              className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300"
            >
              Start Free
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onGetStarted}
              className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 font-semibold px-6 py-3.5 rounded-xl transition-all"
            >
              <Video className="w-4 h-4" />
              Book a Demo
            </button>
          </div>
        </div>
        <div className="max-w-5xl mx-auto">
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}

function TrustedBySection() {
  const companies = ["Google", "Microsoft", "Razorpay", "Zerodha", "CRED", "Swiggy", "Meesho", "Groww"];
  return (
    <section className="py-12 px-6 border-y border-slate-100 bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest text-center mb-8">
          Trusted by leading companies
        </p>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
          {companies.map((c) => (
            <span key={c} className="text-lg font-bold text-slate-300 hover:text-slate-400 transition-colors cursor-default">
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    { icon: Zap, title: "Google Forms Integration", desc: "Connect your Google Form and auto-import applications in real time — zero manual work.", color: "text-blue-600 bg-blue-50" },
    { icon: FileText, title: "Resume Screening", desc: "View, filter, and rate resumes with recruiter notes and a built-in PDF viewer.", color: "text-violet-600 bg-violet-50" },
    { icon: ClipboardCheck, title: "Assessment Workflow", desc: "Send role-specific assessments with deadlines, collect submissions, and score them.", color: "text-amber-600 bg-amber-50" },
    { icon: CalendarDays, title: "Interview Management", desc: "Schedule interviews across Google Meet, Zoom, or Teams with one-click invites.", color: "text-teal-600 bg-teal-50" },
    { icon: Award, title: "Offer Letter Generator", desc: "Generate beautiful, customized offer letters with one click and send via email.", color: "text-orange-600 bg-orange-50" },
    { icon: Mail, title: "Email Automation", desc: "Pre-built templates for every stage — from application received to welcome onboard.", color: "text-pink-600 bg-pink-50" },
    { icon: BarChart2, title: "Analytics Dashboard", desc: "Track your hiring funnel, conversion rates, and pipeline health with live charts.", color: "text-green-600 bg-green-50" },
    { icon: Users, title: "Team Collaboration", desc: "Multiple recruiters, role-based access, and shared notes on every candidate.", color: "text-indigo-600 bg-indigo-50" },
  ];
  return (
    <section id="features" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-[#2563EB] uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Everything you need to hire smarter</h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            From first application to first day — InternFlow handles the entire internship recruitment lifecycle.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div key={f.title} className="bg-white border border-slate-100 rounded-[18px] p-6 hover:shadow-lg hover:shadow-slate-100 hover:-translate-y-0.5 transition-all duration-200">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkflowSection() {
  const steps = [
    { stage: "Application", desc: "Candidates apply through your Google Form. Data flows automatically into InternFlow.", icon: FileText, color: "bg-blue-500" },
    { stage: "Screening", desc: "Recruiters review resumes, add ratings and notes, and shortlist candidates.", icon: Eye, color: "bg-violet-500" },
    { stage: "Assessment", desc: "Send role-specific tests with deadlines. Review submissions and score them inline.", icon: ClipboardCheck, color: "bg-amber-500" },
    { stage: "Interview", desc: "Schedule interviews with Google Meet / Zoom links sent automatically via email.", icon: CalendarDays, color: "bg-teal-500" },
    { stage: "Offer Letter", desc: "Generate personalized offer letters from templates and send directly to candidates.", icon: Award, color: "bg-orange-500" },
    { stage: "Onboarding", desc: "Send welcome emails and onboarding instructions. Mark intern as Joined.", icon: CheckCircle, color: "bg-green-500" },
  ];
  return (
    <section id="workflow" className="py-24 px-6 bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-[#2563EB] uppercase tracking-widest mb-3">Workflow</p>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">From application to onboarding</h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            A structured, end-to-end recruitment pipeline designed specifically for internship hiring.
          </p>
        </div>
        <div className="relative">
          <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-blue-200 via-teal-200 to-green-200 hidden md:block" />
          <div className="space-y-5">
            {steps.map((step, i) => (
              <div key={step.stage} className="flex items-start gap-6 relative">
                <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center flex-shrink-0 shadow-lg z-10`}>
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 bg-white rounded-[18px] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs text-slate-400 font-mono">0{i + 1}</span>
                        <h3 className="text-base font-semibold text-slate-900">{step.stage}</h3>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 flex-shrink-0 mt-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection({ onGetStarted }: { onGetStarted: () => void }) {
  const plans = [
    {
      name: "Starter",
      price: "₹3,999",
      period: "/ month",
      desc: "Perfect for early-stage startups running their first internship drive.",
      features: ["Up to 100 applications", "Google Forms sync", "Resume screening", "Basic assessments", "Email templates", "2 recruiter seats"],
      cta: "Start Free Trial",
      highlight: false,
    },
    {
      name: "Growth",
      price: "₹9,999",
      period: "/ month",
      desc: "For growing companies with regular internship programmes.",
      features: ["Up to 1,000 applications", "Everything in Starter", "Offer letter generator", "Interview scheduling", "Analytics dashboard", "10 recruiter seats", "Priority support"],
      cta: "Start Free Trial",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      desc: "For large organizations hiring hundreds of interns per season.",
      features: ["Unlimited applications", "Everything in Growth", "Custom integrations", "HRMS sync", "Dedicated account manager", "SLA guarantee", "Unlimited seats"],
      cta: "Contact Sales",
      highlight: false,
    },
  ];
  return (
    <section id="pricing" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-[#2563EB] uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Simple, transparent pricing</h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            No hidden fees. Cancel any time. 14-day free trial on all plans.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-[22px] p-8 border flex flex-col ${plan.highlight ? "bg-[#2563EB] border-blue-600 shadow-2xl shadow-blue-200 scale-105" : "bg-white border-slate-100 shadow-sm"}`}
            >
              <div className="mb-6">
                <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${plan.highlight ? "text-blue-200" : "text-slate-400"}`}>
                  {plan.name}
                </p>
                <div className="flex items-end gap-1 mb-3">
                  <span className={`text-4xl font-extrabold ${plan.highlight ? "text-white" : "text-slate-900"}`}>{plan.price}</span>
                  <span className={`text-sm mb-1 ${plan.highlight ? "text-blue-200" : "text-slate-400"}`}>{plan.period}</span>
                </div>
                <p className={`text-sm leading-relaxed ${plan.highlight ? "text-blue-100" : "text-slate-500"}`}>{plan.desc}</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2.5">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${plan.highlight ? "bg-blue-400" : "bg-blue-50"}`}>
                      <Check className={`w-2.5 h-2.5 ${plan.highlight ? "text-white" : "text-blue-600"}`} />
                    </div>
                    <span className={`text-sm ${plan.highlight ? "text-blue-100" : "text-slate-600"}`}>{feat}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={onGetStarted}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${plan.highlight ? "bg-white text-blue-600 hover:bg-blue-50" : "bg-[#2563EB] text-white hover:bg-[#1D4ED8]"}`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      quote: "InternFlow cut our internship hiring time by 60%. What used to take 3 weeks now takes 5 days. The pipeline board is incredibly intuitive.",
      name: "Meera Iyer",
      title: "Head of Talent, Razorpay",
      avatar: "MI",
      color: "bg-blue-500",
    },
    {
      quote: "The Google Forms integration is seamless. We just paste our form link and every response shows up as a candidate card — it just works.",
      name: "Arjun Krishnan",
      title: "HR Manager, CRED",
      avatar: "AK",
      color: "bg-violet-500",
    },
    {
      quote: "Offer letter generation alone saves us hours per cohort. Beautiful templates, auto-filled variables, sent via email in one click.",
      name: "Priyanka Desai",
      title: "Talent Ops Lead, Swiggy",
      avatar: "PD",
      color: "bg-teal-500",
    },
  ];
  return (
    <section className="py-24 px-6 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-[#2563EB] uppercase tracking-widest mb-3">Testimonials</p>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Loved by HR teams across India</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-[18px] p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${t.color} flex items-center justify-center text-white text-xs font-bold`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const faqs = [
    { q: "How does the Google Forms integration work?", a: "You paste your Google Form URL during onboarding. InternFlow connects to the linked Google Sheet and syncs new responses in real time — every submission becomes a candidate card automatically." },
    { q: "Can multiple recruiters use InternFlow simultaneously?", a: "Yes. You can invite team members with different roles — Admin, Recruiter, or Viewer. Each recruiter sees a shared candidate pool with their own notes and actions." },
    { q: "Is there a limit on the number of applications?", a: "Limits depend on your plan. Starter supports up to 100 applications per month, Growth supports up to 1,000, and Enterprise has no limits." },
    { q: "Can I customize the offer letter templates?", a: "Absolutely. InternFlow comes with 9 pre-built templates (Frontend, Backend, AI, HR, Marketing, etc.) and you can customize every field, logo, and clause to match your company branding." },
    { q: "What video platforms are supported for interviews?", a: "InternFlow generates meeting links for Google Meet, Zoom, and Microsoft Teams. The link is automatically included in the interview invitation email." },
    { q: "Is candidate data stored securely?", a: "Yes. All data is encrypted at rest and in transit. InternFlow is built on SOC 2 Type II compliant infrastructure. We never sell or share candidate data." },
  ];
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-[#2563EB] uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Frequently asked questions</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-slate-100 rounded-[14px] overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="text-sm font-semibold text-slate-900">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 flex-shrink-0 ml-4 transition-transform duration-200 ${openIdx === i ? "rotate-180" : ""}`} />
              </button>
              {openIdx === i && (
                <div className="px-6 pb-4 text-sm text-slate-500 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FooterSection({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <footer className="bg-slate-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-[#2563EB] rounded-xl flex items-center justify-center">
                <GitBranch className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">InternFlow</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-5 max-w-xs">
              The complete internship ATS for modern HR teams. Hire better interns, faster.
            </p>
            <button
              onClick={onGetStarted}
              className="text-sm font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-2.5 rounded-xl transition-colors"
            >
              Start Free Today
            </button>
          </div>
          {[
            { title: "Product", links: ["Features", "Workflow", "Pricing", "Changelog", "Roadmap"] },
            { title: "Resources", links: ["Documentation", "API Reference", "Blog", "Case Studies"] },
            { title: "Company", links: ["About", "Careers", "Contact", "Privacy Policy", "Terms"] },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© 2024 InternFlow. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Shield className="w-4 h-4 text-slate-500" />
            <span className="text-xs text-slate-500">SOC 2 Compliant</span>
            <Lock className="w-4 h-4 text-slate-500" />
            <span className="text-xs text-slate-500">256-bit Encryption</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Lock({ className }: { className?: string }) {
  return <Shield className={className} />;
}

function LandingPage({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="min-h-screen bg-white">
      <LandingNav onGetStarted={onGetStarted} />
      <HeroSection onGetStarted={onGetStarted} />
      <TrustedBySection />
      <FeaturesSection />
      <WorkflowSection />
      <PricingSection onGetStarted={onGetStarted} />
      <TestimonialsSection />
      <FAQSection />
      <FooterSection onGetStarted={onGetStarted} />
    </div>
  );
}

// ─── Onboarding ───────────────────────────────────────────────────────────────

function OnboardingWizard({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [formUrl, setFormUrl] = useState("");

  const steps = [
    {
      title: "Connect Google Account",
      desc: "Sign in with your Google Workspace account to enable Forms and Sheets integration.",
    },
    {
      title: "Paste your Google Form URL",
      desc: "Share the internship application form link. We'll sync responses automatically.",
    },
    {
      title: "Verify Google Sheet",
      desc: "We've detected your linked spreadsheet. Confirm it's the correct responses sheet.",
    },
    {
      title: "Grant Permissions",
      desc: "InternFlow needs read access to your Google Sheet to import applications.",
    },
    {
      title: "You're all set!",
      desc: "InternFlow is connected and ready. Your first applications are being imported.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="flex items-center gap-2.5 justify-center mb-10">
          <div className="w-9 h-9 bg-[#2563EB] rounded-xl flex items-center justify-center">
            <GitBranch className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900">InternFlow</span>
        </div>

        <div className="flex items-center gap-2 justify-center mb-10">
          {steps.map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  i < step
                    ? "bg-[#2563EB] text-white"
                    : i === step
                    ? "bg-[#2563EB] text-white ring-4 ring-blue-100"
                    : "bg-slate-200 text-slate-400"
                }`}
              >
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`h-px w-8 transition-all duration-300 ${i < step ? "bg-[#2563EB]" : "bg-slate-200"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[22px] border border-slate-100 shadow-xl shadow-slate-100 p-8">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${step === 4 ? "bg-green-50" : "bg-blue-50"}`}>
            {step === 0 && <Globe className="w-7 h-7 text-blue-600" />}
            {step === 1 && <Link2 className="w-7 h-7 text-blue-600" />}
            {step === 2 && <Database className="w-7 h-7 text-blue-600" />}
            {step === 3 && <Shield className="w-7 h-7 text-blue-600" />}
            {step === 4 && <CheckCircle className="w-7 h-7 text-green-600" />}
          </div>

          <h2 className="text-xl font-bold text-slate-900 mb-2">{steps[step].title}</h2>
          <p className="text-sm text-slate-500 leading-relaxed mb-8">{steps[step].desc}</p>

          {step === 0 && (
            <button
              onClick={() => setStep(1)}
              className="w-full flex items-center justify-center gap-3 border-2 border-slate-200 hover:border-slate-300 rounded-xl py-3.5 transition-all group"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">Continue with Google</span>
            </button>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">
                  Google Form URL
                </label>
                <input
                  type="url"
                  value={formUrl}
                  onChange={(e) => setFormUrl(e.target.value)}
                  placeholder="https://forms.gle/..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
                />
              </div>
              <button
                onClick={() => setStep(2)}
                className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-3.5 rounded-xl transition-colors"
              >
                Verify Form
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-green-800">Google Sheet detected</p>
                  <p className="text-xs text-green-600 mt-0.5">Summer Internship 2025 – Applications</p>
                  <p className="text-xs text-slate-400 mt-1">148 responses found</p>
                </div>
              </div>
              <button
                onClick={() => setStep(3)}
                className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-3.5 rounded-xl transition-colors"
              >
                Confirm & Continue
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-3">
                {["Read Google Forms responses", "Access linked Google Sheets", "Send emails via Gmail (optional)", "Access Google Calendar (optional)"].map((perm, i) => (
                  <div key={perm} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${i < 2 ? "bg-green-100" : "bg-blue-50"}`}>
                      <Check className={`w-3.5 h-3.5 ${i < 2 ? "text-green-600" : "text-blue-500"}`} />
                    </div>
                    <span className="text-sm text-slate-700">{perm}</span>
                    {i >= 2 && <span className="ml-auto text-xs text-slate-400">Optional</span>}
                  </div>
                ))}
              </div>
              <button
                onClick={() => setStep(4)}
                className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-3.5 rounded-xl transition-colors"
              >
                Grant Access
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Applications Imported", value: "148" },
                  { label: "Roles Detected", value: "7" },
                  { label: "Colleges Found", value: "34" },
                  { label: "Ready to Screen", value: "148" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-slate-50 rounded-xl p-3 text-center">
                    <p className="text-xl font-bold text-[#2563EB]">{stat.value}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={onComplete}
                className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {step > 0 && step < 4 && (
          <button onClick={() => setStep(step - 1)} className="mt-4 flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 transition-colors mx-auto">
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
        )}
      </div>
    </div>
  );
}

// ─── App Shell ────────────────────────────────────────────────────────────────

function Sidebar({ currentPage, onNavigate }: { currentPage: Page; onNavigate: (p: Page) => void }) {
  return (
    <div className="w-[240px] flex-shrink-0 bg-white border-r border-slate-100 flex flex-col h-full">
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-slate-100">
        <div className="w-8 h-8 bg-[#2563EB] rounded-xl flex items-center justify-center">
          <GitBranch className="w-4 h-4 text-white" />
        </div>
        <span className="text-base font-bold text-slate-900">InternFlow</span>
      </div>
      <nav className="flex-1 p-3 overflow-y-auto">
        <div className="space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const active = currentPage === item.id || (currentPage === "candidate-profile" && item.id === "candidates");
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as Page)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left ${
                  active
                    ? "bg-blue-50 text-[#2563EB]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <item.icon className={`w-4 h-4 flex-shrink-0 ${active ? "text-[#2563EB]" : "text-slate-400"}`} />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>
      <div className="p-3 border-t border-slate-100">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
          <div className="w-8 h-8 bg-[#2563EB] rounded-xl flex items-center justify-center text-white text-xs font-bold">
            PK
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">Priya Kapoor</p>
            <p className="text-xs text-slate-400 truncate">priya@acme.com</p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}

function TopNav({ currentPage, onNavigate }: { currentPage: Page; onNavigate: (p: Page) => void }) {
  return (
    <div className="h-16 bg-white border-b border-slate-100 flex items-center px-6 gap-4 flex-shrink-0">
      <div className="flex items-center gap-2 flex-1">
        {currentPage === "candidate-profile" && (
          <button
            onClick={() => onNavigate("candidates")}
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 transition-colors mr-1"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
        <h1 className="text-sm font-semibold text-slate-900">{PAGE_TITLES[currentPage] || "InternFlow"}</h1>
        {currentPage === "candidates" && (
          <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{CANDIDATES.length}</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search candidates, roles..."
            className="text-sm pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#2563EB] transition-all placeholder:text-slate-400"
          />
        </div>
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors">
          <Bell className="w-4 h-4 text-slate-500" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>
        <button className="inline-flex items-center gap-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors">
          <Plus className="w-3.5 h-3.5" />
          Add Candidate
        </button>
      </div>
    </div>
  );
}

// ─── Dashboard View ───────────────────────────────────────────────────────────

function StatCard({
  icon: Icon, label, value, change, color, bg,
}: {
  icon: ElementType; label: string; value: string; change: string; color: string; bg: string;
}) {
  const isPositive = change.startsWith("+");
  return (
    <div className="bg-white rounded-[18px] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bg}`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold ${isPositive ? "text-green-600" : "text-red-500"}`}>
          {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5 rotate-90" />}
          {change}
        </div>
      </div>
      <p className="text-2xl font-bold text-slate-900 mb-1">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}

function DashboardView({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const recentActivity = [
    { text: "Aarav Mehta moved to Interview", time: "2 min ago", color: "bg-violet-500" },
    { text: "Assessment sent to Priya Sharma", time: "1 hr ago", color: "bg-amber-500" },
    { text: "Rohan Gupta marked as Selected", time: "3 hr ago", color: "bg-teal-500" },
    { text: "Offer letter sent to Karan Singh", time: "5 hr ago", color: "bg-orange-500" },
    { text: "Vikram Nair joined the team", time: "Yesterday", color: "bg-green-500" },
    { text: "New application: Sneha Reddy", time: "Yesterday", color: "bg-blue-500" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard icon={Users} label="Total Applications" value="248" change="+24%" color="text-blue-600" bg="bg-blue-50" />
        <StatCard icon={Eye} label="Resume Screening" value="164" change="+18%" color="text-violet-600" bg="bg-violet-50" />
        <StatCard icon={ClipboardCheck} label="Assessment Pending" value="89" change="+5%" color="text-amber-600" bg="bg-amber-50" />
        <StatCard icon={CalendarDays} label="Interviews Scheduled" value="52" change="+12%" color="text-teal-600" bg="bg-teal-50" />
        <StatCard icon={Send} label="Offers Sent" value="18" change="+8%" color="text-orange-600" bg="bg-orange-50" />
        <StatCard icon={CheckCircle} label="Interns Joined" value="14" change="+40%" color="text-green-600" bg="bg-green-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-[18px] border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Hiring Funnel</h3>
              <p className="text-xs text-slate-400 mt-0.5">Conversion across all stages</p>
            </div>
            <select className="text-xs text-slate-500 border border-slate-200 rounded-lg px-2.5 py-1.5 outline-none">
              <option>Dec 2024</option>
              <option>Nov 2024</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={FUNNEL_DATA} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="stage" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ border: "1px solid #F1F5F9", borderRadius: 12, fontSize: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}
                cursor={{ fill: "#F8FAFC" }}
              />
              <Bar dataKey="value" fill="#2563EB" radius={[6, 6, 0, 0]}>
                {FUNNEL_DATA.map((_, i) => (
                  <Cell key={i} fill={`hsl(${214 - i * 18}, ${80 - i * 5}%, ${50 + i * 3}%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-slate-900">By Department</h3>
            <button className="text-xs text-[#2563EB] font-medium hover:underline">View all</button>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={DEPT_DATA} innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {DEPT_DATA.map((_, i) => (
                  <Cell key={i} fill={DEPT_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ border: "1px solid #F1F5F9", borderRadius: 12, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {DEPT_DATA.slice(0, 4).map((d, i) => (
              <div key={d.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: DEPT_COLORS[i] }} />
                <span className="text-xs text-slate-600 flex-1">{d.name}</span>
                <span className="text-xs font-semibold text-slate-900">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-[18px] border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Monthly Trend</h3>
              <p className="text-xs text-slate-400 mt-0.5">Applications vs Hires</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={MONTHLY_DATA}>
              <defs>
                <linearGradient id="appGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="hireGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#14B8A6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ border: "1px solid #F1F5F9", borderRadius: 12, fontSize: 12 }} />
              <Area type="monotone" dataKey="applications" stroke="#2563EB" strokeWidth={2} fill="url(#appGrad)" name="Applications" />
              <Area type="monotone" dataKey="hired" stroke="#14B8A6" strokeWidth={2} fill="url(#hireGrad)" name="Hired" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold text-slate-900">Recent Activity</h3>
            <button className="text-xs text-[#2563EB] font-medium hover:underline">View all</button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((act, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full ${act.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <Activity className="w-3 h-3 text-white" />
                </div>
                <div>
                  <p className="text-xs text-slate-700 leading-snug">{act.text}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-semibold text-slate-900">Recent Candidates</h3>
          <button onClick={() => onNavigate("candidates")} className="text-xs text-[#2563EB] font-medium hover:underline flex items-center gap-1">
            View all <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                {["Candidate", "College", "Role", "Stage", "Rating", "Applied"].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide pb-3 pr-4">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CANDIDATES.slice(0, 5).map((c) => (
                <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <AvatarCircle initials={c.initials} color={c.color} size="sm" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{c.name}</p>
                        <p className="text-xs text-slate-400">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-sm text-slate-600">{c.college}</td>
                  <td className="py-3 pr-4 text-sm text-slate-600 max-w-[160px] truncate">{c.role}</td>
                  <td className="py-3 pr-4"><StageBadge stage={c.stage} /></td>
                  <td className="py-3 pr-4"><StarRating rating={c.rating} /></td>
                  <td className="py-3 text-xs text-slate-400">{c.appliedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Pipeline View ────────────────────────────────────────────────────────────

function PipelineView({ onCandidateClick }: { onCandidateClick: (c: Candidate) => void }) {
  const [boardCandidates, setBoardCandidates] = useState(CANDIDATES);
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [dragOverStage, setDragOverStage] = useState<Stage | null>(null);

  const STAGES: Stage[] = ["New", "Screening", "Assessment", "Interview", "Selected", "Offer Sent", "Joined"];

  const handleDrop = (stage: Stage) => {
    if (draggedId === null) return;
    setBoardCandidates((prev) => prev.map((c) => (c.id === draggedId ? { ...c, stage } : c)));
    setDraggedId(null);
    setDragOverStage(null);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <button className="text-xs font-semibold bg-[#2563EB] text-white px-3 py-1.5 rounded-lg">All Roles</button>
          {["Frontend", "Backend", "AI/ML", "Design", "HR"].map((r) => (
            <button key={r} className="text-xs font-medium text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">
              {r}
            </button>
          ))}
        </div>
        <button className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Filters
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4" style={{ minHeight: "calc(100vh - 220px)" }}>
        {STAGES.map((stage) => {
          const stageCandidates = boardCandidates.filter((c) => c.stage === stage);
          const isOver = dragOverStage === stage;
          return (
            <div
              key={stage}
              className="flex-shrink-0 w-[240px]"
              onDragOver={(e) => { e.preventDefault(); setDragOverStage(stage); }}
              onDragLeave={() => setDragOverStage(null)}
              onDrop={() => handleDrop(stage)}
            >
              <div className="flex items-center gap-2 mb-3 px-1">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: STAGE_HEX[stage] }} />
                <span className="text-sm font-semibold text-slate-700">{stage}</span>
                <span className="ml-auto text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-medium">
                  {stageCandidates.length}
                </span>
              </div>
              <div className={`flex flex-col gap-2.5 min-h-[80px] p-1.5 rounded-xl transition-all ${isOver ? "bg-blue-50/60" : ""}`}>
                {stageCandidates.map((c) => (
                  <div
                    key={c.id}
                    draggable
                    onDragStart={() => setDraggedId(c.id)}
                    onDragEnd={() => { setDraggedId(null); setDragOverStage(null); }}
                    onClick={() => onCandidateClick(c)}
                    className={`bg-white rounded-[14px] p-4 shadow-sm border border-slate-100 cursor-grab active:cursor-grabbing hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 ${draggedId === c.id ? "opacity-40 scale-95" : ""}`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <AvatarCircle initials={c.initials} color={c.color} size="sm" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-900 truncate">{c.name}</p>
                        <p className="text-xs text-slate-400 truncate mt-0.5">{c.role}</p>
                      </div>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="text-slate-300 hover:text-slate-500 transition-colors"
                      >
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-1.5 mb-3">
                      <GraduationCap className="w-3 h-3 text-slate-300" />
                      <p className="text-xs text-slate-400 truncate">{c.college}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <StarRating rating={c.rating} />
                      <span className="text-xs text-slate-300">{c.appliedDate.split(",")[0]}</span>
                    </div>
                  </div>
                ))}
                {stageCandidates.length === 0 && (
                  <div className={`h-20 border-2 border-dashed rounded-[14px] flex items-center justify-center transition-colors ${isOver ? "border-blue-300 bg-blue-50" : "border-slate-200"}`}>
                    <p className="text-xs text-slate-300">{isOver ? "Drop here" : "Empty"}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Candidates View ──────────────────────────────────────────────────────────

function CandidatesView({ onCandidateClick }: { onCandidateClick: (c: Candidate) => void }) {
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<Stage | "All">("All");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const STAGES_ALL: Array<Stage | "All"> = ["All", "New", "Screening", "Assessment", "Interview", "Selected", "Offer Sent", "Joined"];

  const filtered = CANDIDATES.filter((c) => {
    const q = search.toLowerCase();
    const matchesSearch = c.name.toLowerCase().includes(q) || c.college.toLowerCase().includes(q) || c.role.toLowerCase().includes(q) || c.department.toLowerCase().includes(q);
    const matchesStage = stageFilter === "All" || c.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2 flex-wrap">
            {STAGES_ALL.map((s) => (
              <button
                key={s}
                onClick={() => setStageFilter(s)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${stageFilter === s ? "bg-[#2563EB] text-white" : "text-slate-500 hover:bg-slate-100"}`}
              >
                {s}
                <span className="ml-1.5 opacity-70">
                  {s === "All" ? CANDIDATES.length : CANDIDATES.filter((c) => c.stage === s).length}
                </span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="text-sm pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#2563EB] transition-all w-48 placeholder:text-slate-400"
              />
            </div>
            <button className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 border border-slate-200 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors">
              <Filter className="w-3.5 h-3.5" />
              Filters
            </button>
            <button className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 border border-slate-200 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors">
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
          </div>
        </div>

        {selectedIds.length > 0 && (
          <div className="px-5 py-3 bg-blue-50 border-b border-blue-100 flex items-center gap-3">
            <span className="text-xs font-semibold text-blue-700">{selectedIds.length} selected</span>
            <div className="flex gap-2 ml-2">
              {["Move to Stage", "Send Assessment", "Reject", "Export"].map((action) => (
                <button key={action} className="text-xs font-medium text-blue-600 hover:text-blue-800 px-3 py-1 bg-white border border-blue-200 rounded-lg transition-colors">
                  {action}
                </button>
              ))}
            </div>
            <button onClick={() => setSelectedIds([])} className="ml-auto text-blue-400 hover:text-blue-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="pl-5 pr-3 py-3 text-left">
                  <input
                    type="checkbox"
                    onChange={(e) => setSelectedIds(e.target.checked ? filtered.map((c) => c.id) : [])}
                    checked={selectedIds.length === filtered.length && filtered.length > 0}
                    className="w-4 h-4 rounded border-slate-300 accent-[#2563EB]"
                  />
                </th>
                {["Candidate", "College", "Role", "Resume", "Stage", "Rating", "Applied", ""].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide py-3 pr-4">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors cursor-pointer"
                  onClick={() => onCandidateClick(c)}
                >
                  <td className="pl-5 pr-3 py-4" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(c.id)}
                      onChange={() => toggleSelect(c.id)}
                      className="w-4 h-4 rounded border-slate-300 accent-[#2563EB]"
                    />
                  </td>
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <AvatarCircle initials={c.initials} color={c.color} size="sm" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{c.name}</p>
                        <p className="text-xs text-slate-400">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 pr-4">
                    <p className="text-sm text-slate-700">{c.college}</p>
                    <p className="text-xs text-slate-400">{c.department}</p>
                  </td>
                  <td className="py-4 pr-4 max-w-[180px]">
                    <p className="text-sm text-slate-700 truncate">{c.role}</p>
                    <p className="text-xs text-slate-400">{c.year}</p>
                  </td>
                  <td className="py-4 pr-4">
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2563EB] hover:text-blue-800 transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      View
                    </button>
                  </td>
                  <td className="py-4 pr-4">
                    <StageBadge stage={c.stage} />
                  </td>
                  <td className="py-4 pr-4">
                    <StarRating rating={c.rating} />
                  </td>
                  <td className="py-4 pr-4 text-xs text-slate-400">{c.appliedDate}</td>
                  <td className="py-4 pr-4" onClick={(e) => e.stopPropagation()}>
                    <button className="text-slate-300 hover:text-slate-500 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <Users className="w-10 h-10 text-slate-200 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-400">No candidates found</p>
              <p className="text-xs text-slate-300 mt-1">Try adjusting your filters or search term.</p>
            </div>
          )}
        </div>

        <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400">Showing {filtered.length} of {CANDIDATES.length} candidates</p>
          <div className="flex items-center gap-2">
            <button className="text-xs text-slate-500 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">Previous</button>
            <button className="text-xs font-semibold bg-[#2563EB] text-white px-3 py-1.5 rounded-lg">1</button>
            <button className="text-xs text-slate-500 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">2</button>
            <button className="text-xs text-slate-500 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Candidate Profile View ───────────────────────────────────────────────────

function CandidateProfileView({ candidate: c, onBack }: { candidate: Candidate; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="p-6 flex gap-5" style={{ minHeight: "calc(100vh - 64px)" }}>
      <div className="flex-1 min-w-0 space-y-5">
        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-6">
          <div className="flex items-start gap-5">
            <AvatarCircle initials={c.initials} color={c.color} size="lg" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{c.name}</h2>
                  <p className="text-sm text-slate-500 mt-0.5">{c.role}</p>
                  <div className="flex items-center gap-4 mt-3 flex-wrap">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                      {c.college}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {c.location}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {c.phone}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <StageBadge stage={c.stage} />
                  <button className="text-slate-400 hover:text-slate-600 transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                {c.github && (
                  <a href="#" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors">
                    <Github className="w-3.5 h-3.5" />
                    GitHub
                  </a>
                )}
                <a href="#" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors">
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn
                </a>
                <a href="#" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors">
                  <Globe className="w-3.5 h-3.5" />
                  Portfolio
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex border-b border-slate-100">
            {["overview", "resume", "assessments", "timeline"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3.5 text-sm font-medium transition-colors capitalize ${activeTab === tab ? "text-[#2563EB] border-b-2 border-[#2563EB] bg-blue-50/40" : "text-slate-500 hover:text-slate-800"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <div className="p-6 space-y-6">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Personal Information</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Email", value: c.email },
                    { label: "Phone", value: c.phone },
                    { label: "College", value: c.college },
                    { label: "Department", value: c.department },
                    { label: "Year", value: c.year },
                    { label: "CGPA", value: String(c.cgpa) },
                    { label: "Experience", value: c.experience },
                    { label: "Applied Date", value: c.appliedDate },
                  ].map((field) => (
                    <div key={field.label}>
                      <p className="text-xs text-slate-400 mb-0.5">{field.label}</p>
                      <p className="text-sm font-medium text-slate-900">{field.value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {c.skills.map((skill) => (
                    <span key={skill} className="text-xs font-medium text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Education</p>
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                  <div className="w-9 h-9 bg-white rounded-xl border border-slate-200 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{c.college}</p>
                    <p className="text-xs text-slate-500">{c.department} · {c.year}</p>
                    <p className="text-xs text-slate-400 mt-0.5">CGPA: {c.cgpa} / 10</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "resume" && (
            <div className="p-6">
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-8 flex flex-col items-center justify-center" style={{ minHeight: 400 }}>
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-red-400" />
                </div>
                <p className="text-sm font-semibold text-slate-700 mb-1">{c.name} — Resume.pdf</p>
                <p className="text-xs text-slate-400 mb-5">Uploaded Dec 12, 2024 · 1.2 MB</p>
                <button className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
                  <Eye className="w-4 h-4" />
                  Open Resume
                </button>
              </div>
            </div>
          )}

          {activeTab === "assessments" && (
            <div className="p-6">
              {c.stage === "Assessment" || c.stage === "Interview" || c.stage === "Selected" || c.stage === "Joined" ? (
                <div className="space-y-4">
                  <div className="border border-slate-100 rounded-xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Full Stack Developer Assessment</p>
                        <p className="text-xs text-slate-400 mt-0.5">Sent Dec 16, 2024 · Due Dec 22, 2024</p>
                      </div>
                      <span className="text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-full">Submitted</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 bg-slate-100 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "82%" }} />
                      </div>
                      <span className="text-sm font-bold text-slate-900">82 / 100</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button className="text-xs font-medium text-[#2563EB] hover:text-blue-800 transition-colors">View Submission</button>
                      <span className="text-slate-200">·</span>
                      <button className="text-xs font-medium text-[#2563EB] hover:text-blue-800 transition-colors">Download Report</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <ClipboardCheck className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                  <p className="text-sm text-slate-400">No assessments assigned yet.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "timeline" && (
            <div className="p-6">
              <div className="relative">
                <div className="absolute left-4 top-4 bottom-4 w-px bg-slate-100" />
                <div className="space-y-5">
                  {[
                    { event: "Application Received", date: c.appliedDate, icon: FileText, color: "bg-blue-500" },
                    { event: "Resume Reviewed by " + c.recruiter, date: "Dec 14, 2024", icon: Eye, color: "bg-violet-500" },
                    c.stage !== "New" && c.stage !== "Screening" ? { event: "Assessment Sent", date: "Dec 16, 2024", icon: ClipboardCheck, color: "bg-amber-500" } : null,
                    c.stage === "Interview" || c.stage === "Selected" || c.stage === "Joined" ? { event: "Interview Scheduled", date: "Dec 20, 2024", icon: CalendarDays, color: "bg-teal-500" } : null,
                    c.stage === "Selected" || c.stage === "Offer Sent" || c.stage === "Joined" ? { event: "Candidate Selected", date: "Dec 22, 2024", icon: CheckCircle, color: "bg-green-500" } : null,
                    c.stage === "Joined" ? { event: "Intern Joined", date: "Jan 6, 2025", icon: Award, color: "bg-orange-500" } : null,
                  ].filter(Boolean).map((item, i) => {
                    if (!item) return null;
                    return (
                      <div key={i} className="flex items-start gap-4 relative pl-2">
                        <div className={`w-8 h-8 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0 z-10`}>
                          <item.icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="pt-1">
                          <p className="text-sm font-medium text-slate-900">{item.event}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{item.date}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-72 flex-shrink-0 space-y-4">
        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Quick Actions</p>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 text-sm font-medium text-white bg-green-500 hover:bg-green-600 px-4 py-2.5 rounded-xl transition-colors">
              <CheckCircle className="w-4 h-4" />
              Approve Resume
            </button>
            <button className="w-full flex items-center gap-3 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2.5 rounded-xl transition-colors">
              <XCircle className="w-4 h-4" />
              Reject Candidate
            </button>
            <button className="w-full flex items-center gap-3 text-sm font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 px-4 py-2.5 rounded-xl transition-colors">
              <ClipboardCheck className="w-4 h-4" />
              Assign Assessment
            </button>
            <button className="w-full flex items-center gap-3 text-sm font-medium text-violet-700 bg-violet-50 hover:bg-violet-100 px-4 py-2.5 rounded-xl transition-colors">
              <CalendarDays className="w-4 h-4" />
              Schedule Interview
            </button>
            <button className="w-full flex items-center gap-3 text-sm font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 px-4 py-2.5 rounded-xl transition-colors">
              <Award className="w-4 h-4" />
              Generate Offer Letter
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Rating</p>
            <button className="text-xs text-[#2563EB] font-medium">Edit</button>
          </div>
          <StarRating rating={c.rating} />
          <div className="mt-3 space-y-2">
            {[
              { label: "Technical Skills", val: 88 },
              { label: "Communication", val: 75 },
              { label: "Problem Solving", val: 90 },
            ].map((row) => (
              <div key={row.label}>
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>{row.label}</span>
                  <span className="font-medium">{row.val}%</span>
                </div>
                <div className="bg-slate-100 rounded-full h-1.5">
                  <div className="bg-[#2563EB] h-1.5 rounded-full transition-all" style={{ width: `${row.val}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Recruiter Notes</p>
            <button className="text-slate-300 hover:text-slate-500 transition-colors">
              <Edit className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">{c.notes}</p>
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
            <div className="w-6 h-6 bg-[#2563EB] rounded-lg flex items-center justify-center text-white text-[10px] font-bold">
              PK
            </div>
            <span className="text-xs text-slate-400">{c.recruiter}</span>
          </div>
        </div>

        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Assigned To</p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#2563EB] rounded-xl flex items-center justify-center text-white text-xs font-bold">
              PK
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">{c.recruiter}</p>
              <p className="text-xs text-slate-400">Lead Recruiter</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Assessments View ──────────────────────────────────────────────────────────

function AssessmentsView() {
  const [selected, setSelected] = useState<string | null>("Python Developer");
  const templates = [
    { name: "Python Developer", icon: Code, candidates: 12, submitted: 8, color: "bg-blue-500" },
    { name: "Full Stack", icon: Layers, candidates: 18, submitted: 14, color: "bg-violet-500" },
    { name: "UI/UX Design", icon: Palette, candidates: 7, submitted: 5, color: "bg-pink-500" },
    { name: "AI/ML", icon: Sparkles, candidates: 9, submitted: 7, color: "bg-indigo-500" },
    { name: "HR Intern", icon: Users, candidates: 5, submitted: 3, color: "bg-orange-500" },
    { name: "Marketing", icon: TrendingUp, candidates: 6, submitted: 4, color: "bg-teal-500" },
    { name: "Data Analytics", icon: BarChart2, candidates: 11, submitted: 9, color: "bg-green-500" },
  ];

  const submissions = [
    { name: "Aarav Mehta", college: "IIT Bombay", date: "Dec 19", score: 92, status: "Approved", color: "bg-blue-500", initials: "AM" },
    { name: "Priya Sharma", college: "NIT Trichy", date: "Dec 20", score: 78, status: "Pending", color: "bg-pink-500", initials: "PS" },
    { name: "Rohan Gupta", college: "BITS Pilani", date: "Dec 18", score: 96, status: "Approved", color: "bg-violet-500", initials: "RG" },
    { name: "Sneha Reddy", college: "IIT Hyderabad", date: "Dec 21", score: 65, status: "Rejected", color: "bg-teal-500", initials: "SR" },
  ];

  return (
    <div className="p-6 flex gap-5">
      <div className="w-64 flex-shrink-0 space-y-3">
        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Templates</p>
            <button className="w-6 h-6 bg-[#2563EB] rounded-lg flex items-center justify-center text-white hover:bg-[#1D4ED8] transition-colors">
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-1">
            {templates.map((t) => (
              <button
                key={t.name}
                onClick={() => setSelected(t.name)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${selected === t.name ? "bg-blue-50 text-[#2563EB]" : "text-slate-600 hover:bg-slate-50"}`}
              >
                <div className={`w-7 h-7 rounded-lg ${t.color} flex items-center justify-center flex-shrink-0`}>
                  <t.icon className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-xs font-medium flex-1 truncate">{t.name}</span>
                <span className="text-[10px] text-slate-400">{t.submitted}/{t.candidates}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 min-w-0 space-y-5">
        {selected && (
          <>
            <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-6">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h2 className="text-base font-bold text-slate-900">{selected} Assessment</h2>
                  <p className="text-xs text-slate-400 mt-0.5">3 tasks · Deadline: Dec 25, 2024</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-xs font-semibold text-slate-600 border border-slate-200 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5">
                    <Edit className="w-3.5 h-3.5" />
                    Edit
                  </button>
                  <button className="text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5" />
                    Send to Candidates
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: "Assigned", value: "12" },
                  { label: "Submitted", value: "8" },
                  { label: "Avg Score", value: "82%" },
                ].map((s) => (
                  <div key={s.label} className="bg-slate-50 rounded-xl p-4 text-center">
                    <p className="text-xl font-bold text-slate-900">{s.value}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {["Build a REST API with FastAPI and PostgreSQL", "Write unit tests with 80%+ coverage", "Dockerize the application"].map((task, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                    <span className="w-6 h-6 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-xs font-bold text-slate-500 flex-shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-sm text-slate-700">{task}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Submissions</h3>
              <div className="space-y-3">
                {submissions.map((s) => (
                  <div key={s.name} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <AvatarCircle initials={s.initials} color={s.color} size="sm" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900">{s.name}</p>
                      <p className="text-xs text-slate-400">{s.college} · Submitted {s.date}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-base font-bold text-slate-900">{s.score}</p>
                      <p className="text-[10px] text-slate-400">/ 100</p>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.status === "Approved" ? "bg-green-50 text-green-700" : s.status === "Rejected" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}>
                      {s.status}
                    </span>
                    <button className="text-xs font-medium text-[#2563EB] hover:text-blue-800 transition-colors flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      Review
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Interviews View ──────────────────────────────────────────────────────────

function InterviewsView() {
  const interviews = [
    { candidate: "Aarav Mehta", initials: "AM", color: "bg-blue-500", role: "Frontend Developer Intern", date: "Dec 26, 2024", time: "11:00 AM", platform: "Google Meet", interviewer: "Priya Kapoor", status: "Upcoming" },
    { candidate: "Tanya Kapoor", initials: "TK", color: "bg-indigo-500", role: "HR Intern", date: "Dec 28, 2024", time: "2:00 PM", platform: "Zoom", interviewer: "Meera Nair", status: "Upcoming" },
    { candidate: "Rohan Gupta", initials: "RG", color: "bg-violet-500", role: "AI/ML Intern", date: "Dec 22, 2024", time: "10:30 AM", platform: "Google Meet", interviewer: "Priya Kapoor", status: "Completed" },
    { candidate: "Priya Sharma", initials: "PS", color: "bg-pink-500", role: "Full Stack Developer Intern", date: "Dec 24, 2024", time: "3:00 PM", platform: "Teams", interviewer: "Rahul Verma", status: "Completed" },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-5">
        {["Upcoming", "Completed", "Cancelled"].map((tab) => (
          <button
            key={tab}
            className={`text-xs font-semibold px-4 py-2 rounded-xl transition-colors ${tab === "Upcoming" ? "bg-[#2563EB] text-white" : "text-slate-500 hover:bg-slate-100"}`}
          >
            {tab}
            <span className="ml-1.5 opacity-70">{tab === "Upcoming" ? 2 : tab === "Completed" ? 12 : 1}</span>
          </button>
        ))}
        <button className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] px-4 py-2 rounded-xl transition-colors">
          <Plus className="w-3.5 h-3.5" />
          Schedule Interview
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {interviews.map((iv, i) => (
          <div key={i} className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-5 hover:shadow-md transition-all">
            <div className="flex items-start gap-4">
              <AvatarCircle initials={iv.initials} color={iv.color} size="md" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{iv.candidate}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{iv.role}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${iv.status === "Upcoming" ? "bg-blue-50 text-blue-700" : "bg-green-50 text-green-700"}`}>
                    {iv.status}
                  </span>
                </div>
                <div className="flex items-center gap-5 mt-3">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <CalendarDays className="w-3.5 h-3.5 text-slate-400" />
                    {iv.date}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {iv.time}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Video className="w-3.5 h-3.5 text-slate-400" />
                    {iv.platform}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    {iv.interviewer}
                  </div>
                </div>
              </div>
              {iv.status === "Upcoming" && (
                <div className="flex gap-2 flex-shrink-0">
                  <button className="text-xs font-medium text-slate-500 border border-slate-200 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5" />
                    Reschedule
                  </button>
                  <button className="text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5" />
                    Send Invite
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Offer Letters View ───────────────────────────────────────────────────────

function OfferLettersView() {
  const [selectedTemplate, setSelectedTemplate] = useState("Frontend Developer Intern");
  const templates = [
    "Python Developer Intern", "Frontend Developer Intern", "Backend Developer Intern",
    "AI/ML Intern", "Data Analyst Intern", "UI/UX Designer Intern", "HR Intern", "Marketing Intern",
  ];

  return (
    <div className="p-6 flex gap-5">
      <div className="w-64 flex-shrink-0">
        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Templates</p>
            <button className="w-6 h-6 bg-[#2563EB] rounded-lg flex items-center justify-center text-white">
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-1">
            {templates.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTemplate(t)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all ${selectedTemplate === t ? "bg-blue-50 text-[#2563EB]" : "text-slate-600 hover:bg-slate-50"}`}
              >
                <Award className={`w-4 h-4 flex-shrink-0 ${selectedTemplate === t ? "text-[#2563EB]" : "text-slate-400"}`} />
                <span className="text-xs font-medium truncate">{t}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 min-w-0 space-y-4">
        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-slate-900">{selectedTemplate}</h2>
            <div className="flex gap-2">
              <button className="text-xs font-semibold text-slate-600 border border-slate-200 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5">
                <Copy className="w-3.5 h-3.5" />
                Duplicate
              </button>
              <button className="text-xs font-semibold text-white bg-[#14B8A6] hover:bg-teal-600 px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5" />
                Generate PDF
              </button>
              <button className="text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5" />
                Send via Email
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            {[
              { label: "Candidate Name", placeholder: "Karan Singh" },
              { label: "Internship Role", placeholder: selectedTemplate },
              { label: "Duration", placeholder: "3 months (Jan 6 – Apr 5, 2025)" },
              { label: "Joining Date", placeholder: "January 6, 2025" },
              { label: "Reporting Manager", placeholder: "Priya Kapoor" },
              { label: "Working Mode", placeholder: "Remote / Hybrid" },
            ].map((field) => (
              <div key={field.label}>
                <label className="text-xs font-medium text-slate-500 mb-1.5 block">{field.label}</label>
                <input
                  type="text"
                  defaultValue={field.placeholder}
                  className="w-full text-sm px-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#2563EB] transition-all"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Document Preview</p>
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-[#2563EB] px-8 py-5 flex items-center justify-between">
              <div>
                <p className="text-white font-bold text-lg">Acme Corp</p>
                <p className="text-blue-200 text-xs mt-0.5">acme.com · hello@acme.com</p>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-xl" />
            </div>
            <div className="p-8 space-y-4 bg-white">
              <p className="text-xs text-slate-400">January 6, 2025</p>
              <p className="text-xl font-bold text-slate-900">Internship Offer Letter</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Dear <span className="font-semibold text-slate-900">Karan Singh</span>,
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                We are pleased to offer you the position of <span className="font-semibold text-slate-900">{selectedTemplate}</span> at Acme Corp.
                Your internship will commence on <span className="font-semibold">January 6, 2025</span> and conclude on{" "}
                <span className="font-semibold">April 5, 2025</span> — a period of <span className="font-semibold">3 months</span>.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                You will report to <span className="font-semibold">Priya Kapoor</span> and work in a{" "}
                <span className="font-semibold">Remote / Hybrid</span> mode.
              </p>
              <div className="border border-slate-100 rounded-xl p-4 mt-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Internship Details</p>
                <div className="grid grid-cols-2 gap-3">
                  {[["Role", selectedTemplate], ["Start Date", "Jan 6, 2025"], ["Duration", "3 months"], ["Stipend", "₹25,000 / month"]].map(([k, v]) => (
                    <div key={k}>
                      <p className="text-xs text-slate-400">{k}</p>
                      <p className="text-sm font-medium text-slate-900">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-8">
                <div className="w-32 border-b border-slate-300 mb-1" />
                <p className="text-sm font-semibold text-slate-900">Priya Kapoor</p>
                <p className="text-xs text-slate-400">HR Lead, Acme Corp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Emails View ──────────────────────────────────────────────────────────────

function EmailsView() {
  const [selectedTemplate, setSelectedTemplate] = useState("Application Received");
  const templates = [
    { name: "Application Received", icon: Inbox, color: "text-blue-600 bg-blue-50" },
    { name: "Shortlisted", icon: CheckCircle, color: "text-teal-600 bg-teal-50" },
    { name: "Assessment Assigned", icon: ClipboardCheck, color: "text-amber-600 bg-amber-50" },
    { name: "Interview Invitation", icon: CalendarDays, color: "text-violet-600 bg-violet-50" },
    { name: "Congratulations", icon: Award, color: "text-green-600 bg-green-50" },
    { name: "Offer Letter", icon: FileText, color: "text-orange-600 bg-orange-50" },
    { name: "Welcome Onboard", icon: Sparkles, color: "text-pink-600 bg-pink-50" },
  ];

  const emailBodies: Record<string, string> = {
    "Application Received": "Thank you for applying to Acme Corp! We've received your application for {{role}} and our team will review it shortly. We'll be in touch within 5 business days.",
    "Shortlisted": "Congratulations! We've reviewed your application and are pleased to inform you that you've been shortlisted for the {{role}} position. Our recruiter will reach out with next steps.",
    "Assessment Assigned": "We'd like you to complete a technical assessment for the {{role}} position. Please find the assessment details attached. Deadline: {{deadline}}.",
    "Interview Invitation": "We'd like to invite you for an interview for the {{role}} position. Your interview is scheduled for {{date}} at {{time}} via {{platform}}. Meeting link: {{link}}",
    "Congratulations": "Congratulations! We're thrilled to inform you that you've been selected for the {{role}} internship at Acme Corp. Please find your offer letter in the next email.",
    "Offer Letter": "Dear {{name}}, please find attached your offer letter for the {{role}} internship at Acme Corp. Kindly review and confirm your acceptance by {{deadline}}.",
    "Welcome Onboard": "Welcome to Acme Corp, {{name}}! We're excited to have you join us as a {{role}} intern starting {{date}}. Please find your onboarding details and first-week schedule attached.",
  };

  return (
    <div className="p-6 flex gap-5">
      <div className="w-64 flex-shrink-0">
        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Templates</p>
            <button className="w-6 h-6 bg-[#2563EB] rounded-lg flex items-center justify-center text-white">
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-1">
            {templates.map((t) => (
              <button
                key={t.name}
                onClick={() => setSelectedTemplate(t.name)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${selectedTemplate === t.name ? "bg-blue-50 text-[#2563EB]" : "text-slate-600 hover:bg-slate-50"}`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${selectedTemplate === t.name ? "bg-blue-100" : t.color}`}>
                  <t.icon className={`w-3.5 h-3.5 ${selectedTemplate === t.name ? "text-[#2563EB]" : ""}`} />
                </div>
                <span className="text-xs font-medium truncate">{t.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 min-w-0 space-y-4">
        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-slate-900">{selectedTemplate}</h2>
            <div className="flex gap-2">
              <button className="text-xs font-semibold text-slate-600 border border-slate-200 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                Preview
              </button>
              <button className="text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5" />
                Send Email
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5 block">Subject</label>
              <input
                type="text"
                defaultValue={`[InternFlow] ${selectedTemplate} – Acme Corp`}
                className="w-full text-sm px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#2563EB] transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5 block">To</label>
              <input
                type="text"
                placeholder="Select candidates or enter email..."
                className="w-full text-sm px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#2563EB] transition-all placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5 block">Body</label>
              <textarea
                rows={8}
                defaultValue={emailBodies[selectedTemplate]}
                className="w-full text-sm px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#2563EB] transition-all resize-none leading-relaxed"
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Variables</p>
              <div className="flex flex-wrap gap-2">
                {["{{name}}", "{{role}}", "{{date}}", "{{deadline}}", "{{platform}}", "{{link}}"].map((v) => (
                  <span key={v} className="text-xs font-mono text-[#2563EB] bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Reports View ─────────────────────────────────────────────────────────────

function ReportsView() {
  return (
    <div className="p-6 space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Applications", value: "248", change: "+24%", color: "text-blue-600 bg-blue-50", icon: Users },
          { label: "Offer Acceptance Rate", value: "78%", change: "+5%", color: "text-green-600 bg-green-50", icon: CheckCircle },
          { label: "Avg Time to Offer", value: "18 days", change: "-3 days", color: "text-teal-600 bg-teal-50", icon: Clock },
          { label: "Sources: Organic", value: "64%", change: "+12%", color: "text-violet-600 bg-violet-50", icon: Globe },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${stat.color.split(" ")[1]}`}>
              <stat.icon className={`w-5 h-5 ${stat.color.split(" ")[0]}`} />
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
            <p className="text-xs text-green-600 font-medium mt-1">{stat.change} this month</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-5">Monthly Applications & Hires</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={MONTHLY_DATA}>
              <defs>
                <linearGradient id="appGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="hireGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#14B8A6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ border: "1px solid #F1F5F9", borderRadius: 12, fontSize: 12 }} />
              <Area type="monotone" dataKey="applications" stroke="#2563EB" strokeWidth={2} fill="url(#appGrad2)" name="Applications" />
              <Area type="monotone" dataKey="hired" stroke="#14B8A6" strokeWidth={2} fill="url(#hireGrad2)" name="Hired" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-5 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-[#2563EB] rounded" />
              <span className="text-xs text-slate-500">Applications</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-[#14B8A6] rounded" />
              <span className="text-xs text-slate-500">Hired</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-5">Applications by Department</h3>
          <div className="flex items-center">
            <ResponsiveContainer width="55%" height={200}>
              <PieChart>
                <Pie data={DEPT_DATA} innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {DEPT_DATA.map((_, i) => <Cell key={i} fill={DEPT_COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ border: "1px solid #F1F5F9", borderRadius: 12, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2.5">
              {DEPT_DATA.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: DEPT_COLORS[i] }} />
                  <span className="text-xs text-slate-600 flex-1">{d.name}</span>
                  <span className="text-xs font-bold text-slate-900">{d.value}</span>
                  <span className="text-[10px] text-slate-400 w-8 text-right">{Math.round(d.value / DEPT_DATA.reduce((a, b) => a + b.value, 0) * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-5">Applications by College</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={COLLEGE_DATA} barSize={32}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis dataKey="college" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ border: "1px solid #F1F5F9", borderRadius: 12, fontSize: 12 }} cursor={{ fill: "#F8FAFC" }} />
            <Bar dataKey="count" fill="#2563EB" radius={[6, 6, 0, 0]} name="Applications" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─── Settings View ────────────────────────────────────────────────────────────

function SettingsView() {
  const sections = [
    {
      title: "Company Profile",
      desc: "Update your company name, logo, and brand colors.",
      items: [
        { label: "Company Name", type: "text", value: "Acme Corp" },
        { label: "Website", type: "text", value: "https://acme.com" },
        { label: "HR Email", type: "email", value: "hr@acme.com" },
      ],
    },
    {
      title: "Google Integration",
      desc: "Manage your Google Workspace connection.",
      items: [],
    },
    {
      title: "Team & Roles",
      desc: "Manage recruiters and their access levels.",
      items: [],
    },
  ];

  const integrations = [
    { name: "Google Workspace", desc: "Forms, Sheets, Gmail, Calendar", status: "Connected", icon: Globe, color: "text-green-600 bg-green-50" },
    { name: "Google Meet", desc: "Video interviews via Meet", status: "Connected", icon: Video, color: "text-green-600 bg-green-50" },
    { name: "Zoom", desc: "Video interviews via Zoom", status: "Connect", icon: Video, color: "text-slate-500 bg-slate-50" },
    { name: "Microsoft Teams", desc: "Video interviews via Teams", status: "Connect", icon: MessageSquare, color: "text-slate-500 bg-slate-50" },
    { name: "SMTP Email", desc: "Custom email server", status: "Configure", icon: Mail, color: "text-slate-500 bg-slate-50" },
    { name: "Slack", desc: "Recruitment notifications to Slack", status: "Connect", icon: MessageSquare, color: "text-slate-500 bg-slate-50" },
  ];

  const team = [
    { name: "Priya Kapoor", email: "priya@acme.com", role: "Admin", initials: "PK", color: "bg-[#2563EB]" },
    { name: "Rahul Verma", email: "rahul@acme.com", role: "Recruiter", initials: "RV", color: "bg-violet-500" },
    { name: "Meera Nair", email: "meera@acme.com", role: "Recruiter", initials: "MN", color: "bg-teal-500" },
  ];

  return (
    <div className="p-6 max-w-4xl space-y-5">
      <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-6">
        <h2 className="text-sm font-bold text-slate-900 mb-1">Company Profile</h2>
        <p className="text-xs text-slate-400 mb-5">Update your organization details and branding.</p>
        <div className="flex items-center gap-5 mb-6 pb-5 border-b border-slate-100">
          <div className="w-16 h-16 bg-[#2563EB] rounded-2xl flex items-center justify-center text-white text-xl font-bold">A</div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Company Logo</p>
            <p className="text-xs text-slate-400 mt-0.5 mb-2">PNG or SVG · Max 2 MB</p>
            <button className="text-xs font-semibold text-[#2563EB] border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5" />
              Upload Logo
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Company Name", value: "Acme Corp" },
            { label: "Industry", value: "Technology" },
            { label: "Website", value: "https://acme.com" },
            { label: "HR Contact Email", value: "hr@acme.com" },
          ].map((field) => (
            <div key={field.label}>
              <label className="text-xs font-semibold text-slate-500 mb-1.5 block">{field.label}</label>
              <input
                type="text"
                defaultValue={field.value}
                className="w-full text-sm px-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#2563EB] transition-all"
              />
            </div>
          ))}
        </div>
        <button className="mt-4 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] px-4 py-2.5 rounded-xl transition-colors">
          Save Changes
        </button>
      </div>

      <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-6">
        <h2 className="text-sm font-bold text-slate-900 mb-1">Integrations</h2>
        <p className="text-xs text-slate-400 mb-5">Connect tools you already use.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {integrations.map((intg) => (
            <div key={intg.name} className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${intg.color.split(" ")[1]}`}>
                <intg.icon className={`w-5 h-5 ${intg.color.split(" ")[0]}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900">{intg.name}</p>
                <p className="text-xs text-slate-400 truncate">{intg.desc}</p>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${intg.status === "Connected" ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-500 cursor-pointer hover:bg-slate-200 transition-colors"}`}>
                {intg.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Team Members</h2>
            <p className="text-xs text-slate-400 mt-0.5">Manage recruiter access and roles.</p>
          </div>
          <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] px-3 py-2 rounded-xl transition-colors">
            <Plus className="w-3.5 h-3.5" />
            Invite Member
          </button>
        </div>
        <div className="space-y-3">
          {team.map((member) => (
            <div key={member.name} className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl">
              <div className={`w-9 h-9 rounded-xl ${member.color} flex items-center justify-center text-white text-xs font-bold`}>
                {member.initials}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900">{member.name}</p>
                <p className="text-xs text-slate-400">{member.email}</p>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${member.role === "Admin" ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-600"}`}>
                {member.role}
              </span>
              <button className="text-slate-300 hover:text-slate-500 transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [appView, setAppView] = useState<AppView>("landing");
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  if (appView === "landing") {
    return <LandingPage onGetStarted={() => setAppView("onboarding")} />;
  }

  if (appView === "onboarding") {
    return (
      <OnboardingWizard onComplete={() => { setAppView("app"); setCurrentPage("dashboard"); }} />
    );
  }

  const handleCandidateClick = (c: Candidate) => {
    setSelectedCandidate(c);
    setCurrentPage("candidate-profile");
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    if (page !== "candidate-profile") setSelectedCandidate(null);
  };

  const renderView = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardView onNavigate={handleNavigate} />;
      case "pipeline":
        return <PipelineView onCandidateClick={handleCandidateClick} />;
      case "candidates":
        return <CandidatesView onCandidateClick={handleCandidateClick} />;
      case "candidate-profile":
        return selectedCandidate ? (
          <CandidateProfileView candidate={selectedCandidate} onBack={() => handleNavigate("candidates")} />
        ) : null;
      case "assessments":
        return <AssessmentsView />;
      case "interviews":
        return <InterviewsView />;
      case "offer-letters":
        return <OfferLettersView />;
      case "emails":
        return <EmailsView />;
      case "reports":
        return <ReportsView />;
      case "settings":
        return <SettingsView />;
      default:
        return <DashboardView onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <TopNav currentPage={currentPage} onNavigate={handleNavigate} />
        <main className="flex-1 overflow-y-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
