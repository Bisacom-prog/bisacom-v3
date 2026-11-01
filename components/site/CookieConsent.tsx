"use client";

import {useEffect, useRef, useState} from "react";

type CookiePreferences = {necessary: true; analytics: boolean; marketing: boolean; savedAt: string};
const COOKIE_KEY = "bisacomCookiePreferences";

function CookieModal({preferences, onSave, onClose}: {preferences: CookiePreferences | null; onSave: (analytics: boolean, marketing: boolean) => void; onClose: () => void}) {
  const [analytics, setAnalytics] = useState(Boolean(preferences?.analytics));
  const [marketing, setMarketing] = useState(Boolean(preferences?.marketing));
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => closeRef.current?.focus(), []);

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="cookie-title" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-card">
        <button ref={closeRef} type="button" onClick={onClose} className="modal-close" aria-label="Close cookie preferences">×</button>
        <p className="eyebrow">Cookie control</p>
        <h2 id="cookie-title" className="mt-2 text-3xl font-bold">Manage cookie preferences</h2>
        <p className="mt-3 text-sm leading-6 text-muted">Choose which optional cookies you allow. Necessary storage keeps essential preferences and cannot be switched off.</p>
        <div className="mt-7 grid gap-3">
          <div className="cookie-option"><div><b>Strictly necessary</b><p>Required for theme, cookie choices and core site functions.</p></div><span className="cookie-status">Always on</span></div>
          <label className="cookie-option"><div><b>Analytics</b><p>Helps understand how the portfolio is used and improved.</p></div><input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="cookie-toggle" /></label>
          <label className="cookie-option"><div><b>Marketing</b><p>Allows embedded social or campaign content when added.</p></div><input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="cookie-toggle" /></label>
        </div>
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={() => onSave(false, false)} className="btn btn-secondary">Reject optional</button>
          <button type="button" onClick={() => onSave(analytics, marketing)} className="btn btn-primary">Save preferences</button>
        </div>
      </div>
    </div>
  );
}

export function ManageCookiesButton() {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event("bisacom:open-cookies"))} className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-on-navy">
      Cookie preferences
    </button>
  );
}

export default function CookieConsent() {
  // undefined until the browser has read storage, so the banner never flashes for returning visitors.
  const [preferences, setPreferences] = useState<CookiePreferences | null | undefined>(undefined);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const saved = localStorage.getItem(COOKIE_KEY);
        setPreferences(saved ? JSON.parse(saved) : null);
      } catch {
        setPreferences(null);
      }
    });
    const openModal = () => setOpen(true);
    window.addEventListener("bisacom:open-cookies", openModal);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("bisacom:open-cookies", openModal);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function save(analytics: boolean, marketing: boolean) {
    const next: CookiePreferences = {necessary: true, analytics, marketing, savedAt: new Date().toISOString()};
    try {
      localStorage.setItem(COOKIE_KEY, JSON.stringify(next));
    } catch {}
    setPreferences(next);
    setOpen(false);
  }

  return (
    <>
      {preferences === null && !open && (
        <aside className="cookie-banner" aria-label="Cookie notice">
          <div>
            <b>Your privacy choices</b>
            <p className="mt-1 text-sm leading-6 text-muted">I use necessary storage for site preferences. Optional analytics and marketing cookies are only enabled with your choice.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => save(false, false)} className="btn btn-secondary flex-1 whitespace-nowrap px-4">Necessary only</button>
            <button type="button" onClick={() => setOpen(true)} className="btn btn-secondary flex-1 px-4">Manage</button>
            <button type="button" onClick={() => save(true, true)} className="btn btn-primary flex-1 whitespace-nowrap px-4">Accept all</button>
          </div>
        </aside>
      )}
      {open && <CookieModal preferences={preferences ?? null} onSave={save} onClose={() => setOpen(false)} />}
    </>
  );
}
