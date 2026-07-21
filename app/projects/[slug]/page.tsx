import {notFound} from "next/navigation"
import {createImageUrlBuilder} from "@sanity/image-url"
import {client} from "@/sanity/lib/client"
import {projectBySlugQuery} from "@/sanity/lib/queries"
import type {GalleryImage, Project, SanityImage} from "@/components/case-study/types"
import CaseStudyNav from "@/components/case-study/CaseStudyNav"
import Reveal from "@/components/case-study/Reveal"
import LightboxGallery from "@/components/case-study/LightboxGallery"
import PhoneRail from "@/components/case-study/PhoneRail"

export const dynamic = "force-dynamic"

const builder = createImageUrlBuilder(client)
const urlFor = (source: SanityImage) =>
  source ? builder.image(source).auto("format").fit("max").url() : ""

function mapGallery(items?: GalleryImage[]) {
  return (items || [])
    .filter((item) => item.image)
    .map((item, index) => ({
      src: urlFor(item.image),
      alt: item.alt || `Case study image ${index + 1}`,
      caption: item.caption,
    }))
}

function SectionHeading({
  eyebrow,
  title,
  description,
  inverse = false,
}: {
  eyebrow?: string
  title: string
  description?: string
  inverse?: boolean
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow && (
        <p className={inverse ? "text-xs font-bold uppercase tracking-[0.24em] text-blue-300" : "text-xs font-bold uppercase tracking-[0.24em] text-blue-600 dark:text-blue-400"}>
          {eyebrow}
        </p>
      )}
      <h2 className={inverse ? "mt-3 text-3xl font-black tracking-[-0.04em] text-white md:text-5xl" : "mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl dark:text-white"}>
        {title}
      </h2>
      {description && (
        <p className={inverse ? "mt-5 text-lg leading-8 text-slate-300" : "mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300"}>
          {description}
        </p>
      )}
    </div>
  )
}

function MetaCard({label, value}: {label: string; value?: string | string[]}) {
  if (!value || (Array.isArray(value) && !value.length)) return null
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">{label}</p>
      {Array.isArray(value) ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {value.map((item) => (
            <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold dark:bg-white/10">
              {item}
            </span>
          ))}
        </div>
      ) : (
        <p className="mt-3 font-semibold">{value}</p>
      )}
    </div>
  )
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{slug: string}>
}) {
  const {slug} = await params
  const project = await client.fetch<Project | null>(
    projectBySlugQuery,
    {slug},
    {cache: "no-store"},
  )
  if (!project) notFound()

  const sections = [
    project.problem || project.goal ? {id: "strategy", label: "Strategy"} : null,
    project.researchInsights?.length || project.personas?.length ? {id: "research", label: "Research"} : null,
    project.userFlows?.length || project.wireframes?.length ? {id: "process", label: "Process"} : null,
    project.finalUiSections?.length ? {id: "solution", label: "Solution"} : null,
    project.edgeCases?.length ? {id: "edge-cases", label: "Edge Cases"} : null,
    project.prototypeUrl || project.prototypeVideoUrl || project.figmaUrl ? {id: "prototype", label: "Prototype"} : null,
    project.outcome || project.learnings ? {id: "impact", label: "Impact"} : null,
  ].filter(Boolean) as {id: string; label: string}[]

  return (
    <main className="bg-[#F8FAFC] text-slate-950 dark:bg-[#050914] dark:text-white">
      <section className="relative isolate overflow-hidden bg-[#050914] text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(45,91,255,0.28),transparent_30%),radial-gradient(circle_at_82%_14%,rgba(34,197,94,0.12),transparent_25%),linear-gradient(180deg,#050914_0%,#070B16_100%)]" />
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-8 lg:pb-28 lg:pt-36">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Reveal>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-blue-300">
                  {project.category || "Product Design"}
                </span>
                {project.projectType && (
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-300">
                    {project.projectType}
                  </span>
                )}
              </div>
              <h1 className="mt-8 text-4xl font-black leading-[1.02] tracking-[-0.055em] sm:text-5xl md:text-6xl xl:text-7xl">
                {project.title}
              </h1>
              {project.summary && (
                <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
                  {project.summary}
                </p>
              )}
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                {(project.prototypeUrl || project.figmaUrl) && (
                  <a href={project.prototypeUrl || project.figmaUrl} target="_blank" rel="noreferrer" className="rounded-xl bg-[#2D5BFF] px-7 py-4 text-center text-sm font-bold shadow-xl shadow-blue-500/25">
                    View Prototype →
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-white/15 bg-white/[0.04] px-7 py-4 text-center text-sm font-bold">
                    View Live Project →
                  </a>
                )}
              </div>
            </Reveal>

            {project.heroImage && (
              <Reveal delay={120}>
                <div className="relative">
                  <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-blue-500/10 blur-3xl" />
                  <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/40">
                    <img src={urlFor(project.heroImage)} alt={`${project.title} hero`} className="w-full object-cover" />
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-10 dark:border-white/10 dark:bg-[#080D1A]">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <MetaCard label="Role" value={project.role} />
          <MetaCard label="Timeline" value={project.timeline} />
          <MetaCard label="Platform" value={project.platform} />
          <MetaCard label="Tools" value={project.tools} />
        </div>
      </section>

      <CaseStudyNav items={sections} />

      {(project.problem || project.goal || project.designChallenge) && (
        <section id="strategy" className="scroll-mt-24 px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeading eyebrow="Strategy" title="Framing the right problem" />
            </Reveal>
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {project.problem && <Reveal><article className="rounded-[2rem] border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.04]"><p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">Problem</p><p className="mt-5 text-lg leading-9">{project.problem}</p></article></Reveal>}
              {project.goal && <Reveal delay={100}><article className="rounded-[2rem] border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.04]"><p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">Goal</p><p className="mt-5 text-lg leading-9">{project.goal}</p></article></Reveal>}
            </div>
            {project.designChallenge && (
              <Reveal>
                <article className="mt-6 rounded-[2rem] border border-blue-200 bg-blue-50 p-8 dark:border-blue-400/20 dark:bg-blue-400/10">
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">Design Challenge</p>
                  <p className="mt-5 max-w-5xl text-2xl font-black leading-snug tracking-[-0.03em]">{project.designChallenge}</p>
                </article>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {(project.researchInsights?.length || project.personas?.length || project.journeyMaps?.length) && (
        <section id="research" className="scroll-mt-24 bg-white px-6 py-24 dark:bg-[#080D1A] lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal><SectionHeading eyebrow="Research" title="Insights that shaped the product" /></Reveal>
            {project.researchInsights?.length ? (
              <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {project.researchInsights.map((insight, index) => (
                  <Reveal key={index} delay={index * 80}>
                    <article className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-[#0B1120]">
                      <p className="text-xs font-bold text-blue-600">{String(index + 1).padStart(2, "0")}</p>
                      <h3 className="mt-3 text-xl font-black">{insight.title}</h3>
                      {insight.description && <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{insight.description}</p>}
                    </article>
                  </Reveal>
                ))}
              </div>
            ) : null}
            {project.personas?.length ? <div className="mt-14"><h3 className="mb-6 text-2xl font-black">Personas</h3><LightboxGallery items={mapGallery(project.personas)} /></div> : null}
            {project.journeyMaps?.length ? <div className="mt-14"><h3 className="mb-6 text-2xl font-black">Journey Maps</h3><LightboxGallery items={mapGallery(project.journeyMaps)} /></div> : null}
          </div>
        </section>
      )}

      {(project.userFlows?.length || project.wireframes?.length || project.designSystem?.length) && (
        <section id="process" className="scroll-mt-24 px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal><SectionHeading eyebrow="Process" title="From structure to system" /></Reveal>
            {project.userFlows?.length ? <div className="mt-14"><h3 className="mb-6 text-2xl font-black">User Flow</h3><LightboxGallery items={mapGallery(project.userFlows)} /></div> : null}
            {project.wireframes?.length ? <div className="mt-14"><h3 className="mb-6 text-2xl font-black">Wireframes</h3><LightboxGallery items={mapGallery(project.wireframes)} /></div> : null}
            {project.designSystem?.length ? <div className="mt-14"><h3 className="mb-6 text-2xl font-black">Design System</h3><LightboxGallery items={mapGallery(project.designSystem)} /></div> : null}
          </div>
        </section>
      )}

      {project.finalUiSections?.length ? (
        <section id="solution" className="scroll-mt-24 bg-white px-6 py-24 dark:bg-[#080D1A] lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal><SectionHeading eyebrow="Solution" title="The final product experience" description={project.solutionOverview} /></Reveal>
            <div className="mt-16 space-y-20">
              {project.finalUiSections.map((section, index) => {
                const screens = mapGallery(section.screens)
                return (
                  <Reveal key={index}>
                    <article>
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600">Flow {String(index + 1).padStart(2, "0")}</p>
                      <h3 className="mt-3 text-3xl font-black tracking-[-0.03em]">{section.title}</h3>
                      {section.description && <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">{section.description}</p>}
                      <div className="mt-8">
                        {section.displayMode === "flow" ? <PhoneRail items={screens} /> : <LightboxGallery items={screens} />}
                      </div>
                    </article>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>
      ) : null}

      {project.edgeCases?.length ? (
        <section id="edge-cases" className="scroll-mt-24 bg-[#050914] px-6 py-24 text-white lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal><SectionHeading eyebrow="Beyond the Happy Path" title="Critical recovery states" description={project.edgeCaseIntro} inverse /></Reveal>
            <div className="mt-14 space-y-10">
              {project.edgeCases.map((edge, index) => (
                <Reveal key={index}>
                  <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
                    <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-300">Edge Case {String(index + 1).padStart(2, "0")}</p>
                        <h3 className="mt-3 text-3xl font-black">{edge.title}</h3>
                        {edge.scenario && <div className="mt-6"><p className="font-bold text-blue-300">Scenario</p><p className="mt-2 leading-7 text-slate-300">{edge.scenario}</p></div>}
                        {edge.solution && <div className="mt-6"><p className="font-bold text-blue-300">Solution</p><p className="mt-2 leading-7 text-slate-300">{edge.solution}</p></div>}
                      </div>
                      <LightboxGallery items={mapGallery(edge.screens)} />
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {(project.prototypeUrl || project.prototypeVideoUrl || project.figmaUrl) && (
        <section id="prototype" className="scroll-mt-24 px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal><SectionHeading eyebrow="Prototype" title="Testing the complete journey" description={project.prototypeNotes} /></Reveal>
            <Reveal>
              <div className="mt-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl dark:border-white/10 dark:bg-white/[0.04]">
                {project.prototypeVideoUrl ? (
                  <video controls poster={project.prototypePoster ? urlFor(project.prototypePoster) : undefined} className="w-full rounded-[1.5rem]">
                    <source src={project.prototypeVideoUrl} />
                  </video>
                ) : project.prototypePoster ? (
                  <img src={urlFor(project.prototypePoster)} alt="Prototype preview" className="w-full rounded-[1.5rem]" />
                ) : null}
                {(project.prototypeUrl || project.figmaUrl) && (
                  <div className="flex justify-center p-6">
                    <a href={project.prototypeUrl || project.figmaUrl} target="_blank" rel="noreferrer" className="rounded-xl bg-[#2D5BFF] px-7 py-4 text-sm font-bold text-white">
                      Explore Interactive Prototype →
                    </a>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {(project.outcome || project.learnings || project.impactMetrics?.length) && (
        <section id="impact" className="scroll-mt-24 bg-white px-6 py-24 dark:bg-[#080D1A] lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal><SectionHeading eyebrow="Impact" title="Outcome, learning and next steps" /></Reveal>
            {project.impactMetrics?.length ? (
              <div className="mt-12 grid gap-5 md:grid-cols-3">
                {project.impactMetrics.map((metric, index) => (
                  <Reveal key={index} delay={index * 80}>
                    <article className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 dark:border-white/10 dark:bg-[#0B1120]">
                      <p className="text-3xl font-black text-blue-600">{metric.metric}</p>
                      <h3 className="mt-3 text-lg font-black">{metric.label}</h3>
                      {metric.description && <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{metric.description}</p>}
                    </article>
                  </Reveal>
                ))}
              </div>
            ) : null}
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {project.outcome && <Reveal><article className="rounded-[2rem] bg-slate-50 p-8 dark:bg-[#0B1120]"><p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">Outcome</p><p className="mt-5 text-lg leading-9">{project.outcome}</p></article></Reveal>}
              {project.learnings && <Reveal delay={100}><article className="rounded-[2rem] bg-slate-50 p-8 dark:bg-[#0B1120]"><p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">Key Learnings</p><p className="mt-5 text-lg leading-9">{project.learnings}</p></article></Reveal>}
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#050914] px-6 py-16 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-300">More Work</p>
            <h2 className="mt-3 text-3xl font-black">Explore more selected projects</h2>
          </div>
          <a href="/projects" className="rounded-xl bg-[#2D5BFF] px-7 py-4 text-center text-sm font-bold">Back to Projects →</a>
        </div>
      </section>
    </main>
  )
}
