import Image from "next/image";
import Link from "next/link";
import BookGrid from "@/components/books/BookGrid";
import ContactSection from "@/components/home/ContactSection";
import DesignToCode from "@/components/home/DesignToCode";
import {MotionDemo} from "@/components/MotionPrototype";
import {books} from "@/lib/books";
import {blogPosts} from "@/lib/blog-posts";
import {featuredProjects, statusLabels} from "@/lib/projects";
import {getApprovedReviews} from "@/lib/reviews";
import {siteConfig} from "@/lib/site";

export const revalidate = 300;

  const workflow = [
  {phase: "Understand", steps: ["Product discovery", "UX research", "Problem definition"], note: "What is the real problem, for whom, and what does the business need?"},
  {phase: "Shape", steps: ["User flows", "Interaction design", "Design systems"], note: "How does it work across every state, including the unhappy paths?"},
  {phase: "Build", steps: ["Prototyping", "Front-end development", "Testing and delivery"], note: "Does it hold up in code, on real devices, for real people?"},
  ];

const capabilities = [
  {
    title: "Product Strategy and UX",
    does: "Discovery, problem framing, UX research, information architecture and complex user flows.",
    solves: "Unclear requirements, and journeys that lose people before they finish.",
    benefit: "Teams commit to the right problem before spending engineering time on it.",
    tools: ["Usability testing", "FigJam", "Figma"],
  },
  {
    title: "UI Design, Interaction and Design Systems",
    does: "Responsive interfaces, interaction states, motion-aware prototypes and reusable component systems.",
    solves: "Inconsistent interfaces, missing states and slow handover.",
    benefit: "A product that stays coherent as it grows, with less rework for developers.",
    tools: ["Figma", "Auto Layout and variants", "Accessible design"],
  },
  {
    title: "Brand and Visual Systems",
    does: "Identity direction, typography, colour, visual hierarchy and digital applications.",
    solves: "Products that function but do not feel credible or recognisable.",
    benefit: "One consistent brand across the product and every other touchpoint.",
    tools: ["Adobe Creative Cloud", "Figma"],
  },
  {
    title: "Design Engineering",
    does: "Production front-end work, design-to-code workflows and content-managed builds.",
    solves: "Designs that lose their intent in build, or never get built at all.",
    benefit: "Realistic designs, and a designer who can ship or work closely with engineers.",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Git and GitHub", "Sanity", "Vercel"],
  },
];

const journey = [
  {title: "Graphic design and brand identity", text: "Where I learned visual hierarchy, typography, colour, composition and how a brand should feel across every touchpoint."},
  {title: "Product design", text: "Bringing that discipline to user flows, interfaces and design systems, starting from user needs and business goals."},
  {title: "Design engineering", text: "Building with React and Next.js, so what I design is realistic to implement and carries through to production."},
];

export default async function Page() {
  const reviews = await getApprovedReviews();

  return (
    <>
      <section className="border-b border-line">
        <div className="page-shell grid items-center gap-12 py-14 lg:grid-cols-[1.15fr_.85fr] lg:gap-16 lg:py-24">
          <div>
            <p className="eyebrow">{siteConfig.personName} · Product Designer + Design Engineer</p>
            <h1 className="mt-6 font-display text-[clamp(2.75rem,1.9rem+3.5vw,5rem)] font-bold leading-[.98] tracking-[-.035em]">
              I design products that move from <span className="underline decoration-accent decoration-[.08em] underline-offset-[.12em] [text-decoration-skip-ink:none]">Figma to production.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-muted">
              Product design for SaaS, web applications and AI-assisted products, backed by design systems and front-end implementation in React and Next.js.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/#projects" className="btn btn-primary">Explore Projects</Link>
              <Link href="/#contact" className="btn btn-secondary">Contact Me</Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              {siteConfig.availability.open && <p className="status-tag status-tag--available">{siteConfig.availability.label}</p>}
              <a href={siteConfig.linkedIn} target="_blank" rel="noreferrer" className="text-link">View LinkedIn profile</a>
            </div>
          </div>
          <DesignToCode />
        </div>
      </section>

      <section id="projects" aria-labelledby="projects-title" className="page-shell py-20 lg:py-28">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Selected projects</p>
            <h2 id="projects-title" className="section-title mt-4 max-w-3xl">One shipped product. Two concepts that go deep.</h2>
          </div>
          <Link href="/projects" className="text-link shrink-0">All projects</Link>
        </div>

        <div className="mt-14 grid gap-20">
          {featuredProjects.map((project, index) => (
            <article key={project.slug} className="project-row grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
              <Link href={`/projects/${project.slug}`} aria-hidden="true" tabIndex={-1} className={`project-media block lg:col-span-7 ${index % 2 ? "lg:order-2" : ""}`}>
                <Image src={project.image} alt={project.imageAlt} width={project.imageWidth} height={project.imageHeight} sizes="(max-width: 1024px) 100vw, 58vw" className="h-auto w-full" />
              </Link>
              <div className={`lg:col-span-5 ${index % 2 ? "lg:order-1" : ""}`}>
                <div className="flex flex-wrap gap-2">
                  {project.statuses.map((status) => <span key={status} className={`status-tag status-tag--${status}`}>{statusLabels[status]}</span>)}
                </div>
                <h3 className="mt-5 text-4xl font-bold leading-tight">{project.title}</h3>
                <p className="mt-1 font-medium text-muted">{project.category}</p>
                <p className="mt-4 leading-7 text-muted">{project.description}</p>
                <dl className="mt-6 grid gap-3 border-t border-line pt-5 text-sm leading-6">
                  <div><dt className="inline font-semibold">Problem: </dt><dd className="inline text-muted">{project.problem}</dd></div>
                  <div><dt className="inline font-semibold">Approach: </dt><dd className="inline text-muted">{project.approach}</dd></div>
                  <div><dt className="inline font-semibold">Outcome: </dt><dd className="inline text-muted">{project.outcome}</dd></div>
                  <div><dt className="inline font-semibold">Role: </dt><dd className="inline text-muted">{project.role}</dd></div>
                </dl>
                <p className="mono-note mt-4 text-muted">{project.tools.join(" · ")}</p>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Link href={`/projects/${project.slug}`} className="btn btn-secondary" aria-label={`Read the ${project.title} case study`}>Read the case study</Link>
                  {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-link">Visit the live site</a>}
                </div>
              </div>
            </article>
          ))}
        </div>

        {reviews.length > 0 && (
          <div className="mt-24 border-t border-line pt-10">
            <h3 className="eyebrow">From clients I’ve worked with</h3>
            <div className="mt-6 grid gap-10 md:grid-cols-3">
              {reviews.map((review) => (
                <figure key={review._id}>
                  <blockquote className="leading-7">“{review.review}”</blockquote>
                  <figcaption className="mt-4 text-sm"><b className="font-semibold">{review.name}</b><span className="block text-muted">{[review.role, review.company].filter(Boolean).join(" · ")}</span></figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}
      </section>

      <section id="process" aria-labelledby="process-title" className="border-y border-line bg-surface-muted py-20 lg:py-28">
        <div className="page-shell grid gap-12 lg:grid-cols-[1.2fr_.8fr] lg:gap-16">
          <div>
            <p className="eyebrow">Product design and engineering</p>
            <h2 id="process-title" className="section-title mt-4">From the first question to the working interface.</h2>
            <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line">
              {workflow.map((stage, index) => (
                <li key={stage.phase} className="grid gap-4 bg-background p-6 sm:grid-cols-[10rem_1fr] lg:p-7">
                  <div>
                    <span className="mono-note text-accent-ink">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="mt-1 text-2xl font-bold">{stage.phase}</h3>
                  </div>
                  <div>
                    <ul className="flex flex-wrap gap-x-2 gap-y-1 font-medium">
                      {stage.steps.map((step, stepIndex) => <li key={step}>{step}{stepIndex < stage.steps.length - 1 && <span aria-hidden="true" className="ml-2 text-accent-ink">→</span>}</li>)}
                    </ul>
                    <p className="mt-2 text-sm leading-6 text-muted">{stage.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <figure>
            <MotionDemo />
            <figcaption className="mt-4 text-sm leading-6 text-muted">
              Interaction design, shown in motion: system feedback from request to live tracking in the Mobile Mechanic concept.{" "}
              <Link href="/projects/mobile-mechanic-app" className="text-link text-foreground">See the case study</Link>
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="about" aria-labelledby="about-title" className="page-shell grid gap-12 py-20 lg:grid-cols-[.9fr_1.1fr] lg:gap-20 lg:py-28">
        <div>
          <p className="eyebrow">About</p>
          <h2 id="about-title" className="section-title mt-4">A brand designer’s eye. A product designer’s process. A developer’s constraints.</h2>
        </div>
        <div>
          <p className="text-lg leading-8">I’m Bismark Apenkwah, a Product Designer and Design Engineer based in Norwich, UK. I work across the full path from idea to interface: understanding the problem, designing the experience in Figma, building reusable UI patterns and carrying the intent into production.</p>
          <p className="mt-5 leading-7 text-muted">For product teams, that means a designer who understands implementation constraints. For clients, it means brand-aware digital experiences that are coherent, usable and ready to ship.</p>
          <ol className="mt-10 border-l-2 border-accent">
            {journey.map((step) => (
              <li key={step.title} className="pb-7 pl-6 last:pb-0">
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="mt-1 leading-7 text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="capabilities" aria-labelledby="capabilities-title" className="border-t border-line py-20 lg:py-28">
        <div className="page-shell">
          <p className="eyebrow">Capabilities</p>
          <h2 id="capabilities-title" className="section-title mt-4 max-w-3xl">Product, brand and code, connected by one system.</h2>
          <div className="mt-12">
            {capabilities.map((capability, index) => (
              <article key={capability.title} className="grid gap-5 border-t border-line py-8 lg:grid-cols-[1.1fr_1fr_1fr_1fr] lg:gap-8">
                <div>
                  <span className="mono-note text-accent-ink">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-1 text-2xl font-bold leading-tight">{capability.title}</h3>
                  <p className="mono-note mt-3 text-muted">{capability.tools.join(" · ")}</p>
                </div>
                {[["What I do", capability.does], ["Problems I help solve", capability.solves], ["What your team gets", capability.benefit]].map(([label, text]) => (
                  <div key={label}>
                    <h4 className="font-sans text-sm font-semibold tracking-normal">{label}</h4>
                    <p className="mt-1 leading-7 text-muted">{text}</p>
                  </div>
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="books" aria-labelledby="books-title" className="border-t border-line bg-surface-muted py-20 lg:py-28">
        <div className="page-shell">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Books</p>
              <h2 id="books-title" className="section-title mt-4 max-w-3xl">Writing what I’ve learned.</h2>
            </div>
            <Link href="/books" className="text-link shrink-0">All books</Link>
          </div>
          <div className="mt-14"><BookGrid books={books.slice(0, 3)} /></div>
        </div>
      </section>

      <section aria-labelledby="insights-title" className="page-shell grid gap-8 py-16 lg:grid-cols-[.6fr_1.4fr] lg:gap-16">
        <div>
          <p className="eyebrow">Insights</p>
          <h2 id="insights-title" className="mt-3 text-3xl font-bold">Practical thinking for better digital products.</h2>
          <Link href="/blog" className="text-link mt-4 inline-block">All insights</Link>
        </div>
        <ul>
          {blogPosts.slice(0, 3).map((post) => (
            <li key={post.slug} className="border-b border-line first:border-t">
              <Link href={`/blog/${post.slug}`} className="flex flex-col gap-1 py-4 hover:text-accent-ink sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <span className="font-display text-lg font-semibold tracking-tight">{post.title}</span>
                <span className="mono-note shrink-0 text-muted">{post.readTime}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ContactSection />
    </>
  );
}
