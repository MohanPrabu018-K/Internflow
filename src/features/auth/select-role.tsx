"use client";

import type { UserRole } from "@/types/prisma";

export function SelectRole({ value, onChange }: { value: UserRole; onChange: (role: UserRole) => void }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-slate-500">Role</label>
      <select
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
        value={value}
        onChange={(e) => onChange(e.target.value as UserRole)}
      >
        <option value="ADMIN">Super Admin</option>
        <option value="RECRUITER">Recruiter</option>
        <option value="VIEWER">HR / Interviewer</option>
      </select>
    </div>
  );
}
