"use client";

import dynamic from "next/dynamic";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { CANDIDATES } from "@/lib/internflow-data";
import type { Page } from "@/types/internflow";
import { notFound, useParams } from "next/navigation";
import { PageLoader } from "@/components/shared/page-loader";

const InternFlowApp = dynamic(
  () => import("@/features/internflow/internflow-app").then((mod) => mod.InternFlowApp),
  { ssr: false, loading: () => <PageLoader /> },
);

export default function CandidatePage() {
  const params = useParams<{ id: string }>();
  const candidate = CANDIDATES.find((item) => String(item.id) === params.id);
  if (!candidate) notFound();
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <InternFlowApp initialAppView="app" initialPage={"candidate-profile" as Page} initialCandidate={candidate} />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
