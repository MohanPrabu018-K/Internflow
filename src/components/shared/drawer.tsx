"use client";

import type { ReactNode } from "react";

export function Drawer({ open, children }: { open: boolean; children: ReactNode }) {
  if (!open) return null;
  return <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl">{children}</div>;
}
