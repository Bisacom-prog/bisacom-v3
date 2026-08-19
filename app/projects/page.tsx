import {client} from "../../sanity/lib/client"
import {projectsIndexQuery} from "../../sanity/lib/queries"
import type {Metadata} from "next"

export const metadata: Metadata = {
  title: "Product Design Case Studies",
  description: "Explore mobile, SaaS and responsive web product-design case studies by Bismark Apenkwah, a Product Designer in Norwich, UK.",
  alternates: {canonical: "/projects"},
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

const fallbackProjects: ProjectCard[] = [
  {
    title: "Ma Adjo’s Kitchen",
    type: "Live Client Project · Responsive Web",
    description:
      "A shipped ordering and catering website that replaces a phone-only journey with structured WhatsApp ordering, allergen guidance and event enquiries.",
    image: "/img/kitchen-v2.webp",
    href: "/projects/ma-adjo-s-kitchen",
  },
  {
    title: "Mobile Mechanic App",
    type: "Product Design · Mobile App",
    description:
      "AI-assisted roadside support concept focused on fast help requests, mechanic matching and resilient mobile flows.",
    image: "/img/mobile.webp",
    href: "/projects/mobile-mechanic-app",
  },
]

export const revalidate = 60

export default async function ProjectsPage() {
  const sanityProjects = await client.fetch<ProjectCard[]>(projectsIndexQuery)
  const sanitySlugs = new Set(sanityProjects.map((project) => project.slug))
  const order = ["Ma Adjo’s Kitchen", "Mobile Mechanic App", "Short-Notice Shift Coverage"]
  const projects = [
    ...sanityProjects,
    ...fallbackProjects.filter((project) => {
      const slug = project.href?.split("/").filter(Boolean).at(-1)
      return !slug || !sanitySlugs.has(slug)
    }),
  ].sort((a,b)=>{
    const ai=order.indexOf(a.title), bi=order.indexOf(b.title)
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi)
  })

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-6 py-24 text-slate-950 dark:bg-[#050914] dark:text-white lg:px-8">
      <section className="mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
          Selected Work
        </p>
        <div className="mt-3 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-[-0.04em] md:text-6xl">
              Product design case studies
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              End-to-end work spanning product strategy, UX/UI, design systems and front-end implementation.
            </p>
          </div>
          <a href="/" className="text-sm font-bold text-blue-600 dark:text-blue-400">
            ← Back home
          </a>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project._id ?? project.title}
              className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0B1120]"
            >
              <img
                src={project.heroImageUrl ?? project.image ?? "/img/mockup.webp"}
                alt={project.heroImageAlt ?? `${project.title} case study preview`}
                className="h-72 w-full object-cover"
              />
              <div className="p-7">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                  {project.projectType ?? project.type ?? "Product Design"}
                </p>
                <h2 className="mt-3 text-2xl font-black">{project.title}</h2>
                <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
                  {project.summary ?? project.description}
                </p>
                <a
                  href={project.slug ? `/projects/${project.slug}` : project.href ?? "/projects"}
                  className="mt-6 inline-flex rounded-xl bg-[#2D5BFF] px-5 py-3 text-sm font-bold text-white"
                >
                  View Case Study →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
