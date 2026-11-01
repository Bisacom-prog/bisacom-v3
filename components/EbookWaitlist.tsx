"use client";

import Image from "next/image";
import {useRef, useState, type FormEvent} from "react";
import {ebook, ebookConsent} from "@/lib/ebook";

const benefits = [
  ["01", "30 focused days", "Turn career preparation into one clear, achievable action each day."],
  ["02", "Portfolio + interview momentum", "Work on the evidence and communication skills that support stronger applications."],
  ["03", "A bridge into the full book", "Use the planner first, then continue with the complete system in From Beginner to Hired."],
];

export default function EbookWaitlist() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const submission = useRef<{email: string; id: string} | null>(null);
  const plannerReady = Boolean(ebook.plannerUrl);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") || "").trim().toLowerCase();
    if (submission.current?.email !== email) submission.current = {email, id: crypto.randomUUID()};
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/ebook-waitlist", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, consent: data.get("consent") === "on", website: data.get("website"), requestId: submission.current.id}),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Please try again in a moment.");
      setMessage(result.message);
      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Please try again in a moment.");
    }
  }

  return (
    <section id="book" aria-labelledby="planner-heading" className="scroll-mt-24 bg-surface-muted px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-xl border border-line bg-surface">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
          <div className="order-2 flex flex-col justify-between bg-navy p-7 text-white sm:p-10 lg:order-1 lg:p-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-bright">Free Product Design resource</p>
              {ebook.coverImage ? <Image src={ebook.coverImage} alt="From Beginner to Hired book cover" width={1008} height={1440} className="mx-auto mt-8 h-auto max-h-[480px] w-auto max-w-full object-contain " /> : <>
                <p className="mt-10 text-sm font-semibold text-accent-bright">A practical guide for your next chapter</p>
                <h3 className="mt-4 max-w-sm text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">From Beginner<br />to Hired<span className="text-accent-bright">.</span></h3>
                <p className="mt-5 max-w-sm text-base leading-7 text-on-navy-muted">Landing Your First Product Design (UX/UI) Job in the AI Era</p>
              </>}
            </div>
            <div className="mt-10 border-t border-white/20 pt-7">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-bright">Meet the author</p>
              <p className="mt-3 font-bold">Bismark Apenkwah</p>
              <p className="mt-1 text-sm text-on-navy-muted">Product Designer · Bisacom</p>
              <blockquote className="mt-4 max-w-sm text-sm leading-7 text-on-navy-muted">“The planner turns the book’s career strategy into 30 days of focused action you can start today.”</blockquote>
            </div>
          </div>
          <div className="order-1 p-7 sm:p-10 lg:order-2 lg:p-12">
            <p className="eyebrow">Free 30-Day Product Design Career Planner</p>
            <h2 id="planner-heading" className="mt-4 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">Stop wondering what to do next.<br /><span className="text-accent-ink">Build momentum for the next 30 days.</span></h2>
            <p className="mt-5 text-base leading-7 text-muted">Download the companion planner from <em>From Beginner to Hired</em> and turn your next month into focused portfolio, interview and job-search action.</p>
            <div className="mt-7 border-l-2 border-accent pl-4">
              <h3 className="font-bold text-foreground">{plannerReady ? "Your free planner is ready." : "Your next chapter starts here."}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{plannerReady ? "Enter your email and I’ll send the 30-Day Product Design Career Planner straight to your inbox." : "Enter your email and I’ll send the planner as soon as it is available."}</p>
            </div>
            {status === "success" ? <div role="status" className="mt-7 rounded-2xl border border-line bg-surface-muted p-6 text-foreground"><h3 className="text-lg font-bold">Check your inbox.</h3><p className="mt-2 text-sm leading-6">{message}</p></div> :
              <form onSubmit={submit} className="mt-7" aria-busy={status === "sending"}>
                <label htmlFor="ebook-email" className="text-sm font-bold text-foreground">Email address</label>
                <input id="ebook-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} className="form-control mt-2 w-full" disabled={status === "sending"} />
                <div hidden aria-hidden="true"><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
                <label className="mt-4 flex items-start gap-3 text-xs leading-5 text-muted"><input type="checkbox" name="consent" required disabled={status === "sending"} className="mt-0.5 h-4 w-4 shrink-0 accent-[#ff6b35]" /><span>{ebookConsent}</span></label>
                <button type="submit" disabled={status === "sending"} className=" mt-5 min-h-12 w-full rounded-xl bg-accent px-5 py-4 text-sm font-bold disabled:cursor-wait disabled:opacity-60 text-on-accent">{status === "sending" ? "Sending…" : plannerReady ? "Email Me the Free Planner →" : "Send Me the Planner →"}</button>
                {status === "error" && <p role="alert" className="mt-3 text-sm text-red-700">{message} You can also email <a href="mailto:hello@bisacom.dev" className="underline">hello@bisacom.dev</a>.</p>}
                <p className="mt-3 text-xs leading-5 text-muted">Occasional Product Design and book updates only. You can unsubscribe at any time by emailing hello@bisacom.dev. <a href="/privacy-policy" className=" underline underline-offset-2">Privacy policy</a></p>
              </form>}
          </div>
        </div>
        <div className="grid gap-7 border-t border-line p-7 sm:p-10 md:grid-cols-3 lg:px-12">
          {benefits.map(([number, title, description]) => <div key={number}><p className="text-xs font-bold tracking-widest text-accent-ink">PLANNER BENEFIT / {number}</p><h3 className="mt-3 font-bold text-foreground">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{description}</p></div>)}
        </div>
      </div>
    </section>
  );
}
