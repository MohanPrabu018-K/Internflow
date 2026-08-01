"use client";

import { Search, Filter, Download, MoreHorizontal, Users, FileText, X } from "lucide-react";
import { AvatarCircle, StageBadge, StarRating } from "@/components/shared/candidate-primitives";
import { useCandidateManagement } from "@/hooks/use-candidate-management";
import type { CandidateFilterState } from "@/types/candidate-management";
import type { Candidate, Stage } from "@/types/internflow";

const CANDIDATE_STAGES_ALL: Array<Stage | "All"> = ["All", "New", "Screening", "Assessment", "Interview", "Selected", "Offer Sent", "Joined"];

const CANDIDATE_SORT_OPTIONS: Array<{ label: string; value: CandidateFilterState["sortBy"] }> = [
  { label: "Name", value: "name" }, { label: "Email", value: "email" },
  { label: "College", value: "college" }, { label: "Role", value: "role" },
  { label: "Stage", value: "stage" }, { label: "Rating", value: "rating" },
  { label: "Applied Date", value: "appliedDate" },
];

export function CandidatesView({ onCandidateClick }: { onCandidateClick: (c: Candidate) => void }) {
  const { state, filters, setFilters, selectedIds, setSelectedIds, paginated } = useCandidateManagement();
  const visiblePages = Math.max(1, Math.ceil(state.total / filters.pageSize));

  const updateFilters = (patch: Partial<CandidateFilterState>) => {
    setFilters((prev) => ({ ...prev, page: 1, ...patch }));
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleExport = () => alert("Export " + paginated.length + " candidates as CSV");
  const handleBulkAction = (action: string) => alert(action + " " + selectedIds.length + " selected candidates");

  return (
    <div className="p-6">
      <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2 flex-wrap">
            {CANDIDATE_STAGES_ALL.map((s) => (
              <button key={s} type="button" onClick={() => updateFilters({ stage: s })} className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${filters.stage === s ? "bg-[#2563EB] text-white" : "text-slate-500 hover:bg-slate-100"}`}>
                {s}<span className="ml-1.5 opacity-70">{s === "All" ? state.total : state.candidates.filter((c) => c.stage === s).length}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <select aria-label="Sort candidates" value={filters.sortBy} onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as CandidateFilterState["sortBy"] }))} className="text-xs text-slate-500 border border-slate-200 rounded-xl px-3 py-2 outline-none bg-white">
              {CANDIDATE_SORT_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
            <button type="button" onClick={() => setFilters((prev) => ({ ...prev, sortOrder: prev.sortOrder === "asc" ? "desc" : "asc" }))} className="text-xs font-medium text-slate-500 border border-slate-200 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors">{filters.sortOrder === "asc" ? "Asc" : "Desc"}</button>
            <div className="relative"><Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" /><input type="text" value={filters.search} onChange={(e) => updateFilters({ search: e.target.value })} placeholder="Search..." className="text-sm pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#2563EB] transition-all w-48 placeholder:text-slate-400" /></div>
            <button type="button" onClick={() => updateFilters({})} className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 border border-slate-200 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors"><Filter className="w-3.5 h-3.5" />Reset</button>
            <button type="button" onClick={handleExport} className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 border border-slate-200 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors"><Download className="w-3.5 h-3.5" />Export</button>
          </div>
        </div>
        {selectedIds.length > 0 && (
          <div className="px-5 py-3 bg-blue-50 border-b border-blue-100 flex items-center gap-3">
            <span className="text-xs font-semibold text-blue-700">{selectedIds.length} selected</span>
            <div className="flex gap-2 ml-2 flex-wrap">
              {["Approve", "Reject", "Move Stage", "Export"].map((action) => <button type="button" key={action} onClick={() => handleBulkAction(action)} className="text-xs font-medium text-blue-600 hover:text-blue-800 px-3 py-1 bg-white border border-blue-200 rounded-lg transition-colors">{action}</button>)}
            </div>
            <button type="button" onClick={() => setSelectedIds([])} className="ml-auto text-blue-400 hover:text-blue-600"><X className="w-4 h-4" /></button>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-slate-100 bg-slate-50/50"><th className="pl-5 pr-3 py-3 text-left"><input type="checkbox" onChange={(e) => setSelectedIds(e.target.checked ? paginated.map((c) => c.id) : [])} checked={selectedIds.length === paginated.length && paginated.length > 0} className="w-4 h-4 rounded border-slate-300 accent-[#2563EB]" /></th>{["Candidate","College","Role","Resume","Stage","Rating","Applied",""].map((h) => <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide py-3 pr-4">{h}</th>)}</tr></thead>
            <tbody>
              {paginated.map((c) => (
                <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => onCandidateClick(c)}>
                  <td className="pl-5 pr-3 py-4" onClick={(e) => e.stopPropagation()}><input type="checkbox" checked={selectedIds.includes(c.id)} onChange={() => toggleSelect(c.id)} className="w-4 h-4 rounded border-slate-300 accent-[#2563EB]" /></td>
                  <td className="py-4 pr-4"><div className="flex items-center gap-3"><AvatarCircle initials={c.initials} color={c.color} size="sm" /><div><p className="text-sm font-semibold text-slate-900">{c.name}</p><p className="text-xs text-slate-400">{c.email}</p></div></div></td>
                  <td className="py-4 pr-4"><p className="text-sm text-slate-700">{c.college}</p><p className="text-xs text-slate-400">{c.department}</p></td>
                  <td className="py-4 pr-4 max-w-[180px]"><p className="text-sm text-slate-700 truncate">{c.role}</p><p className="text-xs text-slate-400">{c.year}</p></td>
                  <td className="py-4 pr-4"><button type="button" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2563EB] hover:text-blue-800 transition-colors"><FileText className="w-3.5 h-3.5" />View</button></td>
                  <td className="py-4 pr-4"><StageBadge stage={c.stage} /></td>
                  <td className="py-4 pr-4"><StarRating rating={c.rating} /></td>
                  <td className="py-4 pr-4 text-xs text-slate-400">{c.appliedDate}</td>
                  <td className="py-4 pr-4" onClick={(e) => e.stopPropagation()}><button type="button" className="text-slate-300 hover:text-slate-500 transition-colors"><MoreHorizontal className="w-4 h-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
          {paginated.length === 0 && <div className="py-16 text-center"><Users className="w-10 h-10 text-slate-200 mx-auto mb-3" /><p className="text-sm font-semibold text-slate-400">No candidates found</p><p className="text-xs text-slate-300 mt-1">Try adjusting your filters or search term.</p></div>}
        </div>
        <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400">Showing {paginated.length} of {state.total} candidates</p>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setFilters((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }))} className="text-xs text-slate-500 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">Previous</button>
            <button type="button" className="text-xs font-semibold bg-[#2563EB] text-white px-3 py-1.5 rounded-lg">{filters.page}</button>
            <button type="button" onClick={() => setFilters((prev) => ({ ...prev, page: Math.min(visiblePages, prev.page + 1) }))} className="text-xs text-slate-500 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
