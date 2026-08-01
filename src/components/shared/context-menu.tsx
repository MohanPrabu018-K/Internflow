"use client";

import { useState, type ReactNode } from "react";

export function ContextMenu({ trigger, children }: { trigger: ReactNode; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-flex" onContextMenu={(e) => { e.preventDefault(); setOpen((v) => !v); }}>
      {trigger}
      {open ? <div className="absolute z-30 mt-2 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl">{children}</div> : null}
    </div>
  );
}
