"use client";

import Link from "next/link";
import {FormEvent, useEffect, useRef, useState} from "react";
import ExternalLink from "@/components/ui/ExternalLink";
import Select from "@/components/ui/Select";
import {serviceDetails} from "@/lib/services";
import {siteConfig} from "@/lib/site";

type Pathway = "role" | "project";

// The published services and their starting prices, straight from lib/services.ts so the form never drifts from the Services page.
const serviceOptions = [
  ...Object.values(serviceDetails).map((service) => `${service.title} (${service.price.toLowerCase()})`),
  "AI automation / business workflows",
  "Something else / not sure yet",
];
const budgetOptions = ["Under £1k", "£1k–£3k", "£3k–£5k", "£5k–£10k", "£10k+", "Not sure yet"];

const copy: Record<Pathway, {submit: string; prompt: string; success: string}> = {
  role: {submit: "Send role details", prompt: "Tell me about the role and team", success: "I’ll reply to the email you provided."},
  project: {submit: "Send project details", prompt: "What are you building, and where are you stuck?", success: "I’ll reply to the email you provided."},
};

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

// Same rules the API enforces, checked first in the browser so people see what to fix next to the field.
function validate(data: FormData): Errors {
  const errors: Errors = {};
  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();
  if (!name) errors.name = "Enter your name.";
  if (!email) errors.email = "Enter your email address.";
  else if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Enter an email address like name@example.com.";
  if (message.length < 20) errors.message = message ? `Add a little more detail: at least 20 characters (${message.length} so far).` : "Tell me a little about it: at least 20 characters.";
  return errors;
}

export default function ContactSection() {
  const [pathway, setPathway] = useState<Pathway>("project");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const isProject = pathway === "project";
  const successRef = useRef<HTMLDivElement>(null);

  // The form is replaced by the confirmation, so move focus there: screen readers announce it and keyboard users are not left on a removed element.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  function choose(next: Pathway) {
    setPathway(next);
    setStatus("idle");
    nameRef.current?.focus();
  }

  function clearError(field: Field) {
    if (errors[field]) setErrors((current) => ({...current, [field]: undefined}));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const found = validate(new FormData(form));
    setErrors(found);
    const first = (["name", "email", "message"] as const).find((field) => found[field]);
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    // Project-only fields sit in a disabled fieldset for role enquiries, so they are never sent with them.
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
              <ExternalLink href={siteConfig.linkedIn} className="text-link">LinkedIn profile</ExternalLink>
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
            <div ref={successRef} tabIndex={-1} role="status" className="rounded-lg border border-navy-line p-6">
              <b>Thank you, your message has been received.</b>
              <p className="mt-2 text-sm text-on-navy-muted">{copy[pathway].success}</p>
              <button type="button" onClick={() => setStatus("idle")} className="text-link mt-4 inline-flex min-h-6 items-center text-sm">Send another message</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-5" aria-busy={status === "sending"} aria-describedby={status === "error" ? "contact-error" : undefined}>
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
                <div className="grid content-start gap-2">
                  <label htmlFor="contact-name" className="text-sm font-semibold">Full name</label>
                  <input ref={nameRef} id="contact-name" name="name" required autoComplete="name" onInput={() => clearError("name")} aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? "contact-name-error" : undefined} className="form-control" />
                  {errors.name && <p id="contact-name-error" className="field-error">{errors.name}</p>}
                </div>
                <div className="grid content-start gap-2">
                  <label htmlFor="contact-email" className="text-sm font-semibold">Email</label>
                  <input id="contact-email" name="email" type="email" required autoComplete="email" inputMode="email" onInput={() => clearError("email")} aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? "contact-email-error" : undefined} className="form-control" />
                  {errors.email && <p id="contact-email-error" className="field-error">{errors.email}</p>}
                </div>
              </div>
              {/* Project-only fields. They stay mounted and collapse smoothly, so switching enquiry type does not make the page jump;
                  when collapsed the fieldset is disabled (not submitted, not focusable) and inert (hidden from assistive tech). */}
              <div>
              <div className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${isProject ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`} inert={!isProject}>
                <div className="min-h-0 overflow-hidden">
                <fieldset disabled={!isProject} className="grid gap-5 pb-5 sm:grid-cols-2">
                  <legend className="sr-only">Project details</legend>
                  <label className="grid gap-2 text-sm font-semibold">
                    <span>Service <span className="font-normal text-on-navy-muted">(optional)</span></span>
                    <Select name="service" placeholder="Select a service" options={serviceOptions} className="font-normal" />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold">
                    <span>Budget <span className="font-normal text-on-navy-muted">(optional)</span></span>
                    <Select name="budget" placeholder="Select a budget" options={budgetOptions} className="font-normal" />
                  </label>
                </fieldset>
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="contact-message" className="text-sm font-semibold">{copy[pathway].prompt}</label>
                <textarea id="contact-message" name="message" required minLength={20} maxLength={2000} rows={5} onInput={() => clearError("message")} aria-invalid={errors.message ? true : undefined} aria-describedby={errors.message ? "contact-message-error" : "contact-message-hint"} className="form-control" />
                {errors.message ? <p id="contact-message-error" className="field-error">{errors.message}</p> : <p id="contact-message-hint" className="text-xs text-on-navy-muted">At least 20 characters.</p>}
              </div>
              </div>
              <div hidden aria-hidden="true"><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
              {status === "error" && <p id="contact-error" role="alert" className="text-sm font-semibold text-accent-bright">The message could not be sent. Please email <a href={`mailto:${siteConfig.email}`} className="underline">{siteConfig.email}</a>.</p>}
              <div><button type="submit" disabled={status === "sending"} className="btn btn-primary">{status === "sending" ? "Sending…" : copy[pathway].submit}</button></div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
