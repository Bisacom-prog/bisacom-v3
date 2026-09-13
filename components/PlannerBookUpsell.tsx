import Link from "next/link";

export default function PlannerBookUpsell() {
  return (
    <section className="mt-16 rounded-3xl border border-violet-200 bg-violet-50 p-7 dark:border-violet-400/20 dark:bg-violet-400/10 sm:p-9">
      <span className="text-xs font-black uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">Continue the journey</span>
      <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">Ready for the full system?</h2>
      <p className="mt-4 max-w-3xl leading-7 text-slate-700 dark:text-slate-300">
        The 30-Day Planner gives you the action plan. <em>From Beginner to Hired</em> gives you the complete Product Design career system behind it — fundamentals, portfolio strategy, responsible AI workflows, applications and interview preparation.
      </p>
      <Link href="/from-beginner-to-hired" className="book-cta-dark mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-violet-600 dark:bg-white dark:text-slate-950 dark:hover:bg-violet-300">
        Explore the book
      </Link>
    </section>
  );
}
