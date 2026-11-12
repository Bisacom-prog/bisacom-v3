import Image from "next/image";
import Link from "next/link";
import AtAGlance from "@/components/case-study/AtAGlance";
import {featuredProjects, statusLabels, type FeaturedProject} from "@/lib/projects";
import {siteConfig} from "@/lib/site";

// A project page built from lib/projects.ts, used when a project has no Sanity case study yet.
// It only shows facts recorded in the project data, so nothing here goes beyond what shipped.
export function findLocalProject(slug: string) {
  return featuredProjects.find((p) => p.slug === slug);
}

export default function LocalCaseStudy({project}: {project: FeaturedProject}) {
  const canonicalUrl = `${siteConfig.url}/projects/${project.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${canonicalUrl}#case-study`,
    name: project.title,
    headline: project.title,
    description: project.description,
    url: canonicalUrl,
    inLanguage: "en-GB",
    image: `${siteConfig.url}${project.image}`,
    author: {"@type": "Person", "@id": `${siteConfig.url}/#person`, name: siteConfig.personName},
  };
  const others = featuredProjects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-950 dark:bg-[#050914] dark:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}} />

      <section className="px-6 pb-12 pt-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link href="/#projects" className="text-sm font-bold text-blue-600 dark:text-blue-400">← All projects</Link>
          <div className="mt-8 flex flex-wrap gap-2">
            {project.statuses.map((status) => <span key={status} className={`status-tag status-tag--${status}`}>{statusLabels[status]}</span>)}
          </div>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-6xl">{project.title}</h1>
          <p className="mt-3 text-lg font-semibold text-slate-700 dark:text-slate-300">{project.category}</p>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">{project.description}</p>

          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
              <dt className="text-xs font-bold uppercase tracking-[0.14em] text-slate-600 dark:text-slate-400">My role</dt>
              <dd className="mt-2 font-bold">{project.role}</dd>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
              <dt className="text-xs font-bold uppercase tracking-[0.14em] text-slate-600 dark:text-slate-400">Built with</dt>
              <dd className="mt-2 font-bold">{project.tools.join(" · ")}</dd>
            </div>
            {project.liveUrl && (
              <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-slate-600 dark:text-slate-400">Live site</dt>
                <dd className="mt-2"><a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-link font-bold">{project.liveUrl.replace(/^https?:\/\/(www\.)?/, "")} ↗</a></dd>
              </div>
            )}
          </dl>

          <div className="mt-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-white dark:border-white/10 dark:bg-[#0B1120]">
            <Image src={project.image} width={project.imageSize?.[0] ?? 1600} height={project.imageSize?.[1] ?? 1000} sizes="(max-width:1280px) 100vw,1280px" alt={project.imageAlt} className="h-auto w-full" priority />
          </div>
        </div>
      </section>

      <AtAGlance slug={project.slug} />

      <section aria-labelledby="brief-title" className="px-6 pb-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 id="brief-title" className="text-3xl font-black tracking-[-0.03em] md:text-4xl">The brief, the approach and where it stands</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[["The need", project.problem], ["Design and build approach", project.approach], ["Outcome", project.outcome]].map(([label, text]) => (
              <article key={label} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.04]">
                <h3 className="font-black">{label}</h3>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="more-title" className="border-t border-slate-200 px-6 py-16 dark:border-white/10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 id="more-title" className="text-2xl font-black">More projects</h2>
          <ul className="mt-6 grid gap-5 md:grid-cols-3">
            {others.map((p) => (
              <li key={p.slug}>
                <Link href={`/projects/${p.slug}`} className="block rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.04]">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{statusLabels[p.statuses[0]]}</span>
                  <span className="mt-1 block text-lg font-black">{p.title}</span>
                  <span className="mt-1 block text-sm text-slate-600 dark:text-slate-400">{p.category}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
