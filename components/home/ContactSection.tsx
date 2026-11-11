"use client";

import Link from "next/link";
import {FormEvent, useRef, useState} from "react";
import {siteConfig} from "@/lib/site";

type Pathway = "role" | "project";

const copy: Record<Pathway, {submit: string; prompt: string; success: string}> = {
  role: {submit: "Send role details", prompt: "Tell me about the role and team", success: "I’ll reply to the email you provided."},
  project: {submit: "Send project details", prompt: "What are you building, and where are you stuck?", success: "I’ll reply to the email you provided."},
};

export default function ContactSection() {
  const [pathway, setPathway] = useState<Pathway>("role");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const nameRef = useRef<HTMLInputElement>(null);

  function choose(next: Pathway) {
    setPathway(next);
    setStatus("idle");
    nameRef.current?.focus();
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({...data, enquiryType: pathway === "project" ? "quote" : "role"}),
      });
      if (!response.ok) throw new Error();
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="on-navy scroll-mt-24 bg-[linear-gradient(135deg,#050914,#21115C)] py-20 text-on-navy">
      <div className="page-shell">
        <p className="eyebrow">Contact</p>
        <h2 id="contact-title" className="mt-3 max-w-3xl text-3xl font-black md:text-4xl">Let’s build better digital products together.</h2>
        <p className="mt-3 text-on-navy-muted">I reply {siteConfig.responseTime}.</p>

        <div className="mt-12 grid gap-5 md:grid-cols-[1.25fr_1fr]">
          <article className="flex flex-col rounded-xl border-2 border-[#7d9aff] bg-[#0B1430] p-7 lg:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#a9bbff]">For recruiters and hiring managers</p>
            <h3 className="mt-2 text-2xl font-bold">Hiring a Product Designer or Design Engineer?</h3>
            <p className="mt-3 flex-1 leading-7 text-on-navy-muted">
              Discuss a Product Designer or Design Engineer opportunity.{siteConfig.availability.open ? ` ${siteConfig.availability.detail}` : ""}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <button type="button" onClick={() => choose("role")} className="btn btn-primary">Discuss a Product Design Opportunity</button>
              {siteConfig.cvIsPdf && <a href={siteConfig.cvUrl} download className="text-link">Download CV</a>}
              <a href={siteConfig.linkedIn} target="_blank" rel="noreferrer" className="text-link">LinkedIn profile</a>
              <a href={`mailto:${siteConfig.email}?subject=Product%20design%20opportunity`} className="text-link">{siteConfig.email}</a>
            </div>
          </article>
          <article className="flex flex-col rounded-xl border border-navy-line bg-[#070B16] p-7 lg:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-on-navy-muted">For founders and businesses</p>
            <h3 className="mt-2 text-xl font-bold">Need a product or website designed and built?</h3>
            <p className="mt-3 flex-1 leading-7 text-on-navy-muted">
              Discuss a new product, website, SaaS application or digital experience. I can take an idea from concept through UX and interface design to a working implementation.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <button type="button" onClick={() => choose("project")} className="btn !border-white/40 !text-white hover:!border-white/80">Work With Me</button>
              <Link href="/services" className="text-link">Services and prices</Link>
              <a href={siteConfig.callHref} className="text-link">Book a 15-minute call</a>
            </div>
          </article>
        </div>

        <div className="mt-12 max-w-3xl">
          {status === "success" ? (
            <div role="status" className="rounded-lg border border-navy-line p-6">
              <b>Thank you, your message has been received.</b>
              <p className="mt-2 text-sm text-on-navy-muted">{copy[pathway].success}</p>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-5" aria-busy={status === "sending"}>
              <fieldset>
                <legend className="text-sm font-semibold">I’m getting in touch about</legend>
                <div className="mt-2 flex flex-wrap gap-x-6">
                  {([["role", "A role"], ["project", "A project"]] as const).map(([value, label]) => (
                    <label key={value} className="inline-flex min-h-11 items-center gap-2">
                      <input type="radio" name="pathway" value={value} checked={pathway === value} onChange={() => setPathway(value)} className="h-5 w-5 accent-[#7d9aff]" />
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold">Full name
                  <input ref={nameRef} name="name" required autoComplete="name" className="form-control font-normal" />
                </label>
                <label className="grid gap-2 text-sm font-semibold">Email
                  <input name="email" type="email" required autoComplete="email" className="form-control font-normal" />
                </label>
              </div>
              <label className="grid gap-2 text-sm font-semibold">{copy[pathway].prompt}
                <textarea name="message" required minLength={20} maxLength={2000} rows={5} className="form-control font-normal" />
              </label>
              <div hidden aria-hidden="true"><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
              {status === "error" && <p role="alert" className="text-sm font-semibold text-accent-bright">The message could not be sent. Please email <a href={`mailto:${siteConfig.email}`} className="underline">{siteConfig.email}</a>.</p>}
              <div><button disabled={status === "sending"} className="btn btn-primary disabled:opacity-60">{status === "sending" ? "Sending…" : copy[pathway].submit}</button></div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
