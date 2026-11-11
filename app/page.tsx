import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/home/ContactSection";
import ReviewCarousel from "@/components/home/ReviewCarousel";
import {averageRating} from "@/components/home/Stars";
import HeroBackground from "@/components/HeroBackground";
import MotionPrototype from "@/components/MotionPrototype";
import {books} from "@/lib/books";
import {featuredProjects, statusLabels} from "@/lib/projects";
import {getApprovedReviews} from "@/lib/reviews";
import {siteConfig} from "@/lib/site";

export const revalidate = 300;

const process = [
  ["Discover", "Product discovery, UX research and understanding users, goals and constraints."],
  ["Define", "Turn evidence into a focused problem and clear user flows."],
  ["Design", "Interaction design, design systems and prototypes, explored and refined."],
  ["Build", "Create scalable, production-ready UI with front-end development."],
  ["Deliver", "Test, document and support launch."],
];

const capabilities = [
  {title: "Product Design", does: "Turns unclear requirements into a focused problem, clear journeys and interfaces people can use.", items: ["Product discovery and problem framing", "User flows and information architecture", "Wireframing and prototyping", "UI and interaction design", "Responsive, accessible interfaces", "Design systems"]},
  {title: "Design Engineering", does: "Carries design intent into production, or works closely with the engineers who do.", items: ["HTML, CSS and JavaScript", "React and Next.js", "TypeScript", "Tailwind CSS", "Figma-to-code, component-based builds", "Sanity CMS, Git and Vercel"]},
  {title: "AI-assisted workflows", does: "Uses AI to explore and build faster, with design judgement kept in the loop.", items: ["AI-assisted ideation and prototyping", "AI-supported development workflows", "Designing AI features into products, as in Mobile Mechanic"]},
  {title: "Brand and Visual Systems", does: "The visual communication background behind clear hierarchy and consistent interfaces.", items: ["Identity direction", "Typography and colour", "Visual hierarchy", "Brand consistency across touchpoints"]},
];

const principles = [
  ["Start with the problem", "I want to know who it’s for and what the business needs before I open Figma."],
  ["Design every state", "Errors, empty screens and edge cases are part of the product, not an afterthought."],
  ["Design what can ship", "Knowing the code helps me make realistic decisions early, not at handover."],
  ["Say what’s proven", "I separate what’s been tested from what’s still an assumption, which is why my concept projects are labelled as concepts."],
];

const clients = ["Ma Adjo’s Kitchen", "NextAge Consult", "Flower Bar GH", "AddoBees Consultancy"];

const cvLinkProps = siteConfig.cvIsPdf ? {download: true} : {target: "_blank", rel: "noreferrer"};

export default async function Page() {
  const reviews = await getApprovedReviews();
  const average = averageRating(reviews);
  const shippedProjects = featuredProjects.filter((p) => p.statuses.includes("shipped"));
  const conceptProjects = featuredProjects.filter((p) => !p.statuses.includes("shipped"));
  const heroProject = shippedProjects[0];

  return (
    <>
      <section id="home" className="relative isolate overflow-hidden bg-[#050914] text-white">
        <HeroBackground />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_25%,rgba(45,91,255,.22),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(34,197,94,.08),transparent_28%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-[1.05fr_.95fr] lg:px-8">
          <div className="hero-copy max-w-2xl">
            {siteConfig.availability.open && (
              <p className="hero-pill inline-flex items-center gap-2 text-sm text-slate-200">
                <i className="h-2 w-2 shrink-0 rounded-full bg-green-400" aria-hidden="true" />
                {siteConfig.availability.label} · UK or remote
              </p>
            )}
            <h1 className="mt-7">
              <span className="block text-xl font-bold tracking-tight text-white md:text-2xl">{siteConfig.personName}</span>
              <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.12em] text-blue-200 sm:text-sm sm:tracking-[0.16em]">Product Designer + Design Engineer</span>
              <span className="mt-6 block text-4xl font-black leading-[1.04] tracking-[-.05em] sm:text-5xl md:text-6xl xl:text-[4.25rem]">
                I design products that move from <span className="bg-gradient-to-r from-[#5C7CFF] to-[#8DA2FF] bg-clip-text text-transparent">Figma to production.</span>
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-slate-300 md:text-lg">
              I combine product thinking, interface design and front-end implementation to create useful digital experiences, from user flows and design systems through to working React and Next.js interfaces. Based in Norwich, UK.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href="/#projects" className="focus-ring btn-lift rounded-xl bg-blue-600 px-7 py-4 text-center text-sm font-bold shadow-xl shadow-blue-500/25">Explore My Projects →</Link>
              <Link href="/#contact" className="focus-ring btn-lift rounded-xl border border-white/15 bg-white/[.04] px-7 py-4 text-center text-sm font-bold">Let’s Connect</Link>
            </div>
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 text-sm text-slate-400">
              <div><dt className="sr-only">Live client products</dt><dd><b className="block text-2xl font-black text-white">{shippedProjects.length}</b>live client products</dd></div>
              {reviews.length > 0 && <div><dt className="sr-only">Client rating</dt><dd><b className="block text-2xl font-black text-white">{average.toFixed(1)}<span className="text-amber-400" aria-hidden="true"> ★</span></b>from {reviews.length} client reviews</dd></div>}
              <div><dt className="sr-only">Designing since</dt><dd><b className="block text-2xl font-black text-white">{siteConfig.designingSince}</b>designing since</dd></div>
            </dl>
          </div>
          {heroProject && (
            <figure>
              <div className="hero-visual relative">
                <div className="absolute inset-10 rounded-full bg-blue-500/20 blur-3xl" />
                <Image src={heroProject.image} width={heroProject.imageSize?.[0] ?? 1600} height={heroProject.imageSize?.[1] ?? 1000} sizes="(max-width:1024px) 100vw,48vw" className="relative h-auto w-full rounded-[2rem] border border-white/10 shadow-2xl shadow-black/60" alt={heroProject.imageAlt} priority />
              </div>
              <figcaption className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-slate-300">
                <span className="inline-flex items-center gap-2 font-bold text-green-400"><i className="h-2 w-2 rounded-full bg-green-400" aria-hidden="true" />Shipped</span>
                <span>{heroProject.title}, Norwich</span>
                <Link href={`/projects/${heroProject.slug}`} className="font-bold text-blue-300 hover:text-white">Read case study →</Link>
              </figcaption>
            </figure>
          )}
        </div>
      </section>

      <section aria-label="Clients" className="border-b border-slate-200 bg-white dark:border-white/10 dark:bg-[#080D1A]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-10 gap-y-3 px-6 py-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Delivered for</span>
          {clients.map((name) => <span key={name} className="text-base font-black text-slate-700 dark:text-slate-300">{name}</span>)}
        </div>
      </section>

      <section id="projects" className="scroll-mt-24 bg-white py-20 dark:bg-[#050914]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="eyebrow">Selected work</p>
          <div className="mt-3 flex items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-black text-slate-950 md:text-4xl dark:text-white">Projects</h2>
              <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">Real client work I designed and built to client requirements, alongside independent concept products where I explore more complex product problems. Each one is labelled with its status.</p>
            </div>
            <Link href="/projects" className="text-link hidden shrink-0 text-sm sm:inline">View all projects →</Link>
          </div>

          <h3 className="mt-10 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-green-700 dark:text-green-400"><i className="h-2 w-2 rounded-full bg-green-500" aria-hidden="true" />Client projects, shipped</h3>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            {shippedProjects.map((project) => (
              <article key={project.slug} className="group card-hover flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-[#0B1120]">
                <div className="relative h-64 overflow-hidden bg-slate-100 dark:bg-[#070B16]">
                  <Image src={project.image} fill sizes="(max-width:768px) 100vw,50vw" className="project-img object-cover" alt={project.imageAlt} />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="inline-flex items-center gap-2 text-xs font-bold text-green-700 dark:text-green-400"><i className="h-2 w-2 rounded-full bg-green-500" aria-hidden="true" />{statusLabels.shipped} · {project.role}</p>
                  <h4 className="mt-3 text-2xl font-black text-slate-950 dark:text-white">{project.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{project.description}</p>
                  {project.evidence && (
                    <dl className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {project.evidence.map((item) => (
                        <div key={item.value} className="flex flex-col rounded-xl bg-slate-50 px-4 py-3 dark:bg-white/[.05]">
                          <dt className="text-xs text-slate-600 dark:text-slate-400">{item.label}</dt>
                          <dd className="order-first font-black text-slate-950 dark:text-white">{item.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {project.quote && (
                    <blockquote className="mt-5 border-l-2 border-slate-300 pl-4 text-sm italic text-slate-700 dark:border-white/20 dark:text-slate-300">“{project.quote.text}” <span className="not-italic text-slate-500 dark:text-slate-400">— {project.quote.author}</span></blockquote>
                  )}
                  <p className="mt-5 text-xs text-slate-500 dark:text-slate-400">{project.tools.join(" · ")}</p>
                  <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-5 text-sm">
                    <Link href={`/projects/${project.slug}`} className="text-link" aria-label={`Read the ${project.title} case study`}>Read case study →</Link>
                    {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-link" aria-label={`Visit the live ${project.title} site`}>Visit live site ↗</a>}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <h3 className="mt-14 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-amber-700 dark:text-amber-300"><i className="h-2 w-2 rounded-full bg-amber-500" aria-hidden="true" />Independent concept products</h3>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            {conceptProjects.map((project) => (
              <article key={project.slug} className="group card-hover flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-[#080D1A]">
                <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-[#070B16]">
                  <Image src={project.image} fill sizes="(max-width:768px) 100vw,50vw" className="project-img object-cover" alt={project.imageAlt} />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap gap-2 text-slate-700 dark:text-slate-200">
                    {project.statuses.map((status) => <span key={status} className={`status-tag status-tag--${status}`}>{statusLabels[status]}</span>)}
                  </div>
                  <h4 className="mt-3 text-2xl font-black text-slate-950 dark:text-white">{project.title}</h4>
                  <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-300">{project.category} · {project.role}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{project.description}</p>
                  {project.highlights && (
                    <ul className="mt-5 grid gap-2 sm:grid-cols-2" aria-label={`What ${project.title} explores`}>
                      {project.highlights.map((item) => <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700 dark:text-slate-300"><i className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" aria-hidden="true" />{item}</li>)}
                    </ul>
                  )}
                  <p className="mt-5 text-xs leading-5 text-slate-500 dark:text-slate-400"><b className="font-semibold text-slate-700 dark:text-slate-300">Status:</b> {project.outcome}</p>
                  <div className="mt-auto pt-5 text-sm">
                    <Link href={`/projects/${project.slug}`} className="text-link" aria-label={`View the ${project.title} project`}>View project →</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <Link href="/projects" className="text-link mt-8 inline-block text-sm sm:hidden">View all projects →</Link>
        </div>
      </section>

      <MotionPrototype />

      <section id="process" className="scroll-mt-24 bg-slate-50 pt-20 dark:bg-[#080D1A]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="eyebrow">Approach and capabilities</p>
          <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-4xl dark:text-white">A clear path from uncertainty to delivery</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {process.map(([step, copy], index) => (
              <article key={step} className="process-card rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#0B1120]">
                <p className="text-xs font-black text-blue-600">0{index + 1}</p>
                <h3 className="mt-4 font-black text-slate-950 dark:text-white">{step}</h3>
                <p className="mt-3 text-xs leading-6 text-slate-600 dark:text-slate-400">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="capabilities" className="scroll-mt-24 bg-slate-50 pb-20 dark:bg-[#080D1A]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h3 className="pt-16 text-2xl font-black text-slate-950 md:text-3xl dark:text-white">Capabilities: product, brand and code, connected by one system</h3>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {capabilities.map((capability, index) => (
              <article key={capability.title} className="skill-card" style={{animationDelay: `${index * 90}ms`}}>
                <span className="skill-orb">0{index + 1}</span>
                <h4 className="mt-6 text-lg font-black text-slate-950 dark:text-white">{capability.title}</h4>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{capability.does}</p>
                <ul className="mt-5 space-y-3">
                  {capability.items.map((item) => <li key={item} className="flex gap-3 text-sm text-slate-600 dark:text-slate-300"><i className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-24 border-y border-slate-200 bg-white py-16 dark:border-white/10 dark:bg-[#050914]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[.72fr_1.28fr] lg:px-8">
          <div>
            <p className="eyebrow">About</p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-4xl dark:text-white">I design with the build in mind.</h2>
            <a href={siteConfig.cvUrl} {...cvLinkProps} className="focus-ring mt-8 inline-flex min-h-11 items-center rounded-xl border border-slate-300 px-5 text-sm font-bold text-slate-950 hover:border-slate-500 dark:border-white/15 dark:text-white dark:hover:border-white/40">{siteConfig.cvIsPdf ? "Download CV (PDF) ↓" : "View CV on LinkedIn ↗"}</a>
          </div>
          <div>
            <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">I started in graphic design and brand identity. That background in visual communication still shapes my work: clear hierarchy, consistent systems and interfaces people can use without having to think about them. UI/UX and product design added research, user flows and systems thinking. Learning front-end development with React and Next.js changed how I design, because I now consider how a screen gets built while I’m still shaping it.</p>
            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">On <Link href="/projects/ma-adjo-s-kitchen" className="text-link">Ma Adjo’s Kitchen</Link>, I took a client’s ordering journey from UX through to a live product on my own.</p>
            <h3 className="mt-10 font-bold text-slate-950 dark:text-white">How I work</h3>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              {principles.map(([title, copy], index) => (
                <article key={title} className="flex gap-4">
                  <span className="icon-box" aria-hidden="true">{["○", "◇", "↗", "<>"][index]}</span>
                  <div>
                    <h4 className="font-bold text-slate-950 dark:text-white">{title}</h4>
                    <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">{copy}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-8 border-t border-slate-200 pt-6 text-base font-semibold leading-7 text-slate-950 dark:border-white/10 dark:text-white">Product teams get a designer who speaks engineering. Clients get one person who can take an idea through to a working product.</p>
          </div>
        </div>
      </section>

      {reviews.length > 0 && (
        <section id="reviews" className="scroll-mt-24 bg-slate-50 py-20 dark:bg-[#080D1A]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="eyebrow text-center">Client feedback</p>
            <div className="mt-5"><ReviewCarousel reviews={reviews} /></div>
          </div>
        </section>
      )}

      <section id="books" aria-labelledby="books-title" className="scroll-mt-24 border-t border-slate-200 bg-white py-14 dark:border-white/10 dark:bg-[#050914]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Books and insights</p>
              <h2 id="books-title" className="mt-2 text-2xl font-black text-slate-950 dark:text-white">Writing and knowledge sharing, published through Bisacom</h2>
            </div>
            <Link href="/books" className="text-link text-sm">View all books →</Link>
          </div>
          <ul className="mt-8 grid gap-5 md:grid-cols-2">
            {books.slice(0, 2).map((book) => (
              <li key={book.slug} className="flex gap-5 rounded-2xl border border-slate-200 p-4 dark:border-white/10">
                {book.cover && <Image src={book.cover.src} width={book.cover.width} height={book.cover.height} sizes="80px" alt={book.cover.alt} className="h-auto w-20 shrink-0 self-start rounded border border-slate-200 dark:border-white/10" />}
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{book.statusLabel}</p>
                  <h3 className="mt-1 text-lg font-black text-slate-950 dark:text-white">{book.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{book.description}</p>
                  <Link href={`/books/${book.slug}`} className="text-link mt-2 inline-block text-sm" aria-label={`View ${book.title}`}>View the book →</Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
