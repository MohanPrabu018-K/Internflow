"use client";

import type { ReactNode } from "react";

export function Modal({ open, children }: { open: boolean; children: ReactNode }) {
  if (!open) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">{children}</div>;
}
