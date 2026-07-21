import type { HTMLAttributes } from "react";

export function Badge({ className = "", ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={`inline-flex items-center rounded-full border border-brand/15 bg-brand-soft px-3 py-1 text-xs font-semibold tracking-wide text-brand ${className}`} {...props} />;
}
