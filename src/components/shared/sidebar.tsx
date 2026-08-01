"use client";

import type { ElementType } from "react";
import { ChevronDown, GitBranch } from "lucide-react";
import type { Page } from "@/types/internflow";

export function Sidebar({
  currentPage,
  items,
  onNavigate,
}: {
  currentPage: Page;
  items: Array<{ id: Page; label: string; icon: ElementType }>;
  onNavigate: (page: Page) => void;
}) {
  return (
    <aside className="flex h-full w-[240px] flex-shrink-0 flex-col border-r border-slate-100 bg-white">
      <div className="flex h-16 items-center gap-2.5 border-b border-slate-100 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#2563EB] text-white">
          <GitBranch className="h-4 w-4" />
        </div>
        <span className="text-base font-bold text-slate-900">InternFlow</span>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        <div className="space-y-0.5">
          {items.map((item) => {
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                aria-current={active ? "page" : undefined}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all ${active ? "bg-blue-50 text-[#2563EB]" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
              >
                <item.icon className={`h-4 w-4 flex-shrink-0 ${active ? "text-[#2563EB]" : "text-slate-400"}`} />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>
      <div className="border-t border-slate-100 p-3">
        <button type="button" className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-slate-50">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#2563EB] text-xs font-bold text-white">PK</div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-900">Priya Kapoor</p>
            <p className="truncate text-xs text-slate-400">priya@acme.com</p>
          </div>
          <ChevronDown className="h-3.5 w-3.5 flex-shrink-0 text-slate-400" />
        </button>
      </div>
    </aside>
  );
}
