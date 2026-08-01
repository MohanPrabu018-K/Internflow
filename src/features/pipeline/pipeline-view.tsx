"use client";

import { useState } from "react";
import { MoreHorizontal, GraduationCap, SlidersHorizontal } from "lucide-react";
import { AvatarCircle, StarRating } from "@/components/shared/candidate-primitives";
import { CANDIDATES } from "@/lib/internflow-data";
import type { Candidate, Stage } from "@/types/internflow";

const STAGE_HEX: Record<Stage, string> = {
  "New": "#94A3B8", "Screening": "#3B82F6", "Assessment": "#F59E0B",
  "Interview": "#8B5CF6", "Selected": "#14B8A6", "Offer Sent": "#F97316", "Joined": "#22C55E",
};

export function PipelineView({ onCandidateClick }: { onCandidateClick: (c: Candidate) => void }) {
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
          <button onClick={() => setBoardCandidates(CANDIDATES)} className="text-xs font-semibold bg-[#2563EB] text-white px-3 py-1.5 rounded-lg">All Roles</button>
          {["Frontend", "Backend", "AI/ML", "Design", "HR"].map((r) => (
            <button key={r} onClick={() => setBoardCandidates(CANDIDATES.filter((c) => c.role.toLowerCase().includes(r.toLowerCase())))} className="text-xs font-medium text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">{r}</button>
          ))}
        </div>
        <button onClick={() => setBoardCandidates(CANDIDATES)} className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">
          <SlidersHorizontal className="w-3.5 h-3.5" /> Clear Filters
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4" style={{ minHeight: "calc(100vh - 220px)" }}>
        {STAGES.map((stage) => {
          const stageCandidates = boardCandidates.filter((c) => c.stage === stage);
          const isOver = dragOverStage === stage;
          return (
            <div key={stage} className="flex-shrink-0 w-[240px]" onDragOver={(e) => { e.preventDefault(); setDragOverStage(stage); }} onDragLeave={() => setDragOverStage(null)} onDrop={() => handleDrop(stage)}>
              <div className="flex items-center gap-2 mb-3 px-1">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: STAGE_HEX[stage] }} />
                <span className="text-sm font-semibold text-slate-700">{stage}</span>
                <span className="ml-auto text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-medium">{stageCandidates.length}</span>
              </div>
              <div className={`flex flex-col gap-2.5 min-h-[80px] p-1.5 rounded-xl transition-all ${isOver ? "bg-blue-50/60" : ""}`}>
                {stageCandidates.map((c) => (
                  <div key={c.id} draggable onDragStart={() => setDraggedId(c.id)} onDragEnd={() => { setDraggedId(null); setDragOverStage(null); }} onClick={() => onCandidateClick(c)} className={`bg-white rounded-[14px] p-4 shadow-sm border border-slate-100 cursor-grab active:cursor-grabbing hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 ${draggedId === c.id ? "opacity-40 scale-95" : ""}`}>
                    <div className="flex items-start gap-3 mb-3">
                      <AvatarCircle initials={c.initials} color={c.color} size="sm" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-900 truncate">{c.name}</p>
                        <p className="text-xs text-slate-400 truncate mt-0.5">{c.role}</p>
                      </div>
                      <button onClick={(e) => e.stopPropagation()} className="text-slate-300 hover:text-slate-500 transition-colors"><MoreHorizontal className="w-3.5 h-3.5" /></button>
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
