import Image from "next/image";
import Link from "next/link";
import BookGrid from "@/components/books/BookGrid";
import ContactSection from "@/components/home/ContactSection";
import HeroBackground from "@/components/HeroBackground";
import MotionPrototype from "@/components/MotionPrototype";
import {books} from "@/lib/books";
import {blogPosts} from "@/lib/blog-posts";
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
  {title: "Product Strategy and UX", does: "Turns unclear requirements into a focused problem and journeys people can finish.", items: ["Discovery & requirements", "Problem framing", "UX research", "Information architecture", "Complex user flows", "Usability testing"]},
  {title: "UI Design, Interaction and Design Systems", does: "Keeps a product coherent as it grows, with less rework for developers.", items: ["Responsive UI design", "Interaction states", "Motion-aware prototyping", "Component systems", "Auto Layout & variants", "Accessible design"]},
  {title: "Brand and Visual Systems", does: "Makes products feel credible and recognisable across every touchpoint.", items: ["Identity direction", "Typography & colour", "Visual hierarchy", "Brand consistency", "Digital applications", "Adobe Creative Cloud"]},
  {title: "Design Engineering", does: "Carries design intent into production, or works closely with the engineers who do.", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Git & GitHub", "Sanity + Vercel"]},
];

const disciplines = [
  ["Product design", "Research, information architecture, flows, interaction states and usability decisions."],
  ["Graphic & brand design", "Visual identity, typography, colour, composition and brand consistency across digital touchpoints."],
  ["Design systems", "Reusable components, responsive states, accessibility considerations and scalable interface patterns."],
  ["Design engineering", "Figma-to-code workflows grounded in React, Next.js, TypeScript and implementation feasibility."],
];

export default async function Page() {
  const reviews = await getApprovedReviews();

  return (
    <>
      <section id="home" className="relative isolate overflow-hidden bg-[#050914] text-white">
        <HeroBackground />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_25%,rgba(45,91,255,.22),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(34,197,94,.08),transparent_28%)]" />
        <div className="mx-auto grid min-h-[720px] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[.95fr_1.05fr] lg:px-8">
          <div className="hero-copy max-w-2xl">
            <p className="eyebrow !text-blue-400">Product Designer + Design Engineer · Norwich, UK</p>
            <h1 className="mt-6 text-4xl font-black leading-[1.04] tracking-[-.055em] sm:text-5xl md:text-6xl xl:text-7xl">
              I design products that move from <span className="bg-gradient-to-r from-[#5C7CFF] to-[#8DA2FF] bg-clip-text text-transparent">Figma to production.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-slate-300 md:text-lg">
              AI products, SaaS workflows, design systems and responsive interfaces, designed with visual craft and grounded in React/Next.js implementation.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href="/#projects" className="focus-ring btn-lift rounded-xl bg-blue-600 px-7 py-4 text-center text-sm font-bold shadow-xl shadow-blue-500/25">Explore Projects →</Link>
              <Link href="/#contact" className="focus-ring btn-lift rounded-xl border border-white/15 bg-white/[.04] px-7 py-4 text-center text-sm font-bold">Contact Me</Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-slate-300">
              <span className="hero-pill">Shipped products</span>
              <span className="hero-pill">Brand + product design</span>
              <span className="hero-pill">Figma + React/Next.js</span>
              {siteConfig.availability.open && <span className="hero-pill">{siteConfig.availability.label}</span>}
              <a href={siteConfig.linkedIn} target="_blank" rel="noreferrer" className="px-2 py-2 font-bold text-blue-300 hover:text-white">LinkedIn profile →</a>
            </div>
          </div>
          <div className="hero-visual relative">
            <div className="absolute inset-10 rounded-full bg-blue-500/20 blur-3xl" />
            <Image src="/img/hero-product-design-v2.png" width={1586} height={992} sizes="(max-width:1024px) 100vw,52vw" className="relative h-auto w-full rounded-[2rem] border border-white/10 shadow-2xl shadow-black/60" alt="Product design workspace with web and mobile interface concepts" priority />
            <div className="hero-build-flow" aria-hidden="true"><span>Figma</span><i /><span>Design system</span><i /><span>React</span></div>
          </div>
        </div>
      </section>

      <section aria-label="Product design strengths" className="border-b border-slate-200 bg-white dark:border-white/10 dark:bg-[#080D1A]">
        <div className="mx-auto grid max-w-7xl divide-y divide-slate-200 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-white/10 lg:px-8">
          {[["Shipped product experience", "Real client delivery alongside deeper product case studies."], ["AI + complex workflows", "Interaction design for AI-assisted and multi-state product experiences."], ["Brand + product + code", "Visual systems backed by design-system and front-end fluency."]].map(([title, copy]) => (
            <div key={title} className="py-6 sm:px-6 first:pl-0 last:pr-0">
              <b className="text-slate-950 dark:text-white">{title}</b>
              <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="scroll-mt-24 bg-white py-20 dark:bg-[#050914]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="eyebrow">Selected work</p>
          <div className="mt-3 flex items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-black text-slate-950 md:text-4xl dark:text-white">Product, AI and SaaS work, with delivery behind the pixels.</h2>
              <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">A focused set showing shipped work, complex interaction design and motion thinking.</p>
            </div>
            <Link href="/projects" className="text-link hidden shrink-0 text-sm sm:inline">View all projects →</Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <article key={project.slug} className="group card-hover overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-[#0B1120]">
                <div className="relative h-64 overflow-hidden bg-slate-100 dark:bg-[#070B16]">
                  <Image src={project.image} fill sizes="(max-width:768px) 100vw,50vw" className="project-img object-cover" alt={project.imageAlt} />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 text-slate-700 dark:text-slate-200">
                    {project.statuses.map((status) => <span key={status} className={`status-tag status-tag--${status}`}>{statusLabels[status]}</span>)}
                  </div>
                  <h3 className="mt-4 text-xl font-black text-slate-950 dark:text-white">{project.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-slate-600 dark:text-slate-400">{project.category}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{project.description}</p>
                  <dl className="mt-4 grid gap-1 rounded-xl bg-slate-50 px-4 py-3 text-xs leading-5 text-slate-700 dark:bg-white/[.04] dark:text-slate-300">
                    <div><dt className="inline font-bold">Role: </dt><dd className="inline">{project.role}</dd></div>
                    <div><dt className="inline font-bold">Outcome: </dt><dd className="inline">{project.outcome}</dd></div>
                    <div><dt className="inline font-bold">Tools: </dt><dd className="inline">{project.tools.join(", ")}</dd></div>
                  </dl>
                  <div className="mt-5"><Link href={`/projects/${project.slug}`} className="text-link text-sm" aria-label={`View the ${project.title} case study`}>View case study →</Link></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <MotionPrototype />

      <section id="about" className="scroll-mt-24 border-y border-slate-200 bg-white py-16 dark:border-white/10 dark:bg-[#080D1A]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[.72fr_1.28fr] lg:px-8">
          <div>
            <p className="eyebrow">About</p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 dark:text-white">A visual designer who grew into product design and design engineering.</h2>
          </div>
          <div>
            <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">I’m Bismark Apenkwah, a Product Designer and Design Engineer based in Norwich, UK. My foundation is in graphic design and brand identity, where I learned to think carefully about visual hierarchy, typography, colour, composition and how a brand should feel across every touchpoint. I now bring that visual discipline into product design — shaping user flows, interfaces and design systems — and into front-end implementation with React and Next.js.</p>
            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">That combination lets me work across the full path from idea to interface: understanding the problem, designing the experience in Figma, building reusable UI patterns and carrying the intent into production. For product teams, that means a designer who understands implementation constraints; for clients, it means brand-aware digital experiences that are coherent, usable and ready to ship.</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {disciplines.map(([title, copy], index) => (
                <article key={title} className="flex gap-4">
                  <span className="icon-box" aria-hidden="true">{["○", "◇", "↗", "<>"][index]}</span>
                  <div>
                    <h3 className="font-bold text-slate-950 dark:text-white">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">{copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="scroll-mt-24 bg-slate-50 py-20 dark:bg-[#080D1A]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="eyebrow">Product design and engineering</p>
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

      <section id="capabilities" className="scroll-mt-24 bg-slate-50 py-20 dark:bg-[#080D1A]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="eyebrow">Core capabilities</p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-4xl dark:text-white">Product, brand and code — connected by one system</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {capabilities.map((capability, index) => (
              <article key={capability.title} className="skill-card" style={{animationDelay: `${index * 90}ms`}}>
                <span className="skill-orb">0{index + 1}</span>
                <h3 className="mt-6 text-lg font-black text-slate-950 dark:text-white">{capability.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{capability.does}</p>
                <ul className="mt-5 space-y-3">
                  {capability.items.map((item) => <li key={item} className="flex gap-3 text-sm text-slate-600 dark:text-slate-300"><i className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="books" className="scroll-mt-24 bg-white py-20 dark:bg-[#050914]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Books</p>
              <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-4xl dark:text-white">Practical writing, published through Bisacom</h2>
            </div>
            <Link href="/books" className="text-link text-sm">View all books →</Link>
          </div>
          <div className="mt-10"><BookGrid books={books.slice(0, 3)} /></div>
        </div>
      </section>

      <section id="insights" className="scroll-mt-24 bg-slate-50 py-20 dark:bg-[#080D1A]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Insights</p>
              <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-4xl dark:text-white">Practical thinking for better digital products</h2>
              <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">UX, product design and SaaS guidance for startups and small businesses.</p>
            </div>
            <Link href="/blog" className="text-link text-sm">View all insights →</Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {blogPosts.slice(0, 3).map((post) => (
              <article key={post.slug} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#0B1120]">
                <p className="eyebrow">{post.category}</p>
                <h3 className="mt-3 text-xl font-black leading-tight text-slate-950 dark:text-white"><Link href={`/blog/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400">{post.title}</Link></h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{post.excerpt}</p>
                <p className="mt-5 text-xs text-slate-600 dark:text-slate-400">{post.readTime}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {reviews.length > 0 && (
        <section id="reviews" className="scroll-mt-24 bg-white py-20 dark:bg-[#050914]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="eyebrow">Client feedback</p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-4xl dark:text-white">Trusted collaboration, clearly delivered</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <article key={review._id} className="rounded-2xl border border-slate-200 p-6 dark:border-white/10 dark:bg-[#0B1120]">
                  <p className="text-amber-600 dark:text-amber-400" role="img" aria-label={`${review.rating} out of 5 stars`}>{"★".repeat(review.rating)}<span className="text-slate-300">{"★".repeat(5 - review.rating)}</span></p>
                  <blockquote className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-300">“{review.review}”</blockquote>
                  <b className="mt-5 block text-slate-950 dark:text-white">{review.name}</b>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{[review.role, review.company].filter(Boolean).join(" · ")}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactSection />
    </>
  );
}
