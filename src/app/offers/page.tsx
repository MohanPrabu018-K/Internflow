"use client";

import dynamic from "next/dynamic";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { PageLoader } from "@/components/shared/page-loader";

const InternFlowApp = dynamic(
  () => import("@/features/internflow/internflow-app").then((mod) => mod.InternFlowApp),
  { ssr: false, loading: () => <PageLoader /> },
);

export default function OffersPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <InternFlowApp initialAppView="app" initialPage="offer-letters" />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
