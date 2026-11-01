"use client";

import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect, useRef, useState, useSyncExternalStore} from "react";
import {primaryNav} from "@/lib/site";

function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {attributes: true, attributeFilter: ["class"]});
  return () => observer.disconnect();
}

function ThemeToggle({className = ""}: {className?: string}) {
  const dark = useSyncExternalStore(subscribeToTheme, () => document.documentElement.classList.contains("dark"), () => false);

  function toggle() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("bisacomTheme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <button type="button" onClick={toggle} aria-pressed={dark} className={`inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/15 px-3 text-sm font-medium hover:border-white/40 ${className}`}>
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M8 1a7 7 0 0 1 0 14z" fill="currentColor" /></svg>
      Dark mode
    </button>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050914]/90 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
        <Link href="/" className="flex min-h-11 items-center gap-3 rounded-md" aria-label="Bisacom home">
          <Image src="/img/Bisacom.webp" width={36} height={39} className="rounded-lg bg-white" alt="" priority />
          <span className="text-xl font-bold">Bisacom</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {primaryNav.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link text-sm text-slate-300 hover:text-white" aria-current={pathname.startsWith(item.href) ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex"><ThemeToggle /><Link href="/#contact" className="btn-lift rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold">Let&apos;s Connect ＋</Link></div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="inline-flex min-h-11 items-center rounded-xl border border-white/15 px-4 text-sm font-semibold md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-white/10 md:hidden">
          <nav className="page-shell grid py-3" aria-label="Primary mobile">
            {primaryNav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center rounded-xl px-4 text-sm font-bold text-slate-200 hover:bg-white/10">
                {item.label}
              </Link>
            ))}
            <ThemeToggle className="mt-4 justify-center" />
          </nav>
        </div>
      )}
    </header>
  );
}
