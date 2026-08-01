import { Inbox } from "lucide-react";

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[18px] border border-dashed border-slate-200 bg-white py-14 text-center">
      <Inbox className="mb-3 h-10 w-10 text-slate-200" />
      <p className="text-sm font-semibold text-slate-400">{title}</p>
      {description ? <p className="mt-1 text-xs text-slate-300">{description}</p> : null}
    </div>
  );
}
