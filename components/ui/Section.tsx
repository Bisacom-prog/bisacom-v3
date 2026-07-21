import type { HTMLAttributes } from "react";

export function Section({ className = "", ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={`py-20 sm:py-24 lg:py-32 ${className}`} {...props} />;
}
