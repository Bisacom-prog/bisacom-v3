"use client";

import Image from "next/image";
import {useRef, useState, type FormEvent} from "react";
import {ebook, ebookConsent} from "@/lib/ebook";

const benefits = [
  ["01", "A repeatable design process", "Bring structure to your work with the seven-step B.I.S.A.C.O.M. Framework."],
  ["02", "Skills with a clear purpose", "Connect your tools, design fundamentals and problem-solving through the Skill Pyramid."],
  ["03", "AI with human judgement", "Support your research and design thinking with responsible AI workflows."],
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
    <section id="book" aria-labelledby="ebook-heading" className="scroll-mt-24 bg-slate-50 px-6 py-20 dark:bg-[#0B1120] lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-white/10 dark:bg-[#050914]">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
          <div className="order-2 flex flex-col justify-between bg-[linear-gradient(145deg,#101B44,#21115C)] p-7 text-white sm:p-10 lg:order-1 lg:p-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200">The Bisacom bookshelf</p>
              {ebook.coverImage ? <Image src={ebook.coverImage} alt="From Beginner to Hired book cover" width={1008} height={1440} className="mx-auto mt-8 h-auto max-h-[480px] w-auto max-w-full object-contain shadow-2xl" /> : <>
                <p className="mt-10 text-sm font-semibold text-blue-200">A practical guide for your next chapter</p>
                <h3 className="mt-4 max-w-sm text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl">From Beginner<br />to Hired<span className="text-blue-300">.</span></h3>
                <p className="mt-5 max-w-sm text-base leading-7 text-slate-200">Landing Your First Product Design (UX/UI) Job in the AI Era</p>
              </>}
            </div>
            <div className="mt-10 border-t border-white/20 pt-7">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-200">Meet the author</p>
              <p className="mt-3 font-bold">Bismark Apenkwah</p>
              <p className="mt-1 text-sm text-slate-300">Product Designer · Bisacom</p>
              <blockquote className="mt-4 max-w-sm text-sm leading-7 text-slate-200">“I wrote the handbook I wish I’d had when starting out—a practical bridge between learning design tools and preparing for a career in product design.”</blockquote>
            </div>
          </div>
          <div className="order-1 p-7 sm:p-10 lg:order-2 lg:p-12">
            <p className="eyebrow">Coming soon · Join the launch list</p>
            <h2 id="ebook-heading" className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl dark:text-white">You’re learning the tools.<br /><span className="text-[#2D5BFF] dark:text-blue-400">Now build your path into product design.</span></h2>
            <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">Working towards your first UX/UI role—or switching careers? Develop your design skills, build a portfolio with purpose, and prepare for opportunities in the AI era.</p>
            <div className="mt-7 border-l-2 border-blue-500 pl-4">
              <h3 className="font-bold text-slate-950 dark:text-white">{plannerReady ? "Start with a free 30-Day Career Planner." : "Your next chapter starts here."}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{plannerReady ? "Join the launch list to receive the 30-Day Product Design Career Planner from Chapter 11 of the book, plus an email when the book is available." : "Be first to hear when the book is available. You’ll also receive the free 30-Day Product Design Career Planner when it’s ready."}</p>
            </div>
            {status === "success" ? <div role="status" className="mt-7 rounded-2xl border border-blue-200 bg-blue-50 p-6 text-blue-950 dark:border-blue-400/30 dark:bg-blue-950/40 dark:text-blue-100"><h3 className="text-lg font-bold">You’re on the list.</h3><p className="mt-2 text-sm leading-6">{message}</p></div> :
              <form onSubmit={submit} className="mt-7" aria-busy={status === "sending"}>
                <label htmlFor="ebook-email" className="text-sm font-bold text-slate-800 dark:text-slate-200">Email address</label>
                <input id="ebook-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} className="form-control mt-2 w-full" disabled={status === "sending"} />
                <div hidden aria-hidden="true"><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
                <label className="mt-4 flex items-start gap-3 text-xs leading-5 text-slate-600 dark:text-slate-300"><input type="checkbox" name="consent" required disabled={status === "sending"} className="mt-0.5 h-4 w-4 shrink-0 accent-blue-600" /><span>{ebookConsent}</span></label>
                <button type="submit" disabled={status === "sending"} className="focus-ring btn-lift mt-5 min-h-12 w-full rounded-xl bg-[#2D5BFF] px-5 py-4 text-sm font-bold text-white disabled:cursor-wait disabled:opacity-60">{status === "sending" ? "Joining…" : plannerReady ? "Send Me the Free Planner →" : "Join the Book Launch List →"}</button>
                {status === "error" && <p role="alert" className="mt-3 text-sm text-red-700 dark:text-red-300">{message} You can also email <a href="mailto:hello@bisacom.dev" className="underline">hello@bisacom.dev</a>.</p>}
                <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">Book updates only. To leave the list, email hello@bisacom.dev. <a href="/privacy-policy" className="focus-ring underline underline-offset-2">Privacy policy</a></p>
              </form>}
          </div>
        </div>
        <div className="grid gap-7 border-t border-slate-200 p-7 sm:p-10 md:grid-cols-3 dark:border-white/10 lg:px-12">
          {benefits.map(([number, title, description]) => <div key={number}><p className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400">INSIDE THE BOOK / {number}</p><h3 className="mt-3 font-bold text-slate-950 dark:text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{description}</p></div>)}
        </div>
      </div>
    </section>
  );
}
