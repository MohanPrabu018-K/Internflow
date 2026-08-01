import type { ReactNode } from "react";
import { BaseLayout } from "./base-layout";

export function AuthLayout({ children }: { children: ReactNode }) {
  return <BaseLayout>{children}</BaseLayout>;
}
