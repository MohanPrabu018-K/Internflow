"use client";

import { useState } from "react";
import {
  GitBranch, ArrowRight, Sparkles, Video,
  Star, ChevronDown, Shield, Check, ChevronRight,
  FileText, Eye, ClipboardCheck, CalendarDays, Award,
  Mail, BarChart2, Users, Zap,
} from "lucide-react";

// ─── Landing Nav ─────────────────────────────────────────────────────────────

export function LandingNav({ onGetStarted }: { onGetStarted: () => void }) {
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
          <button onClick={onGetStarted} className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors px-4 py-2">
            Sign In
          </button>
          <button onClick={onGetStarted} className="text-sm font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-4 py-2 rounded-xl transition-colors">
            Start Free
          </button>
        </div>
      </div>
    </nav>
  );
}

// ─── Dashboard Mockup ────────────────────────────────────────────────────────

export function DashboardMockup() {
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
            <div key={label} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${active ? "bg-blue-50 text-blue-600" : "text-slate-500"}`}>
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
                  <div className={`w-5 h-5 rounded-lg text-white text-[8px] font-bold flex items-center justify-center ${["bg-blue-500", "bg-pink-500", "bg-violet-500"][i]}`}>
                    {name[0]}
                  </div>
                  <span className="text-[10px] text-slate-600 flex-1 truncate">{name}</span>
                  <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-medium ${["bg-violet-50 text-violet-600", "bg-amber-50 text-amber-600", "bg-teal-50 text-teal-600"][i]}`}>
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

// ─── Hero ────────────────────────────────────────────────────────────────────

export function HeroSection({ onGetStarted }: { onGetStarted: () => void }) {
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
            <button onClick={onGetStarted} className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300">
              Start Free
              <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={onGetStarted} className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 font-semibold px-6 py-3.5 rounded-xl transition-all">
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

// ─── Trusted By ──────────────────────────────────────────────────────────────

export function TrustedBySection() {
  const companies = ["Google", "Microsoft", "Razorpay", "Zerodha", "CRED", "Swiggy", "Meesho", "Groww"];
  return (
    <section className="py-12 px-6 border-y border-slate-100 bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest text-center mb-8">Trusted by leading companies</p>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
          {companies.map((c) => (
            <span key={c} className="text-lg font-bold text-slate-300 hover:text-slate-400 transition-colors cursor-default">{c}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features ────────────────────────────────────────────────────────────────

export function FeaturesSection() {
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
          <p className="text-lg text-slate-500 max-w-xl mx-auto">From first application to first day — InternFlow handles the entire internship recruitment lifecycle.</p>
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

// ─── Workflow ────────────────────────────────────────────────────────────────

export function WorkflowSection() {
  const steps = [
    { stage: "Application", desc: "Candidates apply through your Google Form. Data flows automatically into InternFlow.", icon: FileText, color: "bg-blue-500" },
    { stage: "Screening", desc: "Recruiters review resumes, add ratings and notes, and shortlist candidates.", icon: Eye, color: "bg-violet-500" },
    { stage: "Assessment", desc: "Send role-specific tests with deadlines. Review submissions and score them inline.", icon: ClipboardCheck, color: "bg-amber-500" },
    { stage: "Interview", desc: "Schedule interviews with Google Meet / Zoom links sent automatically via email.", icon: CalendarDays, color: "bg-teal-500" },
    { stage: "Offer Letter", desc: "Generate personalized offer letters from templates and send directly to candidates.", icon: Award, color: "bg-orange-500" },
    { stage: "Onboarding", desc: "Send welcome emails and onboarding instructions. Mark intern as Joined.", icon: Check, color: "bg-green-500" },
  ];
  return (
    <section id="workflow" className="py-24 px-6 bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-[#2563EB] uppercase tracking-widest mb-3">Workflow</p>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">From application to onboarding</h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">A structured, end-to-end recruitment pipeline designed specifically for internship hiring.</p>
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

// ─── Pricing ─────────────────────────────────────────────────────────────────

export function PricingSection({ onGetStarted }: { onGetStarted: () => void }) {
  const plans = [
    { name: "Starter", price: "₹3,999", period: "/ month", desc: "Perfect for early-stage startups running their first internship drive.", features: ["Up to 100 applications", "Google Forms sync", "Resume screening", "Basic assessments", "Email templates", "2 recruiter seats"], cta: "Start Free Trial", highlight: false as const },
    { name: "Growth", price: "₹9,999", period: "/ month", desc: "For growing companies with regular internship programmes.", features: ["Up to 1,000 applications", "Everything in Starter", "Offer letter generator", "Interview scheduling", "Analytics dashboard", "10 recruiter seats", "Priority support"], cta: "Start Free Trial", highlight: true as const },
    { name: "Enterprise", price: "Custom", period: "", desc: "For large organizations hiring hundreds of interns per season.", features: ["Unlimited applications", "Everything in Growth", "Custom integrations", "HRMS sync", "Dedicated account manager", "SLA guarantee", "Unlimited seats"], cta: "Contact Sales", highlight: false as const },
  ];
  return (
    <section id="pricing" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-[#2563EB] uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Simple, transparent pricing</h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">No hidden fees. Cancel any time. 14-day free trial on all plans.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.name} className={`rounded-[22px] p-8 border flex flex-col ${plan.highlight ? "bg-[#2563EB] border-blue-600 shadow-2xl shadow-blue-200 scale-105" : "bg-white border-slate-100 shadow-sm"}`}>
              <div className="mb-6">
                <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${plan.highlight ? "text-blue-200" : "text-slate-400"}`}>{plan.name}</p>
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
              <button onClick={onGetStarted} className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${plan.highlight ? "bg-white text-blue-600 hover:bg-blue-50" : "bg-[#2563EB] text-white hover:bg-[#1D4ED8]"}`}>{plan.cta}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ────────────────────────────────────────────────────────────

export function TestimonialsSection() {
  const testimonials = [
    { quote: "InternFlow cut our internship hiring time by 60%. What used to take 3 weeks now takes 5 days. The pipeline board is incredibly intuitive.", name: "Meera Iyer", title: "Head of Talent, Razorpay", avatar: "MI", color: "bg-blue-500" },
    { quote: "The Google Forms integration is seamless. We just paste our form link and every response shows up as a candidate card — it just works.", name: "Arjun Krishnan", title: "HR Manager, CRED", avatar: "AK", color: "bg-violet-500" },
    { quote: "Offer letter generation alone saves us hours per cohort. Beautiful templates, auto-filled variables, sent via email in one click.", name: "Priyanka Desai", title: "Talent Ops Lead, Swiggy", avatar: "PD", color: "bg-teal-500" },
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
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${t.color} flex items-center justify-center text-white text-xs font-bold`}>{t.avatar}</div>
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

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export function FAQSection() {
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
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)} className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors">
                <span className="text-sm font-semibold text-slate-900">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 flex-shrink-0 ml-4 transition-transform duration-200 ${openIdx === i ? "rotate-180" : ""}`} />
              </button>
              {openIdx === i && <div className="px-6 pb-4 text-sm text-slate-500 leading-relaxed">{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

export function FooterSection({ onGetStarted }: { onGetStarted: () => void }) {
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
            <p className="text-sm text-slate-400 leading-relaxed mb-5 max-w-xs">The complete internship ATS for modern HR teams. Hire better interns, faster.</p>
            <button onClick={onGetStarted} className="text-sm font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-2.5 rounded-xl transition-colors">Start Free Today</button>
          </div>
          {[
            { title: "Product", links: ["Features", "Workflow", "Pricing", "Changelog", "Roadmap"] },
            { title: "Resources", links: ["Documentation", "API Reference", "Blog", "Case Studies"] },
            { title: "Company", links: ["About", "Careers", "Contact", "Privacy Policy", "Terms"] },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((link) => <li key={link}><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">{link}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© 2024 InternFlow. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Shield className="w-4 h-4 text-slate-500" />
            <span className="text-xs text-slate-500">SOC 2 Compliant</span>
            <Shield className="w-4 h-4 text-slate-500" />
            <span className="text-xs text-slate-500">256-bit Encryption</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Landing Page ────────────────────────────────────────────────────────────

export function LandingPage({ onGetStarted }: { onGetStarted: () => void }) {
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
