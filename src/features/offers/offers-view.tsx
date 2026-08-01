"use client";

import { useState } from "react";
import { Plus, Copy, Download, Send, Award } from "lucide-react";

export function OfferLettersView() {
  const [selectedTemplate, setSelectedTemplate] = useState("Frontend Developer Intern");
  const templates = ["Python Developer Intern", "Frontend Developer Intern", "Backend Developer Intern", "AI/ML Intern", "Data Analyst Intern", "UI/UX Designer Intern", "HR Intern", "Marketing Intern"];

  return (
    <div className="p-6 flex gap-5">
      <div className="w-64 flex-shrink-0">
        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3"><p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Templates</p><button className="w-6 h-6 bg-[#2563EB] rounded-lg flex items-center justify-center text-white"><Plus className="w-3.5 h-3.5" /></button></div>
          <div className="space-y-1">{templates.map((t) => (<button key={t} onClick={() => setSelectedTemplate(t)} className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all ${selectedTemplate === t ? "bg-blue-50 text-[#2563EB]" : "text-slate-600 hover:bg-slate-50"}`}><Award className={`w-4 h-4 flex-shrink-0 ${selectedTemplate === t ? "text-[#2563EB]" : "text-slate-400"}`} /><span className="text-xs font-medium truncate">{t}</span></button>))}</div>
        </div>
      </div>
      <div className="flex-1 min-w-0 space-y-4">
        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-slate-900">{selectedTemplate}</h2>
            <div className="flex gap-2">
              <button onClick={() => alert("Offer letter duplicated!")} className="text-xs font-semibold text-slate-600 border border-slate-200 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5"><Copy className="w-3.5 h-3.5" />Duplicate</button>
              <button onClick={() => alert("PDF generated and downloaded!")} className="text-xs font-semibold text-white bg-[#14B8A6] hover:bg-teal-600 px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5"><Download className="w-3.5 h-3.5" />Generate PDF</button>
              <button onClick={() => alert("Offer letter sent via email!")} className="text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5"><Send className="w-3.5 h-3.5" />Send via Email</button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-5">
            {[{ label: "Candidate Name", placeholder: "Karan Singh" }, { label: "Internship Role", placeholder: selectedTemplate }, { label: "Duration", placeholder: "3 months" }, { label: "Joining Date", placeholder: "January 6, 2025" }, { label: "Reporting Manager", placeholder: "Priya Kapoor" }, { label: "Working Mode", placeholder: "Remote / Hybrid" }].map((field) => (<div key={field.label}><label className="text-xs font-medium text-slate-500 mb-1.5 block">{field.label}</label><input type="text" defaultValue={field.placeholder} className="w-full text-sm px-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#2563EB] transition-all" /></div>))}
          </div>
        </div>
        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Document Preview</p>
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-[#2563EB] px-8 py-5 flex items-center justify-between"><div><p className="text-white font-bold text-lg">Acme Corp</p><p className="text-blue-200 text-xs mt-0.5">acme.com · hello@acme.com</p></div><div className="w-10 h-10 bg-white/20 rounded-xl" /></div>
            <div className="p-8 space-y-4 bg-white">
              <p className="text-xs text-slate-400">January 6, 2025</p>
              <p className="text-xl font-bold text-slate-900">Internship Offer Letter</p>
              <p className="text-sm text-slate-600 leading-relaxed">Dear <span className="font-semibold text-slate-900">Karan Singh</span>, we are pleased to offer you the position of <span className="font-semibold text-slate-900">{selectedTemplate}</span> at Acme Corp.</p>
              <p className="text-sm text-slate-600 leading-relaxed">Your internship starts on <span className="font-semibold">January 6, 2025</span> and you will report to <span className="font-semibold">Priya Kapoor</span>.</p>
              <div className="border border-slate-100 rounded-xl p-4 mt-4"><p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Details</p><div className="grid grid-cols-2 gap-3">{[["Role", selectedTemplate], ["Start", "Jan 6, 2025"], ["Duration", "3 months"], ["Stipend", "₹25,000/mo"]].map(([k, v]) => (<div key={k}><p className="text-xs text-slate-400">{k}</p><p className="text-sm font-medium text-slate-900">{v}</p></div>))}</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
