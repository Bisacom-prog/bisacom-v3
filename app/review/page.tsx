"use client";

import {FormEvent, useState} from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function ReviewPage() {
  const [status, setStatus] = useState<Status>("idle");

  async function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Review submission failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main id="main-content" className="min-h-screen bg-slate-50 px-6 py-12 dark:bg-[#050914] sm:py-20">
      <div className="mx-auto max-w-2xl">
        <a href="/" className="text-sm font-bold text-blue-600 dark:text-blue-400">← Back to Bisacom</a>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 dark:border-white/10 dark:bg-[#0B1120] dark:shadow-none sm:p-10">
          <p className="eyebrow">Client review</p>
          <h1 className="mt-3 text-3xl font-black text-slate-950 dark:text-white sm:text-4xl">Share your experience</h1>
          <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">Thank you for working with Bisacom. Your review will be checked before it appears publicly.</p>

          {status === "success" ? (
            <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6 text-green-900" role="status">
              <strong>Thank you, your review has been received.</strong>
              <p className="mt-2 text-sm">It will appear on the portfolio after approval.</p>
            </div>
          ) : (
            <form className="mt-8 grid gap-5" onSubmit={submitReview}>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">Full name
                  <input className="form-control" name="name" required autoComplete="name" />
                </label>
                <label className="grid gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">Email
                  <input className="form-control" name="email" type="email" required autoComplete="email" />
                </label>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">Company <span className="font-normal text-slate-500">(optional)</span>
                  <input className="form-control" name="company" autoComplete="organization" />
                </label>
                <label className="grid gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">Role <span className="font-normal text-slate-500">(optional)</span>
                  <input className="form-control" name="role" autoComplete="organization-title" />
                </label>
              </div>
              <label className="grid gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">Rating
                <select className="form-control" name="rating" defaultValue="5" required>
                  <option value="5">5 — Excellent</option>
                  <option value="4">4 — Very good</option>
                  <option value="3">3 — Good</option>
                  <option value="2">2 — Fair</option>
                  <option value="1">1 — Poor</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">Your review
                <textarea className="form-control" name="review" rows={6} minLength={20} maxLength={800} required />
              </label>
              <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              {status === "error" && <p className="text-sm font-bold text-red-600" role="alert">Your review could not be submitted. Please try again or email hello@bisacom.dev.</p>}
              <button className="btn-lift rounded-xl bg-[#2D5BFF] px-6 py-4 text-sm font-bold text-white disabled:opacity-60" disabled={status === "sending"}>
                {status === "sending" ? "Submitting…" : "Submit review"}
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
