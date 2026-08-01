"use client";

import { useState } from "react";
import { Plus, Eye, Send, Inbox, CheckCircle, ClipboardCheck, CalendarDays, Award, FileText, Sparkles } from "lucide-react";

export function EmailsView() {
  const [selectedTemplate, setSelectedTemplate] = useState("Application Received");
  const [to, setTo] = useState("");
  const [body, setBody] = useState("");
  const templates = [
    { name: "Application Received", icon: Inbox, color: "text-blue-600 bg-blue-50" },
    { name: "Shortlisted", icon: CheckCircle, color: "text-teal-600 bg-teal-50" },
    { name: "Assessment Assigned", icon: ClipboardCheck, color: "text-amber-600 bg-amber-50" },
    { name: "Interview Invitation", icon: CalendarDays, color: "text-violet-600 bg-violet-50" },
    { name: "Congratulations", icon: Award, color: "text-green-600 bg-green-50" },
    { name: "Offer Letter", icon: FileText, color: "text-orange-600 bg-orange-50" },
    { name: "Welcome Onboard", icon: Sparkles, color: "text-pink-600 bg-pink-50" },
  ];

  const emailBodies: Record<string, string> = {
    "Application Received": "Thank you for applying! We've received your application for {{role}} and will review it shortly.",
    "Shortlisted": "Congratulations! You've been shortlisted for the {{role}} position.",
    "Assessment Assigned": "Complete the technical assessment for {{role}}. Deadline: {{deadline}}.",
    "Interview Invitation": "Interview for {{role}} is scheduled for {{date}} at {{time}} via {{platform}}.",
    "Congratulations": "You've been selected for {{role}}! Offer letter attached.",
    "Offer Letter": "Dear {{name}}, attached is your offer letter for {{role}}.",
    "Welcome Onboard": "Welcome {{name}}! Starting {{date}} as {{role}} intern.",
  };

  const handleSend = () => {
    if (!to.trim()) { alert("Please enter a recipient email"); return; }
    alert(`Email sent to ${to}\nTemplate: ${selectedTemplate}`);
  };

  const handlePreview = () => alert(`Preview:\n\n${emailBodies[selectedTemplate]}`);

  return (
    <div className="p-6 flex gap-5">
      <div className="w-64 flex-shrink-0">
        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Templates</p>
            <button className="w-6 h-6 bg-[#2563EB] rounded-lg flex items-center justify-center text-white"><Plus className="w-3.5 h-3.5" /></button>
          </div>
          <div className="space-y-1">
            {templates.map((t) => (
              <button key={t.name} onClick={() => { setSelectedTemplate(t.name); setBody(emailBodies[t.name]); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${selectedTemplate === t.name ? "bg-blue-50 text-[#2563EB]" : "text-slate-600 hover:bg-slate-50"}`}>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${selectedTemplate === t.name ? "bg-blue-100" : t.color}`}><t.icon className={`w-3.5 h-3.5 ${selectedTemplate === t.name ? "text-[#2563EB]" : ""}`} /></div>
                <span className="text-xs font-medium truncate">{t.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 min-w-0 space-y-4">
        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-slate-900">{selectedTemplate}</h2>
            <div className="flex gap-2">
              <button onClick={handlePreview} className="text-xs font-semibold text-slate-600 border border-slate-200 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" />Preview</button>
              <button onClick={handleSend} className="text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5"><Send className="w-3.5 h-3.5" />Send Email</button>
            </div>
          </div>
          <div className="space-y-4">
            <div><label className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5 block">To</label><input type="text" value={to} onChange={(e) => setTo(e.target.value)} placeholder="Select candidates or enter email..." className="w-full text-sm px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#2563EB] transition-all placeholder:text-slate-400" /></div>
            <div><label className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5 block">Subject</label><input type="text" defaultValue={`[InternFlow] ${selectedTemplate} – Acme Corp`} className="w-full text-sm px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#2563EB] transition-all" /></div>
            <div><label className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5 block">Body</label><textarea rows={8} value={body} onChange={(e) => setBody(e.target.value)} className="w-full text-sm px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#2563EB] transition-all resize-none leading-relaxed" /></div>
          </div>
        </div>
      </div>
    </div>
  );
}
