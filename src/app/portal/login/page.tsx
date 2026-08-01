"use client";

import dynamic from "next/dynamic";
import { AuthLayout } from "@/components/layouts/auth-layout";
import { PageLoader } from "@/components/shared/page-loader";

const CandidatePortalApp = dynamic(() => import("@/features/portal/candidate-portal-app").then((m) => m.CandidatePortalApp), { ssr: false, loading: () => <PageLoader /> });

export default function PortalLoginPage() {
  return <AuthLayout><CandidatePortalApp /></AuthLayout>;
}
