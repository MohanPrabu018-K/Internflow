import type { ReactNode } from "react";

export function DataTable({ children }: { children: ReactNode }) {
  return <div className="overflow-hidden rounded-[18px] border border-slate-100 bg-white shadow-sm">{children}</div>;
}

export function Pagination({ children }: { children: ReactNode }) {
  return <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4">{children}</div>;
}
