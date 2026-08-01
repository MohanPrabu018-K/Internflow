"use client";

import { useParams, useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { CodingPlatform } from "@/features/coding/coding-platform";

export default function CodingChallengePage() {
  const params = useParams<{ challengeId: string }>();
  const router = useRouter();
  return <ProtectedRoute><DashboardLayout><CodingPlatform challengeId={params.challengeId} onBack={() => router.push("/assessments")} /></DashboardLayout></ProtectedRoute>;
}
