"use client";

import dynamic from "next/dynamic";
import { LandingLayout } from "@/components/layouts/landing-layout";
import { PageLoader } from "@/components/shared/page-loader";

const InternFlowApp = dynamic(
  () => import("@/features/internflow/internflow-app").then((mod) => mod.InternFlowApp),
  { ssr: false, loading: () => <PageLoader /> },
);

export default function Page() {
  return (
    <LandingLayout>
      <InternFlowApp />
    </LandingLayout>
  );
}
