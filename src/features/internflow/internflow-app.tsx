"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/components/auth/auth-context";
import { PageLoader } from "@/components/shared/page-loader";
import { canAccessPage } from "@/lib/auth-guards";
import { UXProvider } from "@/components/shared/ux-provider";
import { CANDIDATES } from "@/lib/internflow-data";
import type { Candidate, Page, AppView } from "@/types/internflow";

// ─── Feature imports ─────────────────────────────────────────────────────────
import { LandingPage } from "@/features/landing/landing-page";
import { OnboardingWizard } from "@/features/onboarding/onboarding-wizard";
import { Sidebar, TopNav } from "@/components/layouts/app-shell";
import { DashboardView } from "@/features/dashboard/dashboard-view";
import { PipelineView } from "@/features/pipeline/pipeline-view";
import { CandidatesView } from "@/features/candidates/candidates-view";
import { CandidateProfileView as CandidateProfileScreen } from "@/features/candidate/candidate-profile-view";
import { AssessmentsView } from "@/features/assessments/assessments-view";
import { InterviewsView } from "@/features/interviews/interviews-view";
import { OfferLettersView } from "@/features/offers/offers-view";
import { EmailsView } from "@/features/emails/emails-view";
import { ReportsView } from "@/features/reports/reports-view";
import { SettingsView } from "@/features/settings/settings-view";
import { CopilotPanel } from "@/features/copilot/copilot-panel";
import { useAppStore } from "@/store/app-store";

// ─── Types ───────────────────────────────────────────────────────────────────

type InternFlowAppProps = {
  initialAppView?: AppView;
  initialPage?: Page;
  initialCandidate?: Candidate | null;
};

// ─── Main App ────────────────────────────────────────────────────────────────

export function InternFlowApp({
  initialAppView = "landing",
  initialPage = "dashboard",
  initialCandidate = null,
}: InternFlowAppProps = {}) {
  const [appView, setAppView] = useState<AppView>(initialAppView);
  const [currentPage, setCurrentPage] = useState<Page>(initialPage);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(initialCandidate);
  const router = useRouter();
  const auth = useAuthContext();

  useEffect(() => {
    if (auth.isLoading) return;
    if (!auth.isAuthenticated && appView === "app") router.replace("/login");
  }, [auth.isAuthenticated, auth.isLoading, appView, router]);

  useEffect(() => {
    if (auth.isLoading || !auth.user) return;
    if (appView !== "app") return;
    if (!canAccessPage(auth.user.role, currentPage)) {
      router.replace("/403");
    }
  }, [auth.isLoading, auth.user, appView, currentPage, router]);

  if (auth.isLoading) {
    return <PageLoader />;
  }

  // ─── Views ────────────────────────────────────────────────────────────────

  if (appView === "landing") {
    return <LandingPage onGetStarted={() => setAppView("onboarding")} />;
  }

  if (appView === "onboarding") {
    return (
      <OnboardingWizard
        onComplete={() => {
          setAppView("app");
          setCurrentPage("dashboard");
        }}
      />
    );
  }

  const handleCandidateClick = (c: Candidate) => {
    setSelectedCandidate(c);
    setCurrentPage("candidate-profile");
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    if (page !== "candidate-profile") setSelectedCandidate(null);
  };

  const renderView = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardView onNavigate={handleNavigate} />;
      case "pipeline":
        return <PipelineView onCandidateClick={handleCandidateClick} />;
      case "candidates":
        return <CandidatesView onCandidateClick={handleCandidateClick} />;
      case "candidate-profile":
        return selectedCandidate ? (
          <CandidateProfileScreen
            key={selectedCandidate.id}
            candidate={selectedCandidate}
            onBack={() => handleNavigate("candidates")}
          />
        ) : null;
      case "assessments":
        return <AssessmentsView />;
      case "interviews":
        return <InterviewsView />;
      case "offer-letters":
        return <OfferLettersView />;
      case "emails":
        return <EmailsView />;
      case "reports":
        return <ReportsView />;
      case "settings":
        return <SettingsView />;
      default:
        return <DashboardView onNavigate={handleNavigate} />;
    }
  };

  return (
    <UXProvider onNavigate={handleNavigate}>
      <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
        <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <TopNav currentPage={currentPage} onNavigate={handleNavigate} />
          <main className="flex-1 overflow-y-auto">{renderView()}</main>
        </div>
        <CopilotPanel onCandidateClick={(id) => { const c = CANDIDATES.find((x) => x.id === id); if (c) handleCandidateClick(c); }} />
      </div>
    </UXProvider>
  );
}

export default InternFlowApp;
