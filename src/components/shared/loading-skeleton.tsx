import type { HTMLAttributes } from "react";

export function LoadingSkeleton({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`animate-pulse rounded-[18px] bg-slate-100 ${className}`} {...props} />;
}
