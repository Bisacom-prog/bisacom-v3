"use client";

import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect, useRef, useState, useSyncExternalStore} from "react";
import {primaryNav, siteConfig} from "@/lib/site";

const cvLinkProps = siteConfig.cvIsPdf ? {download: true} : {target: "_blank", rel: "noopener noreferrer"};

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

// Homepage sections that have a nav item. Which one is in view decides the active item on "/".
const homeSections = primaryNav.filter((item) => item.href.startsWith("/#")).map((item) => item.href.slice(2));

/** The homepage section currently in the middle of the viewport, or null when none is. */
function useActiveHomeSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        setActive(homeSections.find((id) => visible.has(id)) ?? null);
      },
      {rootMargin: "-45% 0px -50% 0px"},
    );
    for (const id of homeSections) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}

/**
 * Route links ("/services") are current on that route and its children, marked aria-current="page".
 * Homepage anchors ("/#about") are current while that section is in view, marked aria-current="location",
 * the value for "this part of the current page". Work also covers the /projects routes.
 */
function currentState(href: string, pathname: string, homeSection: string | null): "page" | "location" | undefined {
  if (href.startsWith("/#")) {
    const id = href.slice(2);
    if (id === "projects" && pathname.startsWith("/projects")) return "page";
    return pathname === "/" && homeSection === id ? "location" : undefined;
  }
  return pathname === href || pathname.startsWith(`${href}/`) ? "page" : undefined;
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const homeSection = useActiveHomeSection(pathname === "/");

  // Close the menu whenever the route changes (back/forward included), without an extra effect pass.
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    // A tap or click anywhere outside the header closes the menu. Focus stays where the user put it.
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    // Widening to the desktop layout hides the mobile menu, so close it rather than leave it open but hidden.
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = () => desktop.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  return (
    <header ref={headerRef} className="on-navy sticky top-0 z-40 border-b border-white/10 bg-[#050914]/90 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
        <Link href="/" className="flex min-h-11 items-center gap-3 rounded-md" aria-label="Bisacom home">
          <Image src="/img/Bisacom.webp" width={36} height={39} className="rounded-lg bg-white" alt="" priority />
          <span className="text-xl font-bold">Bisacom</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {primaryNav.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link text-sm text-slate-300 hover:text-white aria-[current]:text-white" aria-current={currentState(item.href, pathname, homeSection)}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle className="lg:hidden xl:inline-flex" />
          <a href={siteConfig.cvUrl} {...cvLinkProps} className="inline-flex min-h-11 items-center rounded-xl border border-white/15 px-4 text-sm font-bold hover:border-white/40">{siteConfig.cvIsPdf ? "Download CV" : "CV"}</a>
          <Link href="/#contact" className="btn-lift rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold">Let&apos;s Connect</Link>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="inline-flex min-h-11 items-center rounded-xl border border-white/15 px-4 text-sm font-semibold lg:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div id="mobile-menu" hidden={!open} className="border-t border-white/10 lg:hidden">
          <nav className="page-shell grid py-3" aria-label="Primary mobile">
            {primaryNav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} aria-current={currentState(item.href, pathname, homeSection)} className="flex min-h-12 items-center rounded-xl px-4 text-sm font-bold text-slate-200 hover:bg-white/10 aria-[current]:bg-white/10 aria-[current]:text-white">
                {item.label}
              </Link>
            ))}
            <a href={siteConfig.cvUrl} {...cvLinkProps} onClick={() => setOpen(false)} className="flex min-h-12 items-center rounded-xl px-4 text-sm font-bold text-slate-200 hover:bg-white/10">{siteConfig.cvIsPdf ? "Download CV" : "CV (LinkedIn)"}</a>
            <Link href="/#contact" onClick={() => setOpen(false)} className="mt-3 flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-bold">Let&apos;s Connect</Link>
            <ThemeToggle className="mt-4 justify-center" />
          </nav>
      </div>
    </header>
  );
}
