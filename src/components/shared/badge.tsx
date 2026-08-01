import type { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "default" | "success" | "warning" | "info" | "danger";
}

const tones = {
  default: "bg-slate-100 text-slate-600",
  success: "bg-green-50 text-green-700",
  warning: "bg-amber-50 text-amber-700",
  info: "bg-blue-50 text-blue-700",
  danger: "bg-red-50 text-red-700",
};

export function Badge({ tone = "default", className = "", ...props }: BadgeProps) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${tones[tone]} ${className}`} {...props} />;
}
