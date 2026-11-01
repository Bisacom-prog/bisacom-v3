"use client";

import Link from "next/link";
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
      <div className="min-h-screen bg-surface-muted px-6 py-12 sm:py-20">
            <div className="mx-auto max-w-2xl">
 <Link href="/" className="text-sm font-bold text-accent-ink">← Back to Bisacom</Link>

 <section className="mt-8 rounded-xl border border-line bg-surface p-6 sm:p-10">
              <p className="eyebrow">Client review</p>
 <h1 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">Share your experience</h1>
 <p className="mt-4 leading-7 text-muted">Thank you for working with Bisacom. Your review will be checked before it appears publicly.</p>

              {status === "success" ? (
 <div className="mt-8 rounded-2xl border border-line bg-surface-muted p-6 text-success-ink" role="status">
              <strong>Thank you, your review has been received.</strong>
 <p className="mt-2 text-sm">It will appear on the portfolio after approval.</p>
            </div>
          ) : (
 <form className="mt-8 grid gap-5" onSubmit={submitReview}>
 <div className="grid gap-5 sm:grid-cols-2">
 <label className="grid gap-2 text-sm font-bold text-foreground">Full name
 <input className="form-control" name="name" required autoComplete="name" />
                </label>
 <label className="grid gap-2 text-sm font-bold text-foreground">Email
 <input className="form-control" name="email" type="email" required autoComplete="email" />
                </label>
              </div>
 <div className="grid gap-5 sm:grid-cols-2">
 <label className="grid gap-2 text-sm font-bold text-foreground">Company <span className="font-normal text-muted">(optional)</span>
 <input className="form-control" name="company" autoComplete="organization" />
                </label>
 <label className="grid gap-2 text-sm font-bold text-foreground">Role <span className="font-normal text-muted">(optional)</span>
 <input className="form-control" name="role" autoComplete="organization-title" />
                </label>
              </div>
 <label className="grid gap-2 text-sm font-bold text-foreground">Rating
 <select className="form-control" name="rating" defaultValue="5" required>
 <option value="5">5 — Excellent</option>
 <option value="4">4 — Very good</option>
 <option value="3">3 — Good</option>
 <option value="2">2 — Fair</option>
 <option value="1">1 — Poor</option>
                </select>
              </label>
 <label className="grid gap-2 text-sm font-bold text-foreground">Your review
 <textarea className="form-control" name="review" rows={6} minLength={20} maxLength={800} required />
              </label>
 <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
 {status === "error" && <p className="text-sm font-bold text-red-600" role="alert">Your review could not be submitted. Please try again or email hello@bisacom.dev.</p>}
 <button className=" rounded-xl bg-accent px-6 py-4 text-sm font-bold disabled:opacity-60 text-on-accent" disabled={status === "sending"}>
 {status === "sending" ? "Submitting…" : "Submit review"}
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
