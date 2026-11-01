import Image from "next/image"
import Link from "next/link"
import type {Metadata} from "next"
import {client} from "../../sanity/lib/client"
import {projectsIndexQuery} from "../../sanity/lib/queries"
import {featuredProjects, statusLabels, statusesForCaseStudy} from "@/lib/projects"

export const metadata: Metadata = {
  title: "Projects",
  description: "Shipped product work, AI and SaaS case studies, and design engineering by Bismark Apenkwah. Each project states whether it is shipped or a concept.",
  alternates: {canonical: "/projects"},
  openGraph: {
    title: "Projects | Bisacom",
    description: "Shipped product work, AI and SaaS case studies, and design engineering by Bismark Apenkwah.",
    url: "/projects",
    type: "website",
  },
}

type SanityCard = {_id: string; title: string; slug: string; summary?: string; projectType?: string; heroImageUrl?: string; heroImageAlt?: string}

export const revalidate = 60

async function otherProjects() {
  try {
    const all = await client.fetch<SanityCard[]>(projectsIndexQuery)
    return all.filter((project) => !featuredProjects.some((featured) => featured.slug === project.slug))
  } catch {
    return []
  }
}

export default async function ProjectsPage() {
  const others = await otherProjects()

  return (
    <div className="page-shell py-16 lg:py-24">
      <p className="eyebrow">Projects</p>
      <h1 className="section-title mt-4 max-w-3xl">Product design and design engineering.</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">Shipped client work and concept products. Each project states clearly which it is, so you know what has been built and what is still a design proposal.</p>

      <ul className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2">
        {featuredProjects.map((project) => (
          <li key={project.slug} className="project-row flex flex-col">
            <Link href={`/projects/${project.slug}`} aria-hidden="true" tabIndex={-1} className="project-media block">
              <Image src={project.image} alt={project.imageAlt} width={project.imageWidth} height={project.imageHeight} sizes="(max-width: 768px) 100vw, 50vw" className="h-auto w-full" />
            </Link>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.statuses.map((status) => <span key={status} className={`status-tag status-tag--${status}`}>{statusLabels[status]}</span>)}
            </div>
            <h2 className="mt-4 text-3xl font-bold">{project.title}</h2>
            <p className="mt-1 font-medium text-muted">{project.category}</p>
            <p className="mt-3 flex-1 leading-7 text-muted">{project.description}</p>
            <p className="mono-note mt-4 text-muted">{project.role}</p>
            <Link href={`/projects/${project.slug}`} className="text-link mt-4 self-start" aria-label={`Read the ${project.title} case study`}>Read the case study</Link>
          </li>
        ))}
        {others.map((project) => (
          <li key={project._id} className="project-row flex flex-col">
            {project.heroImageUrl && (
              <Link href={`/projects/${project.slug}`} aria-hidden="true" tabIndex={-1} className="project-media relative block aspect-[4/3]">
                <Image src={project.heroImageUrl} alt={project.heroImageAlt ?? ""} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-top" />
              </Link>
            )}
            <div className="mt-5 flex flex-wrap gap-2">
              {statusesForCaseStudy(project.slug, project.projectType).map((status) => <span key={status} className={`status-tag status-tag--${status}`}>{statusLabels[status]}</span>)}
            </div>
            <h2 className="mt-4 text-3xl font-bold">{project.title}</h2>
            <p className="mt-3 flex-1 leading-7 text-muted">{project.summary}</p>
            <Link href={`/projects/${project.slug}`} className="text-link mt-4 self-start">Read the case study</Link>
          </li>
        ))}
      </ul>

      <aside className="mt-20 border-t border-line pt-8">
        <h2 className="text-2xl font-bold">Brand and visual systems</h2>
        <p className="mt-2 max-w-2xl leading-7 text-muted">Identity work from my foundation in graphic design.</p>
        <Link href="/projects/brand-systems" className="text-link mt-3 inline-block">See the brand work</Link>
      </aside>
    </div>
  )
}
