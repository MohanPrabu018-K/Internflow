import { AuthLayout } from "@/components/layouts/auth-layout";
import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <AuthLayout>
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-md rounded-[22px] border border-slate-100 bg-white p-8 text-center shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">403</p>
          <h1 className="mt-3 text-2xl font-semibold text-slate-950">Access denied</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">You do not have permission to view this page.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/dashboard" className="inline-flex items-center justify-center rounded-xl bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8]">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
