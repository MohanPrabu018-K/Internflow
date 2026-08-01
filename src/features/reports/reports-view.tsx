"use client";

import { Users, CheckCircle, Clock, Globe } from "lucide-react";
import { AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

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

const COLLEGE_DATA = [
  { college: "IIT", count: 45 }, { college: "NIT", count: 38 },
  { college: "BITS", count: 25 }, { college: "VIT", count: 32 },
  { college: "Delhi Univ", count: 22 }, { college: "Others", count: 86 },
];

const DEPT_COLORS = ["#2563EB", "#14B8A6", "#8B5CF6", "#F59E0B", "#EF4444", "#64748B"];

export function ReportsView() {
  return (
    <div className="p-6 space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Applications", value: "248", change: "+24%", color: "text-blue-600 bg-blue-50", icon: Users },
          { label: "Offer Acceptance Rate", value: "78%", change: "+5%", color: "text-green-600 bg-green-50", icon: CheckCircle },
          { label: "Avg Time to Offer", value: "18 days", change: "-3 days", color: "text-teal-600 bg-teal-50", icon: Clock },
          { label: "Sources: Organic", value: "64%", change: "+12%", color: "text-violet-600 bg-violet-50", icon: Globe },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${stat.color.split(" ")[1]}`}>
              <stat.icon className={`w-5 h-5 ${stat.color.split(" ")[0]}`} />
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
            <p className="text-xs text-green-600 font-medium mt-1">{stat.change} this month</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-5">Monthly Applications & Hires</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={MONTHLY_DATA}>
              <defs>
                <linearGradient id="appGrad2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2563EB" stopOpacity={0.12} /><stop offset="95%" stopColor="#2563EB" stopOpacity={0} /></linearGradient>
                <linearGradient id="hireGrad2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#14B8A6" stopOpacity={0.12} /><stop offset="95%" stopColor="#14B8A6" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ border: "1px solid #F1F5F9", borderRadius: 12, fontSize: 12 }} />
              <Area type="monotone" dataKey="applications" stroke="#2563EB" strokeWidth={2} fill="url(#appGrad2)" name="Applications" />
              <Area type="monotone" dataKey="hired" stroke="#14B8A6" strokeWidth={2} fill="url(#hireGrad2)" name="Hired" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-5 mt-2">
            <div className="flex items-center gap-2"><div className="w-3 h-0.5 bg-[#2563EB] rounded" /><span className="text-xs text-slate-500">Applications</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-0.5 bg-[#14B8A6] rounded" /><span className="text-xs text-slate-500">Hired</span></div>
          </div>
        </div>
        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-5">Applications by Department</h3>
          <div className="flex items-center">
            <ResponsiveContainer width="55%" height={200}>
              <PieChart>
                <Pie data={DEPT_DATA} innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {DEPT_DATA.map((_, i) => <Cell key={i} fill={DEPT_COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ border: "1px solid #F1F5F9", borderRadius: 12, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2.5">
              {DEPT_DATA.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: DEPT_COLORS[i] }} />
                  <span className="text-xs text-slate-600 flex-1">{d.name}</span>
                  <span className="text-xs font-bold text-slate-900">{d.value}</span>
                  <span className="text-[10px] text-slate-400 w-8 text-right">{Math.round(d.value / DEPT_DATA.reduce((a, b) => a + b.value, 0) * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-5">Applications by College</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={COLLEGE_DATA} barSize={32}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis dataKey="college" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ border: "1px solid #F1F5F9", borderRadius: 12, fontSize: 12 }} cursor={{ fill: "#F8FAFC" }} />
            <Bar dataKey="count" fill="#2563EB" radius={[6, 6, 0, 0]} name="Applications" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
