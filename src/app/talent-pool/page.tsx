"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { Search, Users } from "lucide-react";
import { DuplicateDetectorService } from "@/services/ai/duplicate-detector.service";
import type { TalentPoolEntry } from "@/types/ai";

function TalentPoolView() {
  const [entries, setEntries] = useState<TalentPoolEntry[]>([]);
  const [search, setSearch] = useState("");
  useEffect(() => { DuplicateDetectorService.getTalentPool().then(setEntries); }, []);
  const filtered = search ? entries.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()) || e.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()))) : entries;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div><h2 className="text-lg font-bold text-slate-900">Talent Pool</h2><p className="text-xs text-slate-400 mt-0.5">Archived candidates available for future hiring</p></div>
        <div className="relative"><Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or skills..." className="text-sm pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl w-64" /></div>
      </div>
      {entries.length === 0 && <div className="py-20 text-center bg-white rounded-[18px] border border-slate-100"><Users className="w-10 h-10 text-slate-200 mx-auto mb-3" /><p className="text-sm text-slate-400">No archived candidates</p></div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((e) => (
          <div key={e.candidateId} className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-5">
            <div className="flex items-start justify-between mb-3"><div><p className="text-sm font-bold text-slate-900">{e.name}</p><p className="text-xs text-slate-400">{e.email}</p></div><span className="text-xs font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded-full">{e.aiRelevanceScore}%</span></div>
            <div className="flex flex-wrap gap-1.5 mb-3">{e.skills.slice(0, 5).map((s) => <span key={s} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{s}</span>)}</div>
            <div className="flex items-center justify-between text-xs text-slate-400"><span>{e.lastStage}</span><span>⭐ {e.lastRating}/5</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TalentPoolPage() {
  return <ProtectedRoute><DashboardLayout><TalentPoolView /></DashboardLayout></ProtectedRoute>;
}
