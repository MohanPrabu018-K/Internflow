"use client";

import { Plus, CalendarDays, Clock, Video, User, RefreshCw, Send } from "lucide-react";
import { AvatarCircle } from "@/components/shared/candidate-primitives";

export function InterviewsView() {
  const interviews = [
    { candidate: "Aarav Mehta", initials: "AM", color: "bg-blue-500", role: "Frontend Developer Intern", date: "Dec 26, 2024", time: "11:00 AM", platform: "Google Meet", interviewer: "Priya Kapoor", status: "Upcoming" },
    { candidate: "Tanya Kapoor", initials: "TK", color: "bg-indigo-500", role: "HR Intern", date: "Dec 28, 2024", time: "2:00 PM", platform: "Zoom", interviewer: "Meera Nair", status: "Upcoming" },
    { candidate: "Rohan Gupta", initials: "RG", color: "bg-violet-500", role: "AI/ML Intern", date: "Dec 22, 2024", time: "10:30 AM", platform: "Google Meet", interviewer: "Priya Kapoor", status: "Completed" },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-5">
        {["Upcoming", "Completed", "Cancelled"].map((tab) => (
          <button key={tab} className={`text-xs font-semibold px-4 py-2 rounded-xl transition-colors ${tab === "Upcoming" ? "bg-[#2563EB] text-white" : "text-slate-500 hover:bg-slate-100"}`}>{tab}<span className="ml-1.5 opacity-70">{tab === "Upcoming" ? 2 : tab === "Completed" ? 12 : 1}</span></button>
        ))}
        <button className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] px-4 py-2 rounded-xl transition-colors"><Plus className="w-3.5 h-3.5" />Schedule Interview</button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {interviews.map((iv, i) => (
          <div key={i} className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-5 hover:shadow-md transition-all">
            <div className="flex items-start gap-4">
              <AvatarCircle initials={iv.initials} color={iv.color} size="md" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div><p className="text-sm font-bold text-slate-900">{iv.candidate}</p><p className="text-xs text-slate-500 mt-0.5">{iv.role}</p></div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${iv.status === "Upcoming" ? "bg-blue-50 text-blue-700" : "bg-green-50 text-green-700"}`}>{iv.status}</span>
                </div>
                <div className="flex items-center gap-5 mt-3">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500"><CalendarDays className="w-3.5 h-3.5 text-slate-400" />{iv.date}</div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500"><Clock className="w-3.5 h-3.5 text-slate-400" />{iv.time}</div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500"><Video className="w-3.5 h-3.5 text-slate-400" />{iv.platform}</div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500"><User className="w-3.5 h-3.5 text-slate-400" />{iv.interviewer}</div>
                </div>
              </div>
              {iv.status === "Upcoming" && (
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => alert("Rescheduling interview...")} className="text-xs font-medium text-slate-500 border border-slate-200 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5"><RefreshCw className="w-3.5 h-3.5" />Reschedule</button>
                  <button onClick={() => alert("Interview invitation sent!")} className="text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5"><Send className="w-3.5 h-3.5" />Send Invite</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
