import Link from "next/link"
import {client} from "../../sanity/lib/client"
import {projectsIndexQuery} from "../../sanity/lib/queries"
import type {Metadata} from "next"
import {featuredProjects, statusLabels, statusesForCaseStudy} from "@/lib/projects"

export const metadata: Metadata = {
  title: "Product Design & Design Engineering",
  description: "Explore shipped product work, AI and SaaS case studies, and design engineering work by Bismark Apenkwah.",
  alternates: {canonical: "/projects"},
  openGraph: {
    title: "Product Design & Design Engineering",
    description: "Explore shipped product work, AI and SaaS case studies, and design engineering work by Bismark Apenkwah.",
    url: "/projects",
    type: "website",
    images: [{url: "/img/cop-norwich.webp", width: 1800, height: 1125, alt: "COP Norwich website on desktop and mobile, the lead project in Bismark Apenkwah's portfolio"}],
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Design & Design Engineering",
    description: "Explore shipped product work, AI and SaaS case studies, and design engineering work by Bismark Apenkwah.",
    images: ["/img/cop-norwich.webp"],
  },
}

// Sanity originals can be several thousand pixels wide; ask the CDN for a card-sized, modern-format copy.
function cardImage(src?: string) {
  if (!src) return "/img/hero-product-design-v2.png"
  if (!src.startsWith("https://cdn.sanity.io/")) return src
  return `${src}${src.includes("?") ? "&" : "?"}w=1200&h=864&fit=crop&auto=format&q=80`
}

type ProjectCard = {
  _id?: string
  title: string
  slug?: string
  summary?: string
  projectType?: string
  platform?: string
  heroImageUrl?: string
  heroImageAlt?: string
  type?: string
  description?: string
  image?: string
  href?: string
}

// Used when Sanity is unavailable, and for any project not yet published there. It is built from
// lib/projects.ts, the same data the homepage and local case studies use, so nothing drifts or is invented.
const fallbackProjects: ProjectCard[] = featuredProjects.map((project) => ({
  title: project.title,
  slug: project.slug,
  description: project.description,
  image: project.image,
  heroImageAlt: project.imageAlt,
  href: `/projects/${project.slug}`,
}))

export const revalidate = 60

export default async function ProjectsPage() {
  const sanityProjects = await client.fetch<ProjectCard[]>(projectsIndexQuery).catch(() => [] as ProjectCard[])
  const sanitySlugs = new Set(sanityProjects.map((project) => project.slug))
  // Portfolio order follows lib/projects.ts; anything only in Sanity goes after it.
  const order = featuredProjects.map((project) => project.slug)
  const rank = (slug?: string) => {
    const index = slug ? order.indexOf(slug) : -1
    return index === -1 ? order.length : index
  }
  const projects = [
    ...sanityProjects,
    ...fallbackProjects.filter((project) => !sanitySlugs.has(project.slug)),
  ].sort((a, b) => rank(a.slug) - rank(b.slug))

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-6 py-24 text-slate-950 dark:bg-[#050914] dark:text-white lg:px-8">
      <section className="mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
          Selected Work
        </p>
        <div className="mt-3 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-[-0.04em] md:text-6xl">
              Product & design engineering
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Selected work spanning shipped product delivery, AI and SaaS UX, motion thinking and front-end implementation.
            </p>
          </div>
          <Link href="/projects/brand-systems" className="inline-flex min-h-6 items-center text-sm font-bold text-blue-600 dark:text-blue-400">Brand work →</Link>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <article
              key={project._id ?? project.title}
              className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0B1120]"
            >
              <img
                src={cardImage(project.heroImageUrl ?? project.image)}
                alt={project.heroImageAlt ?? `${project.title} case study preview`}
                width={1200}
                height={864}
                loading={index < 2 ? "eager" : "lazy"}
                decoding="async"
                className="h-72 w-full object-cover"
              />
              <div className="p-7">
                <div className="flex flex-wrap gap-2">
                  {statusesForCaseStudy(project.slug ?? project.href?.split("/").at(-1) ?? "", project.projectType).map((status) => <span key={status} className={`status-tag status-tag--${status}`}>{statusLabels[status]}</span>)}
                </div>
                <h2 className="mt-3 text-2xl font-black">{project.title}</h2>
                <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
                  {project.summary ?? project.description}
                </p>
                <Link
                  href={project.slug ? `/projects/${project.slug}` : project.href ?? "/projects"}
                  className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-[#2D5BFF] px-5 py-3 text-sm font-bold text-white"
                >
                  View Case Study<span className="sr-only">: {project.title}</span> →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
