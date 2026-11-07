import Link from "next/link";
import {featuredProjects} from "@/lib/projects";

// Evidence-first summary for shipped client work, shown before the long-form case study.
// Content lives in lib/projects.ts so it stays in sync with the homepage cards.
export default function AtAGlance({slug}: {slug: string}) {
  const project = featuredProjects.find((p) => p.slug === slug && p.statuses.includes("shipped"));
  if (!project?.evidence) return null;

  return (
    <section aria-labelledby="at-a-glance" className="px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-8 md:p-10 dark:border-white/10 dark:bg-white/[0.04]">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-green-700 dark:text-green-400">At a glance</p>
        <h2 id="at-a-glance" className="mt-3 text-3xl font-black tracking-[-0.03em] md:text-4xl">What shipped, and the evidence behind it</h2>

        <dl className="mt-8 grid gap-4 sm:grid-cols-3">
          {project.evidence.map((item) => (
            <div key={item.value} className="flex flex-col rounded-2xl bg-slate-50 p-5 dark:bg-white/[0.05]">
              <dt className="text-sm text-slate-600 dark:text-slate-400">{item.label}</dt>
              <dd className="order-first text-2xl font-black">{item.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
          {project.shipped && (
            <div>
              <h3 className="font-black">What was delivered</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {project.shipped.map((item) => <li key={item} className="flex gap-3 text-sm leading-6"><b className="text-green-600 dark:text-green-400" aria-hidden="true">✓</b>{item}</li>)}
              </ul>
            </div>
          )}
          <div className="flex flex-col gap-5">
            {project.quote && (
              <blockquote className="border-l-2 border-blue-500 pl-4 text-lg italic leading-8">
                “{project.quote.text}”
                <footer className="mt-2 text-sm not-italic text-slate-600 dark:text-slate-400">— {project.quote.author}</footer>
              </blockquote>
            )}
            <div className="flex flex-wrap gap-3">
              {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="rounded-xl bg-[#2D5BFF] px-5 py-3 text-sm font-bold text-white">Visit the live site ↗</a>}
              <Link href="/services/website-design-norwich" className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold dark:border-white/20">Need something similar?</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
