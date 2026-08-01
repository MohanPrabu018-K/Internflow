"use client";

import { useState } from "react";
import { Plus, Edit, Send, Eye, Code, Layers, Palette, Sparkles, Users, TrendingUp, BarChart2 } from "lucide-react";
import { AvatarCircle } from "@/components/shared/candidate-primitives";
import { AssessmentGeneratorService } from "@/services/ai/assessment-generator.service";
import type { AssessmentType, Difficulty } from "@/types/ai";

export function AssessmentsView() {
  const [selected, setSelected] = useState<string | null>("Python Developer");
  const [showGenerator, setShowGenerator] = useState(false);
  const [genRole, setGenRole] = useState("Python Developer");
  const [genType, setGenType] = useState<AssessmentType>("MCQ");
  const [genDifficulty, setGenDifficulty] = useState<Difficulty>("Medium");
  const [genCount, setGenCount] = useState(10);
  const [genLoading, setGenLoading] = useState(false);
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

  const handleGenerate = async () => {
    setGenLoading(true);
    await AssessmentGeneratorService.generate(genRole, genType, genDifficulty, genCount);
    setGenLoading(false);
    setShowGenerator(false);
    alert(`Assessment generated: ${genCount} ${genType} questions for ${genRole} (${genDifficulty})`);
  };

  return (
    <div className="p-6 flex gap-5">
      <div className="w-64 flex-shrink-0 space-y-3">
        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Templates</p>
            <button className="w-6 h-6 bg-[#2563EB] rounded-lg flex items-center justify-center text-white hover:bg-[#1D4ED8] transition-colors"><Plus className="w-3.5 h-3.5" /></button>
          </div>
          <div className="space-y-1">
            {templates.map((t) => (
              <button key={t.name} onClick={() => setSelected(t.name)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${selected === t.name ? "bg-blue-50 text-[#2563EB]" : "text-slate-600 hover:bg-slate-50"}`}>
                <div className={`w-7 h-7 rounded-lg ${t.color} flex items-center justify-center flex-shrink-0`}><t.icon className="w-3.5 h-3.5 text-white" /></div>
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
                <div><h2 className="text-base font-bold text-slate-900">{selected} Assessment</h2><p className="text-xs text-slate-400 mt-0.5">3 tasks · Deadline: Dec 25, 2024</p></div>
                <div className="flex gap-2">
                  <button onClick={() => setShowGenerator(!showGenerator)} className="text-xs font-semibold text-slate-600 border border-slate-200 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" />Generate with AI</button>
                  <button onClick={() => alert("Edit assessment: " + selected)} className="text-xs font-semibold text-slate-600 border border-slate-200 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5"><Edit className="w-3.5 h-3.5" />Edit</button>
                  <button onClick={() => alert("Assessment sent to candidates!")} className="text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5"><Send className="w-3.5 h-3.5" />Send to Candidates</button>
                </div>
              </div>

              {showGenerator && (
                <div className="bg-blue-50 rounded-xl p-4 mb-5 space-y-3">
                  <p className="text-xs font-semibold text-blue-700">AI Assessment Generator</p>
                  <div className="grid grid-cols-4 gap-2">
                    <select value={genRole} onChange={(e) => setGenRole(e.target.value)} className="text-xs border border-blue-200 rounded-lg px-2 py-1.5 outline-none bg-white">{templates.map((t) => <option key={t.name}>{t.name}</option>)}</select>
                    <select value={genType} onChange={(e) => setGenType(e.target.value as AssessmentType)} className="text-xs border border-blue-200 rounded-lg px-2 py-1.5 outline-none bg-white"><option>MCQ</option><option>Coding</option><option>SQL</option><option>Aptitude</option><option>Technical</option></select>
                    <select value={genDifficulty} onChange={(e) => setGenDifficulty(e.target.value as Difficulty)} className="text-xs border border-blue-200 rounded-lg px-2 py-1.5 outline-none bg-white"><option>Easy</option><option>Medium</option><option>Hard</option></select>
                    <input type="number" value={genCount} onChange={(e) => setGenCount(Number(e.target.value))} min={5} max={50} className="text-xs border border-blue-200 rounded-lg px-2 py-1.5 outline-none bg-white" />
                  </div>
                  <button onClick={handleGenerate} disabled={genLoading} className="text-xs font-semibold bg-[#2563EB] text-white px-4 py-2 rounded-lg">{genLoading ? "Generating..." : "Generate Assessment"}</button>
                </div>
              )}

              <div className="grid grid-cols-3 gap-3 mb-5">
                {[{ label: "Assigned", value: "12" }, { label: "Submitted", value: "8" }, { label: "Avg Score", value: "82%" }].map((s) => (
                  <div key={s.label} className="bg-slate-50 rounded-xl p-4 text-center"><p className="text-xl font-bold text-slate-900">{s.value}</p><p className="text-xs text-slate-400 mt-0.5">{s.label}</p></div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Submissions</h3>
              <div className="space-y-3">
                {submissions.map((s) => (
                  <div key={s.name} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <AvatarCircle initials={s.initials} color={s.color} size="sm" />
                    <div className="flex-1"><p className="text-sm font-semibold text-slate-900">{s.name}</p><p className="text-xs text-slate-400">{s.college} · Submitted {s.date}</p></div>
                    <div className="text-center"><p className="text-base font-bold text-slate-900">{s.score}</p><p className="text-[10px] text-slate-400">/ 100</p></div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.status === "Approved" ? "bg-green-50 text-green-700" : s.status === "Rejected" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}>{s.status}</span>
                    <button onClick={() => alert(`Reviewing ${s.name}'s submission`)} className="text-xs font-medium text-[#2563EB] hover:text-blue-800 transition-colors flex items-center gap-1"><Eye className="w-3.5 h-3.5" />Review</button>
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
