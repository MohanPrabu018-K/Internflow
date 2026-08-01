"use client";

import { useState, type ReactNode } from "react";

export function Dropdown({
  trigger,
  children,
}: {
  trigger: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-flex">
      <button onClick={() => setOpen((v) => !v)}>{trigger}</button>
      {open ? (
        <div className="absolute right-0 top-full z-30 mt-2 min-w-48 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl">
          <div onClick={() => setOpen(false)}>{children}</div>
        </div>
      ) : null}
    </div>
  );
}
