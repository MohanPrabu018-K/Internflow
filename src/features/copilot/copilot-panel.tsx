"use client";

import { useState } from "react";
import { Sparkles, Send, X, Loader2, ExternalLink } from "lucide-react";
import { RecruiterCopilotService } from "@/services/ai/recruiter-copilot.service";
import { useAppStore } from "@/store/app-store";
import type { CopilotResult } from "@/types/ai";

export function CopilotPanel({ onCandidateClick }: { onCandidateClick: (id: number) => void }) {
  const { copilotOpen, setCopilotOpen } = useAppStore();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CopilotResult | null>(null);
  const [history, setHistory] = useState<string[]>([
    "Show React candidates with CGPA above 8",
    "Recommend top 5 for interview today",
    "Find Python developers in pipeline",
  ]);

  if (!copilotOpen) return null;

  const handleQuery = async (q: string) => {
    const searchQuery = q || query;
    if (!searchQuery.trim()) return;
    setLoading(true);
    const res = await RecruiterCopilotService.processQuery(searchQuery);
    setResult(res);
    setHistory((prev) => [searchQuery, ...prev.filter((h) => h !== searchQuery)].slice(0, 10));
    setLoading(false);
    setQuery("");
  };

  return (
    <div className="fixed right-0 top-0 bottom-0 w-[380px] max-w-[100vw] bg-white dark:bg-slate-900 border-l border-slate-100 dark:border-slate-800 shadow-2xl z-50 flex flex-col">
      <div className="flex items-center justify-between px-4 h-14 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#2563EB]" />
          <span className="text-sm font-bold text-slate-900 dark:text-slate-100">AI Copilot</span>
        </div>
        <button onClick={() => setCopilotOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"><X className="w-4 h-4 text-slate-400" /></button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {!result && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Try asking</p>
            {history.map((h, i) => (
              <button key={i} onClick={() => handleQuery(h)} className="w-full text-left text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 px-3 py-2 rounded-xl transition-colors">
                {h}
              </button>
            ))}
          </div>
        )}

        {result && (
          <div className="space-y-3">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3">
              <p className="text-xs text-slate-500 dark:text-slate-400">{result.explanation}</p>
              <p className="text-[10px] text-slate-400 mt-1">{result.totalMatches} total matches</p>
            </div>
            {result.candidates.map((c) => (
              <button key={c.id} onClick={() => onCandidateClick(c.id)} className="w-full text-left bg-slate-50 dark:bg-slate-800 rounded-xl p-3 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{c.name}</span>
                  <span className="text-xs font-bold text-[#2563EB]">{c.score}%</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{c.role}</p>
                <p className="text-xs text-slate-400 mt-1">{c.matchReason}</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-3 h-3" /> View Profile
                </div>
              </button>
            ))}
            <button onClick={() => setResult(null)} className="w-full text-xs text-slate-400 hover:text-slate-600 py-2">← New Search</button>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex gap-2">
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleQuery(query)} placeholder="Ask AI anything about candidates..." className="flex-1 text-sm px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 dark:text-slate-200 placeholder:text-slate-400" />
          <button onClick={() => handleQuery(query)} disabled={loading || !query.trim()} className="w-10 h-10 bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl flex items-center justify-center disabled:opacity-50 transition-colors">
            {loading ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : <Send className="w-4 h-4 text-white" />}
          </button>
        </div>
      </div>
    </div>
  );
}
