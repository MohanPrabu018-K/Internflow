"use client";

import { useState, type ReactNode } from "react";
import { CommandPalette } from "./command-palette";
import { ToastProvider } from "./toast";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import type { Page } from "@/types/internflow";

export function UXProvider({
  children,
  onNavigate,
}: {
  children: ReactNode;
  onNavigate: (page: Page) => void;
}) {
  const [commandOpen, setCommandOpen] = useState(false);
  useKeyboardShortcuts([
    { key: "k", meta: true, handler: () => setCommandOpen(true) },
    { key: "/", handler: () => setCommandOpen(true) },
  ]);

  return (
    <ToastProvider>
      {children}
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} onNavigate={onNavigate} />
    </ToastProvider>
  );
}
