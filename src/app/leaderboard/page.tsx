"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { Trophy, TrendingUp, TrendingDown, Minus, ArrowUp } from "lucide-react";
import { CandidateRankingService } from "@/services/ai/candidate-ranking.service";
import type { CandidateLeaderboardEntry } from "@/types/ai";

function LeaderboardView() {
  const [entries, setEntries] = useState<CandidateLeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { CandidateRankingService.getLeaderboard().then((e) => { setEntries(e); setLoading(false); }); }, []);

  return (
    <div className="p-6 max-w-5xl">
      <div className="flex items-center gap-3 mb-5"><Trophy className="w-5 h-5 text-amber-500" /><h2 className="text-lg font-bold text-slate-900">Candidate Leaderboard</h2><span className="text-xs text-slate-400">AI-Powered Ranking</span></div>
      {loading ? <div className="text-center py-16"><div className="w-10 h-10 border-4 border-blue-200 border-t-[#2563EB] rounded-full animate-spin mx-auto" /></div> : (
        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full"><thead><tr className="border-b border-slate-100 bg-slate-50/50">{["Rank","Candidate","Role","Resume","Assessment","Interview","Coding","Total","Trend"].map((h) => <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide py-3 px-4">{h}</th>)}</tr></thead>
            <tbody>{entries.slice(0, 20).map((e) => (
              <tr key={e.candidateId} className="border-b border-slate-50 hover:bg-slate-50/50">
                <td className="py-3 px-4"><span className={`text-sm font-bold ${e.rank <= 3 ? "text-amber-500" : "text-slate-400"}`}>#{e.rank}</span></td>
                <td className="py-3 px-4"><p className="text-sm font-semibold text-slate-900">{e.name}</p></td>
                <td className="py-3 px-4 text-xs text-slate-500 max-w-[160px] truncate">{e.role}</td>
                <td className="py-3 px-4 text-xs font-semibold text-slate-700">{e.resumeScore}</td>
                <td className="py-3 px-4 text-xs font-semibold text-slate-700">{e.assessmentScore}</td>
                <td className="py-3 px-4 text-xs font-semibold text-slate-700">{e.interviewScore}</td>
                <td className="py-3 px-4 text-xs font-semibold text-slate-700">{e.codingScore}</td>
                <td className="py-3 px-4"><span className="text-sm font-bold text-[#2563EB]">{e.totalScore}</span></td>
                <td className="py-3 px-4">{e.trend === "up" ? <ArrowUp className="w-3.5 h-3.5 text-green-500" /> : e.trend === "down" ? <TrendingDown className="w-3.5 h-3.5 text-red-500" /> : <Minus className="w-3.5 h-3.5 text-slate-300" />}</td>
              </tr>
            ))}</tbody></table>
        </div>
      )}
    </div>
  );
}

export default function LeaderboardPage() {
  return <ProtectedRoute><DashboardLayout><LeaderboardView /></DashboardLayout></ProtectedRoute>;
}
