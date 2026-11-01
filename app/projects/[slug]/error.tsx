"use client";

import Link from "next/link";

export default function CaseStudyError({reset}: {reset: () => void}) {
  return (
    <div className="page-shell py-24">
      <p className="eyebrow">Case study unavailable</p>
      <h1 className="section-title mt-4 max-w-2xl">This case study could not be loaded just now.</h1>
      <p className="mt-5 max-w-xl text-lg leading-8 text-muted">The content service did not respond. Please try again, or browse the other projects.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={reset} className="btn btn-primary">Try again</button>
        <Link href="/projects" className="btn btn-secondary">All projects</Link>
      </div>
    </div>
  );
}
