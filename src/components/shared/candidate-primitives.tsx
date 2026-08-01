import { Star } from "lucide-react";
import type { Stage } from "@/types/internflow";

const STAGE_CONFIG: Record<Stage, { text: string; bg: string; dot: string }> = {
  New: { text: "text-slate-600", bg: "bg-slate-100", dot: "bg-slate-400" },
  Screening: { text: "text-blue-700", bg: "bg-blue-50", dot: "bg-blue-500" },
  Assessment: { text: "text-amber-700", bg: "bg-amber-50", dot: "bg-amber-500" },
  Interview: { text: "text-violet-700", bg: "bg-violet-50", dot: "bg-violet-500" },
  Selected: { text: "text-teal-700", bg: "bg-teal-50", dot: "bg-teal-500" },
  "Offer Sent": { text: "text-orange-700", bg: "bg-orange-50", dot: "bg-orange-500" },
  Joined: { text: "text-green-700", bg: "bg-green-50", dot: "bg-green-500" },
};

export function StageBadge({ stage }: { stage: Stage }) {
  const cfg = STAGE_CONFIG[stage];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {stage}
    </span>
  );
}

export function AvatarCircle({ initials, color, size = "md" }: { initials: string; color: string; size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-14 h-14 text-base" };
  return <div className={`${sizes[size]} rounded-xl ${color} flex items-center justify-center text-white font-bold flex-shrink-0`}>{initials}</div>;
}

export function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`w-3.5 h-3.5 ${i <= Math.floor(rating) ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"}`} />
      ))}
      <span className="text-xs text-slate-500 ml-1">{rating}</span>
    </div>
  );
}
