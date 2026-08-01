import { Search as SearchIcon } from "lucide-react";
import type { InputHTMLAttributes } from "react";

export function Search({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={`relative ${className}`}>
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type="search"
        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
        {...props}
      />
    </div>
  );
}
