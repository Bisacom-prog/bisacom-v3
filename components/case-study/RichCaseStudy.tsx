import Image from "next/image";
import Link from "next/link";
import CaseStudyNav from "@/components/case-study/CaseStudyNav";
import PhoneRail from "@/components/case-study/PhoneRail";
import Reveal from "@/components/case-study/Reveal";
import type {RichCaseStudy as Study} from "@/lib/caseStudies";
import {featuredProjects, statusLabels, type FeaturedProject} from "@/lib/projects";
import {siteConfig} from "@/lib/site";

const sections = [
  {id: "overview", label: "Overview"},
  {id: "challenge", label: "Challenge"},
  {id: "approach", label: "Approach"},
  {id: "showcase", label: "Showcase"},
  {id: "build", label: "Build"},
  {id: "content-editing", label: "Content editing"},
  {id: "outcome", label: "Outcome"},
  {id: "reflection", label: "Reflection"},
];

const card = "rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.04]";
const eyebrow = "text-xs font-bold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-400";
const h2 = "mt-3 text-3xl font-black tracking-[-0.03em] md:text-4xl";
const body = "leading-7 text-slate-600 dark:text-slate-300";

function Section({id, kicker, title, children, intro}: {id: string; kicker: string; title: string; intro?: string; children: React.ReactNode}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-36 px-6 py-16 md:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className={eyebrow}>{kicker}</p>
          <h2 id={`${id}-title`} className={h2}>{title}</h2>
          {intro && <p className={`mt-4 max-w-3xl text-lg ${body}`}>{intro}</p>}
        </Reveal>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

export default function RichCaseStudy({project, study}: {project: FeaturedProject; study: Study}) {
  const canonicalUrl = `${siteConfig.url}/projects/${project.slug}`;
  const live = project.liveUrl!;
  const liveLabel = live.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${canonicalUrl}#case-study`,
    name: `${project.title} case study`,
    headline: study.seo.title,
    description: study.seo.description,
    url: canonicalUrl,
    inLanguage: "en-GB",
    image: `${siteConfig.url}${study.hero.desktop.src}`,
    genre: "Product design and front-end development case study",
    author: {"@type": "Person", "@id": `${siteConfig.url}/#person`, name: siteConfig.personName},
    about: {"@type": "WebSite", name: "The Church of Pentecost, Norwich Assembly", url: live},
  };
  const others = featuredProjects.filter((p) => p.slug !== project.slug).slice(0, 3);
  const facts: [string, React.ReactNode][] = [
    ["Client", study.client],
    ["Category", study.category],
    ["Services", study.services.join(", ")],
    ["My role", project.role],
    ["Status", <a key="s" href={live} target="_blank" rel="noreferrer" className="text-link">{study.status} at {liveLabel} ↗</a>],
    ["Stack", project.tools.join(" · ")],
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-950 dark:bg-[#050914] dark:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}} />

      {/* A. Hero */}
      <section className="px-6 pb-14 pt-14 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link href="/projects" className="text-sm font-bold text-blue-700 dark:text-blue-400">← All projects</Link>
          <div className="mt-8 grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-start">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="status-tag status-tag--shipped">{statusLabels.shipped}</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-300">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Real client project · Live
                </span>
              </div>
              <h1 className="mt-5 text-5xl font-black tracking-[-0.045em] md:text-7xl">{project.title}</h1>
              <p className="mt-3 text-lg font-semibold text-slate-700 dark:text-slate-300">Church website: product design, UX/UI and front-end build</p>
              <p className={`mt-6 max-w-2xl text-lg ${body}`}>{study.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#2D5BFF] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-[#2148d8]">
                  Visit the live website <span aria-hidden>↗</span><span className="sr-only">(opens in a new tab)</span>
                </a>
                <Link href="/projects" className="inline-flex items-center rounded-full border border-slate-300 px-6 py-3 text-sm font-bold transition hover:border-slate-950 dark:border-white/20 dark:hover:border-white">
                  Explore more projects
                </Link>
              </div>
              <dl className="mt-10 grid gap-x-8 gap-y-5 border-t border-slate-200 pt-8 sm:grid-cols-2 dark:border-white/10">
                {facts.map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{label}</dt>
                    <dd className="mt-1.5 font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative pb-10 lg:pt-4">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 dark:border-white/10 dark:bg-[#0B1120] dark:shadow-black/40">
                <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3 dark:border-white/10" aria-hidden>
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-white/20" />
                  <span className="ml-3 truncate rounded-md bg-slate-100 px-3 py-1 text-xs text-slate-500 dark:bg-white/5 dark:text-slate-400">{liveLabel}</span>
                </div>
                <Image src={study.hero.desktop.src} width={study.hero.desktop.width} height={study.hero.desktop.height} alt={study.hero.desktop.alt} sizes="(max-width:1024px) 100vw, 640px" className="h-auto w-full" priority />
              </div>
              <div className="absolute -bottom-2 right-3 w-[26%] min-w-[96px] max-w-[170px] rounded-[1.6rem] border-[6px] border-slate-950 bg-slate-950 shadow-2xl">
                <Image src={study.hero.mobile.src} width={study.hero.mobile.width} height={study.hero.mobile.height} alt={study.hero.mobile.alt} sizes="170px" className="h-auto w-full rounded-[1.2rem]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CaseStudyNav items={sections} />

      {/* B. Overview */}
      <Section id="overview" kicker="Overview" title="A digital front door for a local church" intro={study.overview.lead}>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {study.overview.goals.map((goal, i) => (
            <li key={goal} className={`${card} p-5`}>
              <span className="text-sm font-black text-blue-700 dark:text-blue-400">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{goal}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* C. Challenge */}
      <div className="border-y border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.02]">
        <Section id="challenge" kicker="The challenge" title="One site, several audiences, constantly changing information">
          <div className="grid gap-5 md:grid-cols-2">
            {study.challenge.items.map((item) => (
              <article key={item.title} className="border-l-2 border-blue-600 pl-5 dark:border-blue-400">
                <h3 className="text-lg font-black">{item.title}</h3>
                <p className={`mt-2 ${body}`}>{item.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">{study.challenge.note}</p>
        </Section>
      </div>

      {/* D. Approach */}
      <Section id="approach" kicker="My approach" title="From requirements to a working product" intro="I led the project end to end, from design through to build. Each stage below covers the decision I made and the reasoning behind it.">
        <ol className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-white/10 dark:border-white/10">
          {study.approach.map((s) => (
            <li key={s.step} className="grid gap-3 py-8 md:grid-cols-[4rem_1fr_1.4fr] md:gap-8">
              <span className="text-sm font-black text-blue-700 dark:text-blue-400">{s.step}</span>
              <div>
                <h3 className="text-lg font-black">{s.title}</h3>
                <p className="mt-2 font-semibold text-slate-800 dark:text-slate-200">{s.decision}</p>
              </div>
              <p className={body}>{s.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* E. Showcase */}
      <div className="border-y border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.02]">
        <Section id="showcase" kicker="Design and interface" title="The interface, screen by screen" intro={study.showcase.intro}>
          <div className="space-y-16 md:space-y-20">
            {study.showcase.desktop.map((shot, i) => {
              const [title, ...rest] = shot.caption.split(": ");
              return (
                <figure key={shot.src} className={`grid gap-6 lg:items-center lg:gap-12 ${i % 2 ? "lg:grid-cols-[2.2fr_1fr]" : "lg:grid-cols-[1fr_2.2fr]"}`}>
                  <figcaption className={i % 2 ? "lg:order-2" : ""}>
                    <span className="text-sm font-black text-blue-700 dark:text-blue-400">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-2 text-xl font-black">{title}</h3>
                    <p className={`mt-2 ${body}`}>{(t => t.charAt(0).toUpperCase() + t.slice(1))(rest.join(": "))}</p>
                  </figcaption>
                  <a href={shot.src} target="_blank" rel="noreferrer" className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-[#0B1120] dark:shadow-black/30" aria-label={`Open full-size screenshot: ${title}`}>
                    <div className="flex gap-1.5 border-b border-slate-200 px-4 py-2.5 dark:border-white/10" aria-hidden>
                      <span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-white/20" /><span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-white/20" /><span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-white/20" />
                    </div>
                    <Image src={shot.src} width={shot.width} height={shot.height} alt={shot.alt} sizes="(max-width:1024px) 100vw, 860px" className="h-auto w-full transition duration-500 group-hover:scale-[1.01]" />
                  </a>
                </figure>
              );
            })}
          </div>
          <h3 className="mt-20 text-xl font-black">On mobile</h3>
          <p className={`mt-2 max-w-2xl ${body}`}>Most visitors check service times and directions on a phone, so the mobile layout was designed first. Scroll sideways to see more.</p>
          <div className="mt-8">
            <PhoneRail items={study.showcase.mobile} />
          </div>
        </Section>
      </div>

      {/* F. Technical implementation */}
      <Section id="build" kicker="Technical implementation" title="Built on a stack the church can grow with" intro="Each technology has a specific job in the finished product.">
        <dl className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {study.stack.map((t) => (
            <div key={t.name} className={`${card} p-6`}>
              <dt className="font-black">{t.name}</dt>
              <dd className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{t.role}</dd>
            </div>
          ))}
        </dl>
        <h3 className="mt-14 text-xl font-black">Engineering details</h3>
        <ul className="mt-6 grid gap-x-10 gap-y-6 md:grid-cols-2">
          {study.engineering.map((e) => (
            <li key={e.title} className="flex gap-4">
              <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600 dark:bg-blue-400" />
              <div>
                <p className="font-bold">{e.title}</p>
                <p className={`mt-1 text-sm ${body}`}>{e.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* G. Content management */}
      <div className="border-y border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.02]">
        <Section id="content-editing" kicker="Content management" title="Designed for the volunteers who run it" intro={study.cms.lead}>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-lg font-black">What editors manage</h3>
              <dl className="mt-5 space-y-4">
                {study.cms.sections.map((s) => (
                  <div key={s.name} className={`${card} p-5`}>
                    <dt className="font-bold">{s.name}</dt>
                    <dd className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{s.fields}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className="text-lg font-black">Editor-experience decisions</h3>
              <ul className="mt-5 space-y-4">
                {study.cms.decisions.map((d) => (
                  <li key={d} className="flex gap-3">
                    <span aria-hidden className="mt-1 font-black text-blue-700 dark:text-blue-400">✓</span>
                    <span className={body}>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      </div>

      {/* H. Outcome */}
      <Section id="outcome" kicker="Outcome" title="What was delivered" intro={study.outcome.lead}>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {study.outcome.deliverables.map((d) => (
            <li key={d} className={`${card} flex gap-3 p-5`}>
              <span aria-hidden className="font-black text-emerald-600 dark:text-emerald-400">✓</span>
              <span className="text-sm font-semibold leading-6">{d}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">{study.outcome.note}</p>
      </Section>

      {/* I. Reflection */}
      <div className="border-y border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.02]">
        <Section id="reflection" kicker="Reflection" title="What this project demonstrates">
          <div className="max-w-3xl space-y-5">
            {study.reflection.map((r) => <p key={r} className={`text-lg ${body}`}>{r}</p>)}
          </div>
        </Section>
      </div>

      {/* J. CTA */}
      <section aria-labelledby="cta-title" className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-slate-950 px-8 py-14 text-white md:px-14 dark:bg-white/[0.06]">
          <h2 id="cta-title" className="max-w-2xl text-3xl font-black tracking-[-0.03em] md:text-4xl">See it working for real</h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-300">The site is live and maintained by the church. Visit it to see the design and build described here, or explore more of my product design and front-end work.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-200">
              Visit the live website <span aria-hidden>↗</span><span className="sr-only">(opens in a new tab)</span>
            </a>
            <Link href="/projects" className="inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-sm font-bold transition hover:border-white">Explore more projects</Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="more-title" className="border-t border-slate-200 px-6 py-16 dark:border-white/10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 id="more-title" className="text-2xl font-black">More projects</h2>
          <ul className="mt-6 grid gap-5 md:grid-cols-3">
            {others.map((p) => (
              <li key={p.slug}>
                <Link href={`/projects/${p.slug}`} className={`${card} block p-5 transition hover:-translate-y-1`}>
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
