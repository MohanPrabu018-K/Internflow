import type { ReactNode } from "react";
import { MainLayout } from "./main-layout";

export function DashboardLayout({ children }: { children: ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
