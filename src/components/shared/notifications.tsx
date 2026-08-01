import { Bell } from "lucide-react";

export function Notifications() {
  return (
    <button className="relative flex h-9 w-9 items-center justify-center rounded-xl transition-colors hover:bg-slate-100">
      <Bell className="h-4 w-4 text-slate-500" />
      <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
    </button>
  );
}
