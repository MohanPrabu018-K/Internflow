"use client";

import { Bell, ChevronLeft, Plus, Search } from "lucide-react";
import { Notifications } from "./notifications";

export function TopNavbar({
  title,
  onBack,
  onAdd,
}: {
  title: string;
  onBack?: () => void;
  onAdd?: () => void;
}) {
  return (
    <header className="flex h-16 flex-shrink-0 items-center gap-4 border-b border-slate-100 bg-white px-6">
      <div className="flex flex-1 items-center gap-2">
        {onBack ? (
          <button type="button" onClick={onBack} aria-label="Go back" className="mr-1 flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-slate-700">
            <ChevronLeft className="h-4 w-4" />
          </button>
        ) : null}
        <h1 className="text-sm font-semibold text-slate-900">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search candidates, roles..."
            aria-label="Search candidates, roles"
            className="w-64 rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <Notifications />
        {onAdd ? (
          <button type="button" onClick={onAdd} className="inline-flex items-center gap-1.5 rounded-xl bg-[#2563EB] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1D4ED8]">
            <Plus className="h-3.5 w-3.5" />
            Add Candidate
          </button>
        ) : null}
      </div>
    </header>
  );
}
