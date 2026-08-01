import type { ReactNode } from "react";

export function BaseLayout({
  children,
  background = "#F8FAFC",
}: {
  children: ReactNode;
  background?: string;
}) {
  return (
    <main className="min-h-screen" style={{ background }}>
      {children}
    </main>
  );
}
