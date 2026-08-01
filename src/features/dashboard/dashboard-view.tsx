"use client";

import type { ElementType } from "react";
import {
  Users, Eye, ClipboardCheck, CalendarDays, Send,
  CheckCircle, ArrowUpRight, Activity, ChevronRight,
} from "lucide-react";
import {
  BarChart, Bar, AreaChart, Area,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import { AvatarCircle, StageBadge, StarRating } from "@/components/shared/candidate-primitives";
import { CANDIDATES } from "@/lib/internflow-data";
import type { Page } from "@/types/internflow";

// ─── Data ────────────────────────────────────────────────────────────────────

const FUNNEL_DATA = [
  { stage: "Applied", value: 248 }, { stage: "Screened", value: 164 },
  { stage: "Assessment", value: 89 }, { stage: "Interview", value: 52 },
  { stage: "Selected", value: 23 }, { stage: "Offer Sent", value: 18 },
  { stage: "Joined", value: 14 },
];

const MONTHLY_DATA = [
  { month: "Jul", applications: 28, hired: 4 }, { month: "Aug", applications: 45, hired: 8 },
  { month: "Sep", applications: 62, hired: 12 }, { month: "Oct", applications: 48, hired: 9 },
  { month: "Nov", applications: 74, hired: 15 }, { month: "Dec", applications: 91, hired: 14 },
];

const DEPT_DATA = [
  { name: "Engineering", value: 112 }, { name: "Design", value: 48 },
  { name: "Data Science", value: 35 }, { name: "Marketing", value: 28 },
  { name: "HR", value: 15 }, { name: "Finance", value: 10 },
];

const DEPT_COLORS = ["#2563EB", "#14B8A6", "#8B5CF6", "#F59E0B", "#EF4444", "#64748B"];

// ─── Components ──────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, change, color, bg }: {
  icon: ElementType; label: string; value: string; change: string; color: string; bg: string;
}) {
  const isPositive = change.startsWith("+");
  return (
    <div className="bg-white rounded-[18px] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bg}`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold ${isPositive ? "text-green-600" : "text-red-500"}`}>
          {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5 rotate-90" />}
          {change}
        </div>
      </div>
      <p className="text-2xl font-bold text-slate-900 mb-1">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}

export function DashboardView({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const recentActivity = [
    { text: "Aarav Mehta moved to Interview", time: "2 min ago", color: "bg-violet-500" },
    { text: "Assessment sent to Priya Sharma", time: "1 hr ago", color: "bg-amber-500" },
    { text: "Rohan Gupta marked as Selected", time: "3 hr ago", color: "bg-teal-500" },
    { text: "Offer letter sent to Karan Singh", time: "5 hr ago", color: "bg-orange-500" },
    { text: "Vikram Nair joined the team", time: "Yesterday", color: "bg-green-500" },
    { text: "New application: Sneha Reddy", time: "Yesterday", color: "bg-blue-500" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard icon={Users} label="Total Applications" value="248" change="+24%" color="text-blue-600" bg="bg-blue-50" />
        <StatCard icon={Eye} label="Resume Screening" value="164" change="+18%" color="text-violet-600" bg="bg-violet-50" />
        <StatCard icon={ClipboardCheck} label="Assessment Pending" value="89" change="+5%" color="text-amber-600" bg="bg-amber-50" />
        <StatCard icon={CalendarDays} label="Interviews Scheduled" value="52" change="+12%" color="text-teal-600" bg="bg-teal-50" />
        <StatCard icon={Send} label="Offers Sent" value="18" change="+8%" color="text-orange-600" bg="bg-orange-50" />
        <StatCard icon={CheckCircle} label="Interns Joined" value="14" change="+40%" color="text-green-600" bg="bg-green-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-[18px] border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Hiring Funnel</h3>
              <p className="text-xs text-slate-400 mt-0.5">Conversion across all stages</p>
            </div>
            <select onChange={() => {}} className="text-xs text-slate-500 border border-slate-200 rounded-lg px-2.5 py-1.5 outline-none">
              <option>Dec 2024</option>
              <option>Nov 2024</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={FUNNEL_DATA} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="stage" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ border: "1px solid #F1F5F9", borderRadius: 12, fontSize: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }} cursor={{ fill: "#F8FAFC" }} />
              <Bar dataKey="value" fill="#2563EB" radius={[6, 6, 0, 0]}>
                {FUNNEL_DATA.map((_, i) => <Cell key={i} fill={`hsl(${214 - i * 18}, ${80 - i * 5}%, ${50 + i * 3}%)`} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-slate-900">By Department</h3>
            <button className="text-xs text-[#2563EB] font-medium hover:underline">View all</button>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={DEPT_DATA} innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {DEPT_DATA.map((_, i) => <Cell key={i} fill={DEPT_COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ border: "1px solid #F1F5F9", borderRadius: 12, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {DEPT_DATA.slice(0, 4).map((d, i) => (
              <div key={d.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: DEPT_COLORS[i] }} />
                <span className="text-xs text-slate-600 flex-1">{d.name}</span>
                <span className="text-xs font-semibold text-slate-900">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-[18px] border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Monthly Trend</h3>
              <p className="text-xs text-slate-400 mt-0.5">Applications vs Hires</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={MONTHLY_DATA}>
              <defs>
                <linearGradient id="appGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="hireGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#14B8A6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ border: "1px solid #F1F5F9", borderRadius: 12, fontSize: 12 }} />
              <Area type="monotone" dataKey="applications" stroke="#2563EB" strokeWidth={2} fill="url(#appGrad)" name="Applications" />
              <Area type="monotone" dataKey="hired" stroke="#14B8A6" strokeWidth={2} fill="url(#hireGrad)" name="Hired" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold text-slate-900">Recent Activity</h3>
            <button className="text-xs text-[#2563EB] font-medium hover:underline">View all</button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((act, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full ${act.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <Activity className="w-3 h-3 text-white" />
                </div>
                <div>
                  <p className="text-xs text-slate-700 leading-snug">{act.text}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-semibold text-slate-900">Recent Candidates</h3>
          <button onClick={() => onNavigate("candidates")} className="text-xs text-[#2563EB] font-medium hover:underline flex items-center gap-1">
            View all <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                {["Candidate", "College", "Role", "Stage", "Rating", "Applied"].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide pb-3 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CANDIDATES.slice(0, 5).map((c) => (
                <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <AvatarCircle initials={c.initials} color={c.color} size="sm" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{c.name}</p>
                        <p className="text-xs text-slate-400">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-sm text-slate-600">{c.college}</td>
                  <td className="py-3 pr-4 text-sm text-slate-600 max-w-[160px] truncate">{c.role}</td>
                  <td className="py-3 pr-4"><StageBadge stage={c.stage} /></td>
                  <td className="py-3 pr-4"><StarRating rating={c.rating} /></td>
                  <td className="py-3 text-xs text-slate-400">{c.appliedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
