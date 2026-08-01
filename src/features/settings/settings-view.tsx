"use client";

import { Plus, Upload, MoreHorizontal, Globe, Video, MessageSquare, Mail } from "lucide-react";

export function SettingsView() {
  const integrations = [
    { name: "Google Workspace", desc: "Forms, Sheets, Gmail, Calendar", status: "Connected", icon: Globe, color: "text-green-600 bg-green-50" },
    { name: "Google Meet", desc: "Video interviews via Meet", status: "Connected", icon: Video, color: "text-green-600 bg-green-50" },
    { name: "Zoom", desc: "Video interviews via Zoom", status: "Connect", icon: Video, color: "text-slate-500 bg-slate-50" },
    { name: "Microsoft Teams", desc: "Video interviews via Teams", status: "Connect", icon: MessageSquare, color: "text-slate-500 bg-slate-50" },
    { name: "SMTP Email", desc: "Custom email server", status: "Configure", icon: Mail, color: "text-slate-500 bg-slate-50" },
    { name: "Slack", desc: "Recruitment notifications to Slack", status: "Connect", icon: MessageSquare, color: "text-slate-500 bg-slate-50" },
  ];

  const team = [
    { name: "Priya Kapoor", email: "priya@acme.com", role: "Admin", initials: "PK", color: "bg-[#2563EB]" },
    { name: "Rahul Verma", email: "rahul@acme.com", role: "Recruiter", initials: "RV", color: "bg-violet-500" },
    { name: "Meera Nair", email: "meera@acme.com", role: "Recruiter", initials: "MN", color: "bg-teal-500" },
  ];

  return (
    <div className="p-6 max-w-4xl space-y-5">
      <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-6">
        <h2 className="text-sm font-bold text-slate-900 mb-1">Company Profile</h2>
        <p className="text-xs text-slate-400 mb-5">Update your organization details and branding.</p>
        <div className="flex items-center gap-5 mb-6 pb-5 border-b border-slate-100">
          <div className="w-16 h-16 bg-[#2563EB] rounded-2xl flex items-center justify-center text-white text-xl font-bold">A</div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Company Logo</p>
            <p className="text-xs text-slate-400 mt-0.5 mb-2">PNG or SVG · Max 2 MB</p>
            <button onClick={() => alert("Logo upload dialog opened")} className="text-xs font-semibold text-[#2563EB] border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-1.5"><Upload className="w-3.5 h-3.5" />Upload Logo</button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Company Name", value: "Acme Corp" }, { label: "Industry", value: "Technology" },
            { label: "Website", value: "https://acme.com" }, { label: "HR Contact Email", value: "hr@acme.com" },
          ].map((field) => (
            <div key={field.label}>
              <label className="text-xs font-semibold text-slate-500 mb-1.5 block">{field.label}</label>
              <input type="text" defaultValue={field.value} className="w-full text-sm px-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#2563EB] transition-all" />
            </div>
          ))}
        </div>
        <button onClick={() => alert("Settings saved successfully!")} className="mt-4 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] px-4 py-2.5 rounded-xl transition-colors">Save Changes</button>
      </div>

      <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-6">
        <h2 className="text-sm font-bold text-slate-900 mb-1">Integrations</h2>
        <p className="text-xs text-slate-400 mb-5">Connect tools you already use.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {integrations.map((intg) => (
            <div key={intg.name} className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${intg.color.split(" ")[1]}`}>
                <intg.icon className={`w-5 h-5 ${intg.color.split(" ")[0]}`} />
              </div>
              <div className="flex-1 min-w-0"><p className="text-sm font-semibold text-slate-900">{intg.name}</p><p className="text-xs text-slate-400 truncate">{intg.desc}</p></div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${intg.status === "Connected" ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-500 cursor-pointer hover:bg-slate-200 transition-colors"}`}>{intg.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <div><h2 className="text-sm font-bold text-slate-900">Team Members</h2><p className="text-xs text-slate-400 mt-0.5">Manage recruiter access and roles.</p></div>
          <button onClick={() => alert("Invite member dialog opened")} className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] px-3 py-2 rounded-xl transition-colors"><Plus className="w-3.5 h-3.5" />Invite Member</button>
        </div>
        <div className="space-y-3">
          {team.map((member) => (
            <div key={member.name} className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl">
              <div className={`w-9 h-9 rounded-xl ${member.color} flex items-center justify-center text-white text-xs font-bold`}>{member.initials}</div>
              <div className="flex-1"><p className="text-sm font-semibold text-slate-900">{member.name}</p><p className="text-xs text-slate-400">{member.email}</p></div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${member.role === "Admin" ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-600"}`}>{member.role}</span>
              <button className="text-slate-300 hover:text-slate-500 transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
