"use client";

import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { SchedulerCalendar } from "@/features/scheduler/scheduler-calendar";

export default function SchedulerPage() {
  return <ProtectedRoute><DashboardLayout><SchedulerCalendar candidateId={1} onSchedule={() => {}} /></DashboardLayout></ProtectedRoute>;
}
