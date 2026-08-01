import { LandingLayout } from "@/components/layouts/landing-layout";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <LandingLayout>
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-md rounded-[22px] border border-slate-100 bg-white p-8 text-center shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">404</p>
          <h1 className="mt-3 text-2xl font-semibold text-slate-950">Page not found</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">The page you are looking for does not exist.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/dashboard" className="inline-flex items-center justify-center rounded-xl bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8]">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
