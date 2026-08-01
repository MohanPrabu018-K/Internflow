"use client";

import { useState } from "react";
import {
  GitBranch, Check, ArrowRight,
  Globe, Link2, Database, Shield, CheckCircle,
  ChevronLeft,
} from "lucide-react";

export function OnboardingWizard({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [formUrl, setFormUrl] = useState("");

  const steps = [
    { title: "Connect Google Account", desc: "Sign in with your Google Workspace account to enable Forms and Sheets integration." },
    { title: "Paste your Google Form URL", desc: "Share the internship application form link. We'll sync responses automatically." },
    { title: "Verify Google Sheet", desc: "We've detected your linked spreadsheet. Confirm it's the correct responses sheet." },
    { title: "Grant Permissions", desc: "InternFlow needs read access to your Google Sheet to import applications." },
    { title: "You're all set!", desc: "InternFlow is connected and ready. Your first applications are being imported." },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="flex items-center gap-2.5 justify-center mb-10">
          <div className="w-9 h-9 bg-[#2563EB] rounded-xl flex items-center justify-center">
            <GitBranch className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900">InternFlow</span>
        </div>

        <div className="flex items-center gap-2 justify-center mb-10">
          {steps.map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  i < step ? "bg-[#2563EB] text-white" : i === step ? "bg-[#2563EB] text-white ring-4 ring-blue-100" : "bg-slate-200 text-slate-400"
                }`}
              >
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              {i < steps.length - 1 && <div className={`h-px w-8 transition-all duration-300 ${i < step ? "bg-[#2563EB]" : "bg-slate-200"}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[22px] border border-slate-100 shadow-xl shadow-slate-100 p-8">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${step === 4 ? "bg-green-50" : "bg-blue-50"}`}>
            {step === 0 && <Globe className="w-7 h-7 text-blue-600" />}
            {step === 1 && <Link2 className="w-7 h-7 text-blue-600" />}
            {step === 2 && <Database className="w-7 h-7 text-blue-600" />}
            {step === 3 && <Shield className="w-7 h-7 text-blue-600" />}
            {step === 4 && <CheckCircle className="w-7 h-7 text-green-600" />}
          </div>

          <h2 className="text-xl font-bold text-slate-900 mb-2">{steps[step].title}</h2>
          <p className="text-sm text-slate-500 leading-relaxed mb-8">{steps[step].desc}</p>

          {step === 0 && (
            <button onClick={() => setStep(1)} className="w-full flex items-center justify-center gap-3 border-2 border-slate-200 hover:border-slate-300 rounded-xl py-3.5 transition-all group">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">Continue with Google</span>
            </button>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">Google Form URL</label>
                <input type="url" value={formUrl} onChange={(e) => setFormUrl(e.target.value)} placeholder="https://forms.gle/..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all" />
              </div>
              <button onClick={() => setStep(2)} className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-3.5 rounded-xl transition-colors">Verify Form</button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-green-800">Google Sheet detected</p>
                  <p className="text-xs text-green-600 mt-0.5">Summer Internship 2025 – Applications</p>
                  <p className="text-xs text-slate-400 mt-1">148 responses found</p>
                </div>
              </div>
              <button onClick={() => setStep(3)} className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-3.5 rounded-xl transition-colors">Confirm & Continue</button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-3">
                {["Read Google Forms responses", "Access linked Google Sheets", "Send emails via Gmail (optional)", "Access Google Calendar (optional)"].map((perm, i) => (
                  <div key={perm} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${i < 2 ? "bg-green-100" : "bg-blue-50"}`}>
                      <Check className={`w-3.5 h-3.5 ${i < 2 ? "text-green-600" : "text-blue-500"}`} />
                    </div>
                    <span className="text-sm text-slate-700">{perm}</span>
                    {i >= 2 && <span className="ml-auto text-xs text-slate-400">Optional</span>}
                  </div>
                ))}
              </div>
              <button onClick={() => setStep(4)} className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-3.5 rounded-xl transition-colors">Grant Access</button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Applications Imported", value: "148" }, { label: "Roles Detected", value: "7" },
                  { label: "Colleges Found", value: "34" }, { label: "Ready to Screen", value: "148" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-slate-50 rounded-xl p-3 text-center">
                    <p className="text-xl font-bold text-[#2563EB]">{stat.value}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
              <button onClick={onComplete} className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">
                Go to Dashboard <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {step > 0 && step < 4 && (
          <button onClick={() => setStep(step - 1)} className="mt-4 flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 transition-colors mx-auto">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
        )}
      </div>
    </div>
  );
}
