"use client";

import { useMemo, useState } from "react";
import { Modal } from "./modal";
import { Search } from "./search";
import type { Page } from "@/types/internflow";

export function CommandPalette({
  open,
  onOpenChange,
  onNavigate,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (page: Page) => void;
}) {
  const [query, setQuery] = useState("");
  const items = useMemo<Array<{ label: string; page: Page; shortcut: string }>>(
    () => [
      { label: "Dashboard", page: "dashboard", shortcut: "D" },
      { label: "Candidates", page: "candidates", shortcut: "C" },
      { label: "Pipeline", page: "pipeline", shortcut: "P" },
      { label: "Assessments", page: "assessments", shortcut: "A" },
      { label: "Interviews", page: "interviews", shortcut: "I" },
      { label: "Offers", page: "offer-letters", shortcut: "O" },
      { label: "Reports", page: "reports", shortcut: "R" },
      { label: "Emails", page: "emails", shortcut: "E" },
      { label: "Settings", page: "settings", shortcut: "S" },
    ],
    [],
  );

  const visibleQuery = open ? query : "";
  const filtered = items.filter((item) => item.label.toLowerCase().includes(visibleQuery.toLowerCase()));

  return (
    <Modal open={open}>
      <div className="w-full max-w-xl rounded-3xl bg-white p-4 shadow-2xl" role="dialog" aria-modal="true" aria-label="Command palette">
        <Search value={visibleQuery} onChange={(e) => setQuery(e.target.value)} placeholder="Type a command or search a page..." aria-label="Command search" />
        <div className="mt-4 max-h-[60vh] space-y-1 overflow-y-auto">
          {filtered.map((item) => (
            <button
              key={item.page}
              type="button"
              onClick={() => {
                onNavigate(item.page);
                onOpenChange(false);
              }}
              className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition-colors hover:bg-slate-50"
            >
              <span>{item.label}</span>
              <span className="rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-500">{item.shortcut}</span>
            </button>
          ))}
          {filtered.length === 0 ? <p className="px-4 py-6 text-sm text-slate-400">No matching commands.</p> : null}
        </div>
      </div>
    </Modal>
  );
}
