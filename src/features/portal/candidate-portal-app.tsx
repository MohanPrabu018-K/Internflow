"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle, Clock, FileText, CalendarDays, Award, User, LogIn } from "lucide-react";
import type { Candidate } from "@/types/internflow";
import { CANDIDATES } from "@/lib/internflow-data";
import { AvatarCircle, StageBadge } from "@/components/shared/candidate-primitives";

// ─── Candidate Portal ─────────────────────────────────────────────────────────
// Self-service portal for applicants to track their application.

export function CandidatePortalApp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const found = CANDIDATES.find((c) => c.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCandidate(found);
      setLoggedIn(true);
    }
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-[#2563EB] rounded-xl flex items-center justify-center mx-auto mb-4">
              <User className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Candidate Portal</h1>
            <p className="text-sm text-slate-500 mt-1">Track your application status</p>
          </div>
          <form onSubmit={handleLogin} className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-6 space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="w-full text-sm px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#2563EB]" required />
            </div>
            <button type="submit" className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
              <LogIn className="w-4 h-4" /> View My Application
            </button>
            <p className="text-xs text-slate-400 text-center">Enter the email you used when applying</p>
            <button onClick={() => router.push("/")} className="w-full text-xs text-slate-500 hover:text-slate-700 py-2">← Back to Home</button>
          </form>
        </div>
      </div>
    );
  }

  if (!candidate) return null;

  const stages: Array<{ label: string; key: string; icon: typeof FileText; done: boolean }> = [
    { label: "Application", key: "New", icon: FileText, done: true },
    { label: "Resume Review", key: "Screening", icon: FileText, done: candidate.stage !== "New" },
    { label: "Assessment", key: "Assessment", icon: Award, done: ["Assessment","Interview","Selected","Offer Sent","Joined"].includes(candidate.stage) },
    { label: "Interview", key: "Interview", icon: CalendarDays, done: ["Interview","Selected","Offer Sent","Joined"].includes(candidate.stage) },
    { label: "Selection", key: "Selected", icon: CheckCircle, done: ["Selected","Offer Sent","Joined"].includes(candidate.stage) },
    { label: "Offer", key: "Offer Sent", icon: Award, done: ["Offer Sent","Joined"].includes(candidate.stage) },
    { label: "Joined", key: "Joined", icon: User, done: candidate.stage === "Joined" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-2xl mx-auto p-6">
        <button onClick={() => { setLoggedIn(false); setCandidate(null); }} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-6">
          <ArrowLeft className="w-4 h-4" /> Logout
        </button>

        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-6 mb-5">
          <div className="flex items-center gap-4">
            <AvatarCircle initials={candidate.initials} color={candidate.color} size="lg" />
            <div>
              <h2 className="text-xl font-bold text-slate-900">{candidate.name}</h2>
              <p className="text-sm text-slate-500">{candidate.role}</p>
              <StageBadge stage={candidate.stage} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-6 mb-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2"><Clock className="w-4 h-4 text-[#2563EB]" /> Application Timeline</h3>
          <div className="space-y-4">
            {stages.map((stage, i) => (
              <div key={stage.key} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${stage.done ? "bg-green-500" : "bg-slate-200"}`}>
                  {stage.done ? <CheckCircle className="w-4 h-4 text-white" /> : <stage.icon className="w-4 h-4 text-slate-400" />}
                </div>
                <div className={`flex-1 ${i < stages.length - 1 ? "pb-4 border-l-2 border-dashed ml-3.5 pl-5" : "pl-0"} ${stage.done ? "border-green-200" : "border-slate-200"}`}>
                  <p className={`text-sm font-semibold ${stage.done ? "text-slate-900" : "text-slate-400"}`}>{stage.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{stage.done ? "Completed" : candidate.stage === stage.key ? "In Progress" : "Pending"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {candidate.stage === "Interview" && (
          <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Interview Schedule</h3>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
              <CalendarDays className="w-5 h-5 text-blue-600" />
              <div><p className="text-sm font-semibold text-slate-900">Upcoming Interview</p><p className="text-xs text-slate-500">Dec 26, 2024 at 11:00 AM via Google Meet</p></div>
            </div>
          </div>
        )}

        {candidate.stage === "Offer Sent" && (
          <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Offer Letter</h3>
            <p className="text-xs text-slate-500 mb-3">Your offer letter is ready. Please review and accept.</p>
            <div className="flex gap-2">
              <button className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-xl">Accept Offer</button>
              <button className="border border-slate-200 text-slate-600 text-sm font-semibold px-4 py-2 rounded-xl hover:bg-slate-50">Download PDF</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
