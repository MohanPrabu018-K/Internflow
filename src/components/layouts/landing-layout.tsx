import type { ReactNode } from "react";
import { BaseLayout } from "./base-layout";

export function LandingLayout({ children }: { children: ReactNode }) {
  return <BaseLayout background="#FFFFFF">{children}</BaseLayout>;
}
