import Link from "next/link";

export default function PlannerBookUpsell() {
  return (
    <section className="mt-16 rounded-xl border border-line bg-surface-muted p-7 sm:p-9">
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent-ink">Continue the journey</span>
      <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Ready for the full system?</h2>
      <p className="mt-4 max-w-3xl leading-7 text-foreground">
        The 30-Day Planner gives you the action plan. <em>From Beginner to Hired</em> gives you the complete Product Design career system behind it — fundamentals, portfolio strategy, responsible AI workflows, applications and interview preparation.
      </p>
      <Link href="/books/from-beginner-to-hired" className="btn btn-secondary mt-6">
        Explore the book
      </Link>
    </section>
  );
}
