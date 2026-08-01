"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

type ToastTone = "success" | "error" | "info";
interface ToastItem { id: number; title: string; message?: string; tone?: ToastTone; }
interface ToastContextValue { toast: (toast: Omit<ToastItem, "id">) => void; }

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef<number[]>([]);
  const api = useMemo(() => ({
    toast: (toast: Omit<ToastItem, "id">) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, ...toast }]);
      const timer = window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
      timers.current.push(timer);
    },
  }), []);

  useEffect(() => () => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
  }, []);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div aria-live="polite" aria-atomic="true" className="fixed bottom-4 right-4 z-50 flex w-full max-w-sm flex-col gap-2">
        {toasts.map((toast) => (
          <div key={toast.id} className="rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-xl transition-all duration-200">
            <p className="text-sm font-semibold text-slate-950">{toast.title}</p>
            {toast.message ? <p className="mt-1 text-xs text-slate-500">{toast.message}</p> : null}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
