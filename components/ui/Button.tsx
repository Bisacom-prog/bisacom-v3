import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type Props = {
  children: ReactNode;
  className?: string;
  href?: string;
  variant?: Variant;
  size?: Size;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white shadow-[0_12px_34px_rgba(45,91,255,.24)] hover:bg-brand-strong",
  secondary: "border border-border bg-surface text-text hover:border-brand/35 hover:bg-brand-soft",
  ghost: "text-text-muted hover:bg-surface-muted hover:text-text",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

export function Button({
  children,
  className = "",
  href,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: Props) {
  const classes = `focus-ring inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) return <Link href={href} className={classes}>{children}</Link>;
  return <button type={type} className={classes} {...props}>{children}</button>;
}
