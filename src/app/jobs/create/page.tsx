"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { Sparkles, Send, Copy, CheckCircle } from "lucide-react";
import { JobDescriptionService } from "@/services/ai/job-description.service";
import type { JobDescription } from "@/types/ai";

const ROLES = ["Frontend Developer Intern", "Backend Developer Intern", "Full Stack Developer Intern", "AI/ML Intern", "Data Analyst Intern", "UI/UX Designer Intern"];
const DEPTS = ["Engineering", "Design", "Data Science", "Marketing", "HR"];

function JobsCreateView() {
  const [title, setTitle] = useState("Frontend Developer Intern");
  const [department, setDepartment] = useState("Engineering");
  const [skills, setSkills] = useState("React, TypeScript, JavaScript, HTML, CSS");
  const [experience, setExperience] = useState("0-6 months");
  const [stipend, setStipend] = useState("₹20,000 / month");
  const [location, setLocation] = useState("Remote");
  const [jd, setJd] = useState<JobDescription | null>(null);
  const [loading, setLoading] = useState(false);
  const [posted, setPosted] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const result = await JobDescriptionService.generate(title, department, skills.split(",").map((s) => s.trim()), experience, stipend, location);
    setJd(result);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl">
      <h2 className="text-lg font-bold text-slate-900 mb-5">AI Job Description Generator</h2>
      <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-6 mb-5">
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div><label className="text-xs font-semibold text-slate-500 mb-1.5 block">Role</label><select value={title} onChange={(e) => setTitle(e.target.value)} className="w-full text-sm px-3 py-2.5 border border-slate-200 rounded-xl">{ROLES.map((r) => <option key={r}>{r}</option>)}</select></div>
          <div><label className="text-xs font-semibold text-slate-500 mb-1.5 block">Department</label><select value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full text-sm px-3 py-2.5 border border-slate-200 rounded-xl">{DEPTS.map((d) => <option key={d}>{d}</option>)}</select></div>
          <div className="col-span-2"><label className="text-xs font-semibold text-slate-500 mb-1.5 block">Skills (comma separated)</label><input value={skills} onChange={(e) => setSkills(e.target.value)} className="w-full text-sm px-3 py-2.5 border border-slate-200 rounded-xl" /></div>
          <div><label className="text-xs font-semibold text-slate-500 mb-1.5 block">Experience</label><input value={experience} onChange={(e) => setExperience(e.target.value)} className="w-full text-sm px-3 py-2.5 border border-slate-200 rounded-xl" /></div>
          <div><label className="text-xs font-semibold text-slate-500 mb-1.5 block">Stipend</label><input value={stipend} onChange={(e) => setStipend(e.target.value)} className="w-full text-sm px-3 py-2.5 border border-slate-200 rounded-xl" /></div>
          <div className="col-span-2"><label className="text-xs font-semibold text-slate-500 mb-1.5 block">Location</label><input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full text-sm px-3 py-2.5 border border-slate-200 rounded-xl" /></div>
        </div>
        <button onClick={handleGenerate} disabled={loading} className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2">{loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Sparkles className="w-4 h-4" />}{loading ? "Generating..." : "Generate JD with AI"}</button>
      </div>

      {jd && (
        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-6">
          <h3 className="text-base font-bold text-slate-900 mb-1">{jd.title}</h3>
          <p className="text-xs text-slate-400 mb-4">{jd.department} · {jd.location} · {jd.stipend} · {jd.experience}</p>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">{jd.description}</p>
          <div className="mb-4"><p className="text-xs font-semibold text-slate-400 uppercase mb-2">Required Skills</p><div className="flex flex-wrap gap-1.5">{jd.skills.map((s) => <span key={s} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">{s}</span>)}</div></div>
          <div className="mb-4"><p className="text-xs font-semibold text-slate-400 uppercase mb-2">Responsibilities</p><ul className="space-y-1">{jd.responsibilities.map((r, i) => <li key={i} className="text-xs text-slate-600 flex items-start gap-2"><span className="text-[#2563EB] mt-0.5">•</span>{r}</li>)}</ul></div>
          <div className="mb-5"><p className="text-xs font-semibold text-slate-400 uppercase mb-2">Qualifications</p><ul className="space-y-1">{jd.qualifications.map((q, i) => <li key={i} className="text-xs text-slate-600 flex items-start gap-2"><CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />{q}</li>)}</ul></div>
          <div className="flex gap-2">
            <button onClick={() => setPosted(true)} className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1.5"><Send className="w-3.5 h-3.5" />{posted ? "Posted!" : "Publish Job"}</button>
            <button className="border border-slate-200 text-slate-600 text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-slate-50 flex items-center gap-1.5"><Copy className="w-3.5 h-3.5" />Copy</button>
          </div>
          {posted && <div className="mt-4 bg-green-50 rounded-xl p-3 flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /><p className="text-xs text-green-700">Job posted to LinkedIn, Naukri, Indeed, and Internshala!</p></div>}
        </div>
      )}
    </div>
  );
}

export default function JobsCreatePage() {
  return <ProtectedRoute><DashboardLayout><JobsCreateView /></DashboardLayout></ProtectedRoute>;
}
