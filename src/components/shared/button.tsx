import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const styles: Record<Variant, string> = {
  primary: "bg-[#2563EB] text-white hover:bg-[#1D4ED8]",
  secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
  ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
  danger: "bg-red-50 text-red-600 hover:bg-red-100",
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return <button type={props.type ?? "button"} className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${styles[variant]} ${className}`} {...props} />;
}
