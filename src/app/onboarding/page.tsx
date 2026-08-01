"use client";

import dynamic from "next/dynamic";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { AuthLayout } from "@/components/layouts/auth-layout";
import { PageLoader } from "@/components/shared/page-loader";

const InternFlowApp = dynamic(
  () => import("@/features/internflow/internflow-app").then((mod) => mod.InternFlowApp),
  { ssr: false, loading: () => <PageLoader /> },
);

export default function OnboardingPage() {
  return (
    <ProtectedRoute>
      <AuthLayout>
        <InternFlowApp initialAppView="onboarding" />
      </AuthLayout>
    </ProtectedRoute>
  );
}
