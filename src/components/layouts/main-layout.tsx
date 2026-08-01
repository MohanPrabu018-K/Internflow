import type { ReactNode } from "react";
import { BaseLayout } from "./base-layout";

export function MainLayout({ children }: { children: ReactNode }) {
  return <BaseLayout>{children}</BaseLayout>;
}
