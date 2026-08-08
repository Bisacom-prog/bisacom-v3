import {notFound} from "next/navigation"
import {createImageUrlBuilder} from "@sanity/image-url"
import {client} from "@/sanity/lib/client"
import {projectBySlugQuery} from "@/sanity/lib/queries"
import type {
  CaseStudyImage,
  Project,
  RichContentItem,
  SanityImage,
} from "@/components/case-study/types"
import CaseStudyNav from "@/components/case-study/CaseStudyNav"
import Reveal from "@/components/case-study/Reveal"
import LightboxGallery from "@/components/case-study/LightboxGallery"
import PhoneRail from "@/components/case-study/PhoneRail"

export const dynamic = "force-dynamic"

const builder = createImageUrlBuilder(client)
const urlFor = (source?: SanityImage) =>
  source ? builder.image(source).auto("format").fit("max").url() : ""

function mapGallery(items?: CaseStudyImage[]) {
  return (items || [])
    .filter((item) => item?.image?.asset)
    .map((item, index) => ({
      src: urlFor(item.image),
      alt: item.image?.alt || `Case study image ${index + 1}`,
      caption: item.image?.caption,
    }))
}

function isPortableTextBlock(
  item: RichContentItem,
): item is Extract<RichContentItem, {_type: "block"}> {
  return item._type === "block"
}

function blockText(item: RichContentItem) {
  if (!isPortableTextBlock(item)) return ""
  return (item.children || []).map((child) => child.text || "").join("")
}

function RichContent({
  value,
  dark = false,
}: {
  value?: RichContentItem[]
  dark?: boolean
}) {
  if (!value?.length) return null
  const textClass = dark
    ? "text-slate-300"
    : "text-slate-600 dark:text-slate-300"

  return (
    <div className="space-y-5">
      {value.map((item, index) => {
        if (item._type === "caseStudyImage") {
          const gallery = mapGallery([item])
          return gallery.length ? (
            <div key={item._key || `image-${index}`} className="py-4">
              <LightboxGallery items={gallery} />
            </div>
          ) : null
        }

        if (!isPortableTextBlock(item)) return null

        const text = blockText(item)
        if (!text) return null
        const key = item._key || `block-${index}`

        if (item.listItem) {
          return (
            <div key={key} className={`flex gap-3 text-lg leading-8 ${textClass}`}>
              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
              <p>{text}</p>
            </div>
          )
        }

        if (item.style === "h2") {
          return (
            <h3 key={key} className="pt-4 text-3xl font-black tracking-[-0.03em]">
              {text}
            </h3>
          )
        }

        if (item.style === "h3") {
          return (
            <h4 key={key} className="pt-3 text-2xl font-black tracking-[-0.02em]">
              {text}
            </h4>
          )
        }

        if (item.style === "blockquote") {
          return (
            <blockquote key={key} className="border-l-4 border-blue-600 pl-6 text-xl font-semibold leading-8">
              {text}
            </blockquote>
          )
        }

        return (
          <p key={key} className={`text-lg leading-8 ${textClass}`}>
            {text}
          </p>
        )
      })}
    </div>
  )
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
            <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold dark:bg-white/10">{item}</span>
          ))}
        </div>
      ) : (
        <p className="mt-3 font-semibold">{value}</p>
      )}
    </div>
  )
}

function PillList({items}: {items?: string[]}) {
  if (!items?.length) return null
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => (
        <span key={item} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold dark:border-white/10 dark:bg-white/[0.04]">
          {item}
        </span>
      ))}
    </div>
  )
}

const hasRichContent = (items?: RichContentItem[]) => Boolean(items?.length)

export default async function ProjectPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const project = await client.fetch<Project | null>(
    projectBySlugQuery,
    {slug},
    {cache: "no-store"},
  )

  if (!project) notFound()

  const sections = [
    project.problemStatement || hasRichContent(project.context) || project.howMightWe || project.constraints?.length
      ? {id: "problem", label: "Problem"}
      : null,
    project.researchMethods?.length || project.personas?.length || project.journeyMap?.length || hasRichContent(project.competitiveAnalysis) || project.researchInsights?.length
      ? {id: "research", label: "Research"}
      : null,
    project.productGoal || project.successCriteria?.length || project.productPrinciples?.length || project.designDecisions?.length
      ? {id: "strategy", label: "Strategy"}
      : null,
    hasRichContent(project.informationArchitecture) || hasRichContent(project.primaryUserFlow) || project.secondaryFlows?.length
      ? {id: "ia-flows", label: "IA & Flows"}
      : null,
    hasRichContent(project.wireframeSummary) || project.lowFidelityWireframes?.length || project.iterations?.length
      ? {id: "wireframes", label: "Wireframes"}
      : null,
    hasRichContent(project.visualDirection) || project.designSystem?.length || project.accessibility?.length
      ? {id: "visual-design", label: "Visual Design"}
      : null,
    hasRichContent(project.solutionIntro) || project.featureFlows?.length
      ? {id: "solution", label: "Final Solution"}
      : null,
    project.prototypeDescription || project.prototypeVideoUrl || project.prototypeUrl || project.figmaUrl
      ? {id: "prototype", label: "Prototype"}
      : null,
    project.edgeCases?.length ? {id: "edge-cases", label: "Edge Cases"} : null,
    hasRichContent(project.impactSummary) || project.outcomes?.length || project.metrics?.length
      ? {id: "impact", label: "Impact"}
      : null,
    project.learnings?.length || project.nextSteps?.length || hasRichContent(project.reflection)
      ? {id: "reflection", label: "Reflection"}
      : null,
    project.liveUrl || project.figmaUrl || project.githubUrl
      ? {id: "links", label: "Links"}
      : null,
  ].filter(Boolean) as {id: string; label: string}[]

  return (
    <main className="bg-[#F8FAFC] text-slate-950 dark:bg-[#050914] dark:text-white">
      <section className="relative isolate overflow-hidden bg-[#050914] text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(45,91,255,0.28),transparent_30%),radial-gradient(circle_at_82%_14%,rgba(34,197,94,0.12),transparent_25%),linear-gradient(180deg,#050914_0%,#070B16_100%)]" />
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-8 lg:pb-28 lg:pt-36">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Reveal>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-blue-300">Product Design</span>
                {project.projectType && (
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-300">{project.projectType}</span>
                )}
              </div>
              <h1 className="mt-8 text-4xl font-black leading-[1.02] tracking-[-0.055em] sm:text-5xl md:text-6xl xl:text-7xl">{project.title}</h1>
              {project.summary && <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">{project.summary}</p>}
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                {(project.prototypeUrl || project.figmaUrl) && (
                  <a href={project.prototypeUrl || project.figmaUrl} target="_blank" rel="noreferrer" className="rounded-xl bg-[#2D5BFF] px-7 py-4 text-center text-sm font-bold shadow-xl shadow-blue-500/25">View Prototype →</a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-white/15 bg-white/[0.04] px-7 py-4 text-center text-sm font-bold">View Live Project →</a>
                )}
              </div>
            </Reveal>

            {project.heroImage && (
              <Reveal delay={120}>
                <div className="relative">
                  <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-blue-500/10 blur-3xl" />
                  <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/40">
                    <img src={urlFor(project.heroImage)} alt={project.heroImage.alt || `${project.title} product journey`} className="w-full object-cover" />
                  </div>
                  {project.heroImage.caption && <p className="mt-4 text-sm leading-6 text-slate-400">{project.heroImage.caption}</p>}
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
        {(project.team || project.responsibilities?.length) && (
          <div className="mx-auto mt-4 grid max-w-7xl gap-4 px-6 sm:grid-cols-2 lg:px-8">
            <MetaCard label="Team" value={project.team} />
            <MetaCard label="Responsibilities" value={project.responsibilities} />
          </div>
        )}
      </section>

      <CaseStudyNav items={sections} />

      {(project.problemStatement || hasRichContent(project.context) || project.howMightWe || project.constraints?.length) && (
        <section id="problem" className="scroll-mt-24 px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal><SectionHeading eyebrow="Problem" title="Designing for a stressful moment" /></Reveal>
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {project.problemStatement && (
                <Reveal><article className="rounded-[2rem] border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.04]"><p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">Problem Statement</p><p className="mt-5 text-lg leading-9">{project.problemStatement}</p></article></Reveal>
              )}
              {project.howMightWe && (
                <Reveal delay={100}><article className="rounded-[2rem] border border-blue-200 bg-blue-50 p-8 dark:border-blue-400/20 dark:bg-blue-400/10"><p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">How Might We</p><p className="mt-5 text-2xl font-black leading-snug tracking-[-0.03em]">{project.howMightWe}</p></article></Reveal>
              )}
            </div>
            {hasRichContent(project.context) && <Reveal><div className="mt-10 max-w-4xl"><RichContent value={project.context} /></div></Reveal>}
            {project.constraints?.length ? <Reveal><div className="mt-12"><h3 className="mb-5 text-2xl font-black">Constraints</h3><PillList items={project.constraints} /></div></Reveal> : null}
          </div>
        </section>
      )}

      {(project.researchMethods?.length || project.personas?.length || project.journeyMap?.length || hasRichContent(project.competitiveAnalysis) || project.researchInsights?.length) && (
        <section id="research" className="scroll-mt-24 bg-white px-6 py-24 dark:bg-[#080D1A] lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal><SectionHeading eyebrow="Research" title="Understanding the roadside experience" /></Reveal>
            {project.researchMethods?.length ? <div className="mt-10"><PillList items={project.researchMethods} /></div> : null}
            {project.researchInsights?.length ? (
              <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {project.researchInsights.map((insight, index) => (
                  <Reveal key={`${insight.title}-${index}`} delay={index * 70}>
                    <article className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-[#0B1120]">
                      <p className="text-xs font-bold text-blue-600">{String(index + 1).padStart(2, "0")}</p>
                      <h3 className="mt-3 text-xl font-black">{insight.title}</h3>
                      {insight.evidence && <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">{insight.evidence}</p>}
                      {insight.decision && <div className="mt-5 border-t border-slate-200 pt-5 dark:border-white/10"><p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">Design response</p><p className="mt-2 leading-7">{insight.decision}</p></div>}
                    </article>
                  </Reveal>
                ))}
              </div>
            ) : null}
            {project.personas?.length ? <div className="mt-14"><h3 className="mb-6 text-2xl font-black">Personas</h3><LightboxGallery items={mapGallery(project.personas)} /></div> : null}
            {project.journeyMap?.length ? <div className="mt-14"><h3 className="mb-6 text-2xl font-black">Journey Map</h3><LightboxGallery items={mapGallery(project.journeyMap)} /></div> : null}
            {hasRichContent(project.competitiveAnalysis) && <div className="mt-14"><h3 className="mb-6 text-2xl font-black">Competitive Analysis</h3><div className="max-w-5xl"><RichContent value={project.competitiveAnalysis} /></div></div>}
          </div>
        </section>
      )}

      {(project.productGoal || project.successCriteria?.length || project.productPrinciples?.length || project.designDecisions?.length) && (
        <section id="strategy" className="scroll-mt-24 px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal><SectionHeading eyebrow="Strategy" title="Turning urgency into product principles" /></Reveal>
            {project.productGoal && <Reveal><article className="mt-12 rounded-[2rem] border border-blue-200 bg-blue-50 p-8 dark:border-blue-400/20 dark:bg-blue-400/10"><p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">Product Goal</p><p className="mt-5 max-w-5xl whitespace-pre-line text-lg leading-9">{project.productGoal}</p></article></Reveal>}
            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              {project.successCriteria?.length ? <Reveal><article className="rounded-[2rem] border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.04]"><h3 className="text-2xl font-black">Success Criteria</h3><div className="mt-6"><PillList items={project.successCriteria} /></div></article></Reveal> : null}
              {project.productPrinciples?.length ? <Reveal delay={80}><article className="rounded-[2rem] border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.04]"><h3 className="text-2xl font-black">Product Principles</h3><div className="mt-6"><PillList items={project.productPrinciples} /></div></article></Reveal> : null}
            </div>
            {project.designDecisions?.length ? (
              <div className="mt-14"><h3 className="mb-6 text-2xl font-black">Decision Log</h3><div className="grid gap-5 lg:grid-cols-2">
                {project.designDecisions.map((item, index) => <Reveal key={`${item.decision}-${index}`} delay={(index % 2) * 70}><article className="h-full rounded-[2rem] border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-white/[0.04]"><p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Decision {String(index + 1).padStart(2, "0")}</p><h4 className="mt-3 text-xl font-black">{item.decision}</h4><p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">{item.reason}</p>{item.impact && <p className="mt-5 border-t border-slate-200 pt-5 text-sm font-semibold leading-6 dark:border-white/10">Intended impact: {item.impact}</p>}</article></Reveal>)}
              </div></div>
            ) : null}
          </div>
        </section>
      )}

      {(hasRichContent(project.informationArchitecture) || hasRichContent(project.primaryUserFlow) || project.secondaryFlows?.length) && (
        <section id="ia-flows" className="scroll-mt-24 bg-white px-6 py-24 dark:bg-[#080D1A] lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal><SectionHeading eyebrow="IA & Flows" title="Dispatch first. Diagnose while waiting." /></Reveal>
            {hasRichContent(project.informationArchitecture) && <div className="mt-14"><h3 className="mb-6 text-2xl font-black">Information Architecture</h3><RichContent value={project.informationArchitecture} /></div>}
            {hasRichContent(project.primaryUserFlow) && <div className="mt-14"><h3 className="mb-6 text-2xl font-black">Primary User Flow</h3><RichContent value={project.primaryUserFlow} /></div>}
            {project.secondaryFlows?.length ? <div className="mt-14 space-y-16"><h3 className="text-2xl font-black">Secondary Flows</h3>{project.secondaryFlows.map((flow, index) => {const screens = mapGallery(flow.screens); return <Reveal key={`${flow.title}-${index}`}><article><p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600">Secondary Flow {String(index + 1).padStart(2, "0")}</p><h4 className="mt-3 text-3xl font-black tracking-[-0.03em]">{flow.title}</h4>{flow.description && <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">{flow.description}</p>}{screens.length ? <div className="mt-8"><LightboxGallery items={screens} /></div> : null}</article></Reveal>})}</div> : null}
          </div>
        </section>
      )}

      {(hasRichContent(project.wireframeSummary) || project.lowFidelityWireframes?.length || project.iterations?.length) && (
        <section id="wireframes" className="scroll-mt-24 px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal><SectionHeading eyebrow="Wireframes" title="Reducing friction before adding polish" /></Reveal>
            {hasRichContent(project.wireframeSummary) && <div className="mt-12 max-w-4xl"><RichContent value={project.wireframeSummary} /></div>}
            {project.lowFidelityWireframes?.length ? <div className="mt-14"><h3 className="mb-6 text-2xl font-black">Low-Fidelity Wireframes</h3><LightboxGallery items={mapGallery(project.lowFidelityWireframes)} /></div> : null}
            {project.iterations?.length ? <div className="mt-16 space-y-16"><h3 className="text-2xl font-black">Key Iterations</h3>{project.iterations.map((iteration, index) => <Reveal key={`${iteration.title}-${index}`}><article className="rounded-[2rem] border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.04]"><p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600">{iteration.eyebrow || `Iteration ${String(index + 1).padStart(2, "0")}`}</p><h4 className="mt-3 text-3xl font-black tracking-[-0.03em]">{iteration.title}</h4><div className="mt-6"><RichContent value={iteration.body} /></div></article></Reveal>)}</div> : null}
          </div>
        </section>
      )}

      {(hasRichContent(project.visualDirection) || project.designSystem?.length || project.accessibility?.length) && (
        <section id="visual-design" className="scroll-mt-24 bg-white px-6 py-24 dark:bg-[#080D1A] lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal><SectionHeading eyebrow="Visual Design" title="A calm system for a stressful situation" /></Reveal>
            {hasRichContent(project.visualDirection) && <div className="mt-12 max-w-5xl"><RichContent value={project.visualDirection} /></div>}
            {project.designSystem?.length ? <div className="mt-14"><h3 className="mb-6 text-2xl font-black">Design System</h3><LightboxGallery items={mapGallery(project.designSystem)} /></div> : null}
            {project.accessibility?.length ? <div className="mt-14"><h3 className="mb-6 text-2xl font-black">Accessibility Decisions</h3><PillList items={project.accessibility} /></div> : null}
          </div>
        </section>
      )}

      {(hasRichContent(project.solutionIntro) || project.featureFlows?.length) && (
        <section id="solution" className="scroll-mt-24 px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal><SectionHeading eyebrow="Final Solution" title="From roadside request to resolution" /></Reveal>
            {hasRichContent(project.solutionIntro) && <div className="mt-12 max-w-4xl"><RichContent value={project.solutionIntro} /></div>}
            {project.featureFlows?.length ? <div className="mt-16 space-y-20">{project.featureFlows.map((flow, index) => {const screens = mapGallery(flow.screens); return <Reveal key={`${flow.title}-${index}`}><article><p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600">Experience {String(index + 1).padStart(2, "0")}</p><h3 className="mt-3 text-3xl font-black tracking-[-0.03em]">{flow.title}</h3>{flow.description && <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">{flow.description}</p>}{screens.length ? <div className="mt-8"><PhoneRail items={screens} /></div> : null}</article></Reveal>})}</div> : null}
          </div>
        </section>
      )}

      {(project.prototypeDescription || project.prototypeVideoUrl || project.prototypeUrl || project.figmaUrl) && (
        <section id="prototype" className="scroll-mt-24 bg-white px-6 py-24 dark:bg-[#080D1A] lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal><SectionHeading eyebrow="Prototype" title="Testing the complete journey" description={project.prototypeDescription} /></Reveal>
            <Reveal><div className="mt-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.04]">{project.prototypeVideoUrl ? <video controls className="w-full rounded-[1.5rem]"><source src={project.prototypeVideoUrl} /></video> : null}{(project.prototypeUrl || project.figmaUrl) && <div className="flex justify-center p-6"><a href={project.prototypeUrl || project.figmaUrl} target="_blank" rel="noreferrer" className="rounded-xl bg-[#2D5BFF] px-7 py-4 text-sm font-bold text-white">Explore Interactive Prototype →</a></div>}</div></Reveal>
          </div>
        </section>
      )}

      {project.edgeCases?.length ? (
        <section id="edge-cases" className="scroll-mt-24 bg-[#050914] px-6 py-24 text-white lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal><SectionHeading eyebrow="Beyond the Happy Path" title="Critical recovery states" inverse /></Reveal>
            <div className="mt-14 space-y-10">{project.edgeCases.map((edge, index) => <Reveal key={`${edge.title}-${index}`}><article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8"><div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-300">Edge Case {String(index + 1).padStart(2, "0")}</p><h3 className="mt-3 text-3xl font-black">{edge.title}</h3>{edge.scenario && <div className="mt-6"><p className="font-bold text-blue-300">Scenario</p><p className="mt-2 leading-7 text-slate-300">{edge.scenario}</p></div>}{edge.response && <div className="mt-6"><p className="font-bold text-blue-300">Product Response</p><p className="mt-2 leading-7 text-slate-300">{edge.response}</p></div>}{edge.recoveryAction && <div className="mt-6"><p className="font-bold text-blue-300">Recovery Action</p><p className="mt-2 leading-7 text-slate-300">{edge.recoveryAction}</p></div>}</div>{edge.screens?.length ? <LightboxGallery items={mapGallery(edge.screens)} /> : null}</div></article></Reveal>)}</div>
          </div>
        </section>
      ) : null}

      {(hasRichContent(project.impactSummary) || project.outcomes?.length || project.metrics?.length) && (
        <section id="impact" className="scroll-mt-24 bg-white px-6 py-24 dark:bg-[#080D1A] lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal><SectionHeading eyebrow="Impact" title="What the redesign achieved" /></Reveal>
            {hasRichContent(project.impactSummary) && <div className="mt-12 max-w-4xl"><RichContent value={project.impactSummary} /></div>}
            {project.metrics?.length ? <div className="mt-12 grid gap-5 md:grid-cols-3">{project.metrics.map((metric, index) => <Reveal key={`${metric.label || metric.value}-${index}`} delay={index * 70}><article className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 dark:border-white/10 dark:bg-[#0B1120]">{metric.value && <p className="text-3xl font-black text-blue-600">{metric.value}</p>}{metric.label && <h3 className="mt-3 text-lg font-black">{metric.label}</h3>}{metric.note && <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{metric.note}</p>}</article></Reveal>)}</div> : null}
            {project.outcomes?.length ? <div className="mt-12"><h3 className="mb-6 text-2xl font-black">Design Outcomes</h3><div className="grid gap-4 md:grid-cols-2">{project.outcomes.map((outcome, index) => <Reveal key={`${outcome}-${index}`}><div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-lg font-semibold leading-8 dark:border-white/10 dark:bg-[#0B1120]">{outcome}</div></Reveal>)}</div></div> : null}
          </div>
        </section>
      )}

      {(project.learnings?.length || project.nextSteps?.length || hasRichContent(project.reflection)) && (
        <section id="reflection" className="scroll-mt-24 px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal><SectionHeading eyebrow="Reflection" title="What I learned and what comes next" /></Reveal>
            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              {project.learnings?.length ? <Reveal><article className="rounded-[2rem] border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.04]"><h3 className="text-2xl font-black">What I Learned</h3><div className="mt-6 space-y-4">{project.learnings.map((item) => <div key={item} className="flex gap-3"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600" /><p className="leading-7">{item}</p></div>)}</div></article></Reveal> : null}
              {project.nextSteps?.length ? <Reveal delay={80}><article className="rounded-[2rem] border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.04]"><h3 className="text-2xl font-black">Next Steps</h3><div className="mt-6 space-y-4">{project.nextSteps.map((item) => <div key={item} className="flex gap-3"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600" /><p className="leading-7">{item}</p></div>)}</div></article></Reveal> : null}
            </div>
            {hasRichContent(project.reflection) && <div className="mt-12 max-w-4xl"><RichContent value={project.reflection} /></div>}
          </div>
        </section>
      )}

      {(project.liveUrl || project.figmaUrl || project.githubUrl) && (
        <section id="links" className="scroll-mt-24 bg-white px-6 py-20 dark:bg-[#080D1A] lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal><SectionHeading eyebrow="Links" title="Explore the project" /></Reveal>
            <div className="mt-10 flex flex-wrap gap-4">
              {project.figmaUrl && <a href={project.figmaUrl} target="_blank" rel="noreferrer" className="rounded-xl bg-[#2D5BFF] px-6 py-4 text-sm font-bold text-white">Open Figma →</a>}
              {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold dark:border-white/10 dark:bg-white/[0.04]">View Live Project →</a>}
              {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold dark:border-white/10 dark:bg-white/[0.04]">View GitHub →</a>}
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#050914] px-6 py-16 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 md:flex-row md:items-center md:justify-between">
          <div><p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-300">More Work</p><h2 className="mt-3 text-3xl font-black">Explore more selected projects</h2></div>
          <a href="/projects" className="rounded-xl bg-[#2D5BFF] px-7 py-4 text-center text-sm font-bold">Back to Projects →</a>
        </div>
      </section>
    </main>
  )
}
