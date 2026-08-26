import {notFound} from "next/navigation"
import type {Metadata} from "next"
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
import {siteConfig} from "@/lib/site"

export const dynamic = "force-dynamic"

export async function generateMetadata({params}: {params: Promise<{slug:string}>}): Promise<Metadata> {
  const {slug} = await params
  const project = await client.fetch<Project | null>(projectBySlugQuery, {slug})
  if (!project) return {title: "Project not found", robots: {index: false, follow: false}}

  const title = project.seoTitle || `${project.title} UX/UI Case Study`
  const description = project.seoDescription || project.summary
  const canonical = `${siteConfig.url}/projects/${slug}`
  const image = project.heroImage?.asset?.url

  return {
    title,
    description,
    keywords: project.seoKeywords,
    authors: [{name: siteConfig.personName, url: siteConfig.url}],
    alternates: {canonical},
    robots: project.seoNoIndex ? {index: false, follow: false} : {index: true, follow: true},
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "article",
      publishedTime: undefined,
      modifiedTime: project.updatedAt,
      images: image ? [{url: image, alt: project.heroImage?.alt || `${project.title} UX/UI case study`}]:[],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  }
}

const builder = createImageUrlBuilder(client)
const urlFor = (source?: SanityImage) =>
  source ? builder.image(source).auto("format").fit("max").url() : ""

function mapGallery(items?: CaseStudyImage[]) {
  return (items || [])
    .filter((item) => item?.image?.asset)
    .map((item, index) => ({
      src: urlFor(item.image),
      alt: item.alt || item.image?.alt || `Case study image ${index + 1}`,
      caption: item.caption || item.image?.caption,
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

function InformationArchitecture({
  value,
}: {
  value?: RichContentItem[]
}) {
  if (!value?.length) return null

  return (
    <div className="overflow-x-auto rounded-[2rem] border border-slate-200 bg-slate-50 p-6 md:p-8 dark:border-white/10 dark:bg-[#0B1120]">
      <div className="min-w-[720px] font-mono text-sm leading-8 text-slate-700 dark:text-slate-300">
        {value.map((item, index) => {
          if (item._type === "caseStudyImage") {
            const gallery = mapGallery([item])

            return gallery.length ? (
              <div
                key={item._key || `ia-image-${index}`}
                className="my-6 font-sans"
              >
                <LightboxGallery items={gallery} />
              </div>
            ) : null
          }

          if (!isPortableTextBlock(item)) return null

          const text = blockText(item)

          if (!text) {
            return (
              <div
                key={item._key || `ia-space-${index}`}
                className="h-4"
              />
            )
          }

          return (
            <div
              key={item._key || `ia-${index}`}
              className="whitespace-pre-wrap"
            >
              {text}
            </div>
          )
        })}
      </div>
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
          {value.map((item, index) => (
            <span key={`${item}-${index}`} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold dark:bg-white/10">{item}</span>
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
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold dark:border-white/10 dark:bg-white/[0.04]">
          {item}
        </span>
      ))}
    </div>
  )
}

const hasRichContent = (items?: RichContentItem[]) => Boolean(items?.length)

export default async function ProjectPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const project = await client.fetch<(Project & Record<string, any>) | null>(
    projectBySlugQuery,
    {slug},
    {cache: "no-store"},
  )

  if (!project) notFound()

  const canonicalUrl = `${siteConfig.url}/projects/${slug}`
  const isClientProject = project.projectType === "client" || project.projectType === "freelance"
  const isConceptProject = project.projectType === "concept"
  const projectStructuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${canonicalUrl}#case-study`,
    name: project.seoTitle || project.title,
    headline: project.seoTitle || project.title,
    description: project.seoDescription || project.summary,
    url: canonicalUrl,
    inLanguage: "en-GB",
    image: project.heroImage?.asset?.url,
    dateModified: project.updatedAt,
    author: {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: siteConfig.personName,
      url: siteConfig.url,
    },
    about: project.seoKeywords?.length ? project.seoKeywords : ["Product Design", "UX Design", "UI Design"],
  }

  const sections = [
    project.problemStatement || project.problem || hasRichContent(project.context) || project.howMightWe || project.designChallenge || project.constraints?.length
      ? {id: "problem", label: "Problem"}
      : null,
    project.researchMethods?.length || project.personas?.length || (project.journeyMap?.length || project.journeyMaps?.length) || project.journeyMaps?.length || hasRichContent(project.competitiveAnalysis) || project.researchInsights?.length
      ? {id: "research", label: "Research"}
      : null,
    project.productGoal || project.goal || project.successCriteria?.length || project.productPrinciples?.length || project.designDecisions?.length || project.strategyOverview?.length
      ? {id: "strategy", label: "Strategy"}
      : null,
    hasRichContent(project.informationArchitecture) || hasRichContent(project.primaryUserFlow) || project.secondaryFlows?.length || project.userFlows?.length
      ? {id: "ia-flows", label: "IA & Flows"}
      : null,
    hasRichContent(project.wireframeSummary) || project.lowFidelityWireframes?.length || project.wireframes?.length || project.iterations?.length
      ? {id: "wireframes", label: "Wireframes"}
      : null,
    hasRichContent(project.visualDirection) || project.designSystem?.length || project.accessibility?.length
      ? {id: "visual-design", label: "Visual Design"}
      : null,
    hasRichContent(project.solutionIntro) || project.solutionOverview || project.featureFlows?.length || project.finalUiSections?.length
      ? {id: "solution", label: "Final UI"}
      : null,
    project.prototypeDescription || project.prototypeVideoUrl || project.prototypeVideos?.length || project.prototypeUrl || project.figmaUrl
      ? {id: "prototype", label: "Prototype"}
      : null,
    project.edgeCases?.length ? {id: "edge-cases", label: "Edge Cases"} : null,
    project.validationSummary || project.validationPlan?.length
      ? {id: "validation", label: "Validation"}
      : null,
    isClientProject && (project.implementationSummary || project.implementationRole || project.architectureSteps?.length || project.cmsApproach || project.implementationHighlights?.length || project.responsiveImplementation)
      ? {id: "implementation", label: "Implementation"}
      : null,
    (isClientProject
      ? project.outcome || project.deliveredOutcomes?.length || project.expectedImpacts?.length || project.futureMetrics?.length || project.outcomeImages?.length
      : hasRichContent(project.impactSummary) || project.outcomes?.length || project.metrics?.length || project.outcomeImages?.length)
      ? {id: "impact", label: "Impact"}
      : null,
    (isClientProject
      ? project.reflectionSummary || project.learningCards?.length || project.tradeOffs?.length || project.validationNeeds?.length || project.whatIDoDifferently || project.nextSteps?.length || project.finalReflection
      : (Array.isArray(project.learnings) && project.learnings.length) || project.nextSteps?.length || hasRichContent(project.reflection))
      ? {id: "reflection", label: "Reflection"}
      : null,
    project.liveUrl || project.figmaUrl || project.githubUrl || project.repositoryUrl
      ? {id: "links", label: "Links"}
      : null,
  ].filter(Boolean) as {id: string; label: string}[]

  return (
    <main className="bg-[#F8FAFC] text-slate-950 dark:bg-[#050914] dark:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(projectStructuredData)}}
      />
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

      {(project.problemStatement || project.problem || hasRichContent(project.context) || project.howMightWe || project.designChallenge || project.constraints?.length) && (
        <section id="problem" className="scroll-mt-24 px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal><SectionHeading eyebrow="01 — Discovery & Requirements" title="Understanding the problem before designing the solution" /></Reveal>
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {(project.problemStatement || project.problem) && (
                <Reveal><article className="rounded-[2rem] border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.04]"><p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">Problem Statement</p><p className="mt-5 text-lg leading-9">{project.problemStatement || project.problem}</p></article></Reveal>
              )}
              {(project.howMightWe || project.designChallenge || project.goal) && (
                <Reveal delay={100}><article className="rounded-[2rem] border border-blue-200 bg-blue-50 p-8 dark:border-blue-400/20 dark:bg-blue-400/10"><p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">How Might We</p><p className="mt-5 text-2xl font-black leading-snug tracking-[-0.03em]">{project.howMightWe || project.designChallenge || project.goal}</p></article></Reveal>
              )}
            </div>
            {hasRichContent(project.context) && <Reveal><div className="mt-10 max-w-4xl"><RichContent value={project.context} /></div></Reveal>}
            {project.constraints?.length ? <Reveal><div className="mt-12"><h3 className="mb-5 text-2xl font-black">Constraints</h3><PillList items={project.constraints} /></div></Reveal> : null}
          </div>
        </section>
      )}

      {(project.researchMethods?.length || project.personas?.length || (project.journeyMap?.length || project.journeyMaps?.length) || hasRichContent(project.competitiveAnalysis) || project.researchInsights?.length) && (
        <section id="research" className="scroll-mt-24 bg-white px-6 py-24 dark:bg-[#080D1A] lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal><SectionHeading eyebrow="02 — Research & UX Strategy" title="Understanding the existing experience" /></Reveal>
            {project.researchMethods?.length ? <div className="mt-10"><PillList items={project.researchMethods} /></div> : null}
            {project.researchInsights?.length ? (
              <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {project.researchInsights.map((insight, index) => (
                  <Reveal key={`${insight.title}-${index}`} delay={index * 70}>
                    <article className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-[#0B1120]">
                      <p className="text-xs font-bold text-blue-600">{String(index + 1).padStart(2, "0")}</p>
                      <h3 className="mt-3 text-xl font-black">{insight.title}</h3>
                      {(insight.evidence || insight.description) && <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">{insight.evidence || insight.description}</p>}
                      {insight.decision && <div className="mt-5 border-t border-slate-200 pt-5 dark:border-white/10"><p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">Design response</p><p className="mt-2 leading-7">{insight.decision}</p></div>}
                    </article>
                  </Reveal>
                ))}
              </div>
            ) : null}
            {project.personas?.length ? <div className="mt-14"><h3 className="mb-6 text-2xl font-black">Personas</h3><LightboxGallery items={mapGallery(project.personas)} /></div> : null}
            {(project.journeyMap?.length || project.journeyMaps?.length) ? <div className="mt-14"><h3 className="mb-6 text-2xl font-black">Journey Map</h3><LightboxGallery items={mapGallery(project.journeyMap?.length ? project.journeyMap : project.journeyMaps)} /></div> : null}
            {hasRichContent(project.competitiveAnalysis) && <div className="mt-14"><h3 className="mb-6 text-2xl font-black">Competitive Analysis</h3><div className="max-w-5xl"><RichContent value={project.competitiveAnalysis} /></div></div>}
          </div>
        </section>
      )}

      {(project.productGoal || project.goal || project.successCriteria?.length || project.productPrinciples?.length || project.designDecisions?.length || project.strategyOverview?.length) && (
        <section id="strategy" className="scroll-mt-24 px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal><SectionHeading eyebrow="UX Strategy" title="Turning insight into product direction" /></Reveal>
            {(project.productGoal || project.goal) && <Reveal><article className="mt-12 rounded-[2rem] border border-blue-200 bg-blue-50 p-8 dark:border-blue-400/20 dark:bg-blue-400/10"><p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">Product Goal</p><p className="mt-5 max-w-5xl whitespace-pre-line text-lg leading-9">{project.productGoal || project.goal}</p></article></Reveal>}
            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              {project.successCriteria?.length ? <Reveal><article className="rounded-[2rem] border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.04]"><h3 className="text-2xl font-black">Success Criteria</h3><div className="mt-6"><PillList items={project.successCriteria} /></div></article></Reveal> : null}
              {project.productPrinciples?.length ? <Reveal delay={80}><article className="rounded-[2rem] border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.04]"><h3 className="text-2xl font-black">Product Principles</h3><div className="mt-6"><PillList items={project.productPrinciples} /></div></article></Reveal> : null}
            </div>
            {project.designDecisions?.length ? (
              <div className="mt-14"><h3 className="mb-6 text-2xl font-black">Decision Log</h3><div className="grid gap-5 lg:grid-cols-2">
                {project.designDecisions.map((item, index) => <Reveal key={`${item.decision}-${index}`} delay={(index % 2) * 70}><article className="h-full rounded-[2rem] border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-white/[0.04]"><p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Decision {String(index + 1).padStart(2, "0")}</p><h4 className="mt-3 text-xl font-black">{item.decision}</h4><p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">{item.reason}</p>{item.impact && <p className="mt-5 border-t border-slate-200 pt-5 text-sm font-semibold leading-6 dark:border-white/10">Intended impact: {item.impact}</p>}</article></Reveal>)}
              </div></div>
            ) : null}
            {project.strategyOverview?.length ? <div className="mt-14"><h3 className="mb-6 text-2xl font-black">Product Strategy & MVP</h3><LightboxGallery items={mapGallery(project.strategyOverview)} /></div> : null}
          </div>
        </section>
      )}

      {(hasRichContent(project.informationArchitecture) || hasRichContent(project.primaryUserFlow) || project.secondaryFlows?.length || project.userFlows?.length) && (
        <section id="ia-flows" className="scroll-mt-24 bg-white px-6 py-24 dark:bg-[#080D1A] lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal><SectionHeading eyebrow="03 — Information Architecture & User Flows" title="Structuring the experience around customer intent" /></Reveal>
            {hasRichContent(project.informationArchitecture) && (
              <div className="mt-14">
                <h3 className="mb-6 text-2xl font-black">Information Architecture</h3>
                <InformationArchitecture value={project.informationArchitecture} />
              </div>
            )}
            {project.userFlows?.length ? <div className="mt-14"><h3 className="mb-6 text-2xl font-black">User Flows</h3><LightboxGallery items={mapGallery(project.userFlows)} /></div> : null}
            {hasRichContent(project.primaryUserFlow) && <div className="mt-14"><h3 className="mb-6 text-2xl font-black">Primary User Flow</h3><RichContent value={project.primaryUserFlow} /></div>}
            {project.secondaryFlows?.length ? <div className="mt-14 space-y-16"><h3 className="text-2xl font-black">Secondary Flows</h3>{project.secondaryFlows.map((flow, index) => {const screens = mapGallery(flow.screens); return <Reveal key={`${flow.title}-${index}`}><article><p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600">Secondary Flow {String(index + 1).padStart(2, "0")}</p><h4 className="mt-3 text-3xl font-black tracking-[-0.03em]">{flow.title}</h4>{flow.description && <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">{flow.description}</p>}{screens.length ? <div className="mt-8"><LightboxGallery items={screens} /></div> : null}</article></Reveal>})}</div> : null}
          </div>
        </section>
      )}

      {(hasRichContent(project.wireframeSummary) || project.lowFidelityWireframes?.length || project.wireframes?.length || project.iterations?.length) && (
        <section id="wireframes" className="scroll-mt-24 px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal><SectionHeading eyebrow="04 — Wireframes" title="Translating the journey into screens" /></Reveal>
            {hasRichContent(project.wireframeSummary) && <div className="mt-12 max-w-4xl"><RichContent value={project.wireframeSummary} /></div>}
            {(project.lowFidelityWireframes?.length || project.wireframes?.length) ? <div className="mt-14"><h3 className="mb-6 text-2xl font-black">Wireframes</h3><LightboxGallery items={mapGallery(project.lowFidelityWireframes?.length ? project.lowFidelityWireframes : project.wireframes)} /></div> : null}
            {project.iterations?.length ? (
              <div className="mt-16 space-y-16">
                <h3 className="text-2xl font-black">Key Iterations</h3>
                {project.iterations.map((iteration, index) => {
                  const screens = mapGallery(iteration.screens)
                  return (
                    <Reveal key={`${iteration.title}-${index}`}>
                      <article className="rounded-[2rem] border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.04]">
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600">
                          {iteration.eyebrow || `Iteration ${String(index + 1).padStart(2, "0")}`}
                        </p>
                        <h4 className="mt-3 text-3xl font-black tracking-[-0.03em]">
                          {iteration.title}
                        </h4>
                        <div className="mt-6">
                          <RichContent value={iteration.body} />
                        </div>
                        {screens.length ? (
                          <div className="mt-8">
                            <LightboxGallery items={screens} />
                          </div>
                        ) : null}
                      </article>
                    </Reveal>
                  )
                })}
              </div>
            ) : null}
          </div>
        </section>
      )}

      {(hasRichContent(project.visualDirection) || project.designSystem?.length || project.accessibility?.length) && (
        <section id="visual-design" className="scroll-mt-24 bg-white px-6 py-24 dark:bg-[#080D1A] lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal><SectionHeading eyebrow="05 — Design System" title="Building a consistent visual language" /></Reveal>
            {hasRichContent(project.visualDirection) && <div className="mt-12 max-w-5xl"><RichContent value={project.visualDirection} /></div>}
            {project.designSystem?.length ? <div className="mt-14"><h3 className="mb-6 text-2xl font-black">Design System</h3><LightboxGallery items={mapGallery(project.designSystem)} /></div> : null}
            {project.accessibility?.length ? <div className="mt-14"><h3 className="mb-6 text-2xl font-black">Accessibility Decisions</h3><PillList items={project.accessibility} /></div> : null}
          </div>
        </section>
      )}

      {(hasRichContent(project.solutionIntro) || project.solutionOverview || project.featureFlows?.length || project.finalUiSections?.length) && (
        <section id="solution" className="scroll-mt-24 px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal><SectionHeading eyebrow="06–07 — Final UI" title="The final responsive product experience" description={project.solutionOverview} /></Reveal>
            {hasRichContent(project.solutionIntro) && <div className="mt-12 max-w-4xl"><RichContent value={project.solutionIntro} /></div>}
            {project.finalUiSections?.length ? <div className="mt-16 space-y-20">{project.finalUiSections.map((flow, index) => {const screens = mapGallery(flow.screens); return <Reveal key={`${flow.title}-${index}`}><article><p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600">Experience {String(index + 1).padStart(2, "0")}</p><h3 className="mt-3 text-3xl font-black tracking-[-0.03em]">{flow.title}</h3>{flow.description && <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">{flow.description}</p>}{screens.length ? <div className="mt-8">{flow.displayMode === "flow" ? <PhoneRail items={screens} /> : <LightboxGallery items={screens} />}</div> : null}</article></Reveal>})}</div> : project.featureFlows?.length ? <div className="mt-16 space-y-20">{project.featureFlows.map((flow, index) => {const screens = mapGallery(flow.screens); return <Reveal key={`${flow.title}-${index}`}><article><p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600">Experience {String(index + 1).padStart(2, "0")}</p><h3 className="mt-3 text-3xl font-black tracking-[-0.03em]">{flow.title}</h3>{flow.description && <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">{flow.description}</p>}{screens.length ? <div className="mt-8"><PhoneRail items={screens} /></div> : null}</article></Reveal>})}</div> : null}
          </div>
        </section>
      )}

      {(project.prototypeDescription || project.prototypeVideoUrl || project.prototypeVideos?.length || project.prototypeUrl || project.figmaUrl) && (
        <section id="prototype" className="scroll-mt-24 bg-white px-6 py-24 dark:bg-[#080D1A] lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeading
                eyebrow="Prototype"
                title="Testing the complete journey"
                description={project.prototypeDescription}
              />
            </Reveal>

            <Reveal>
              <div className="mt-10 rounded-[2rem] border border-slate-200 bg-slate-50 p-5 md:p-6 dark:border-white/10 dark:bg-white/[0.04]">
                {(() => {
                  const prototypeVideos =
                    Array.isArray(project.prototypeVideos) && project.prototypeVideos.length
                      ? project.prototypeVideos
                      : project.prototypeVideoUrl
                        ? [
                            {
                              title: isClientProject ? "Desktop Ordering Flow" : "Core Roadside Assistance Flow",
                              description: isClientProject
                                ? "A walkthrough of the primary Ma Adjo’s Kitchen desktop ordering journey from menu discovery through checkout and order completion."
                                : "A walkthrough of the primary roadside assistance journey from requesting help through payment and completion.",
                              url: project.prototypeVideoUrl,
                            },
                          ]
                        : []

                  if (!prototypeVideos.length) return null

                  return (
                    <div
                      className={
                        prototypeVideos.length > 1
                          ? "grid gap-10 lg:grid-cols-2 lg:items-start"
                          : "flex justify-center"
                      }
                    >
                      {prototypeVideos.map((video: any, index: number) => (
                        <article
                          key={`${video.url || video.videoUrl || index}-${index}`}
                          className={prototypeVideos.length > 1 ? "min-w-0" : isClientProject ? "w-full max-w-5xl" : "w-full max-w-[440px]"}
                        >
                          <div className="flex justify-center">
                            <video
                              controls
                              playsInline
                              preload="metadata"
                              className={`h-auto w-full rounded-[1.5rem] bg-black shadow-xl ${isClientProject ? "max-w-5xl" : "max-w-[440px]"}`}
                            >
                              <source src={video.url || video.videoUrl} />
                              Your browser does not support the video tag.
                            </video>
                          </div>

                          {(video.title || video.description) && (
                            <div className={`mx-auto mt-5 ${isClientProject ? "max-w-5xl" : "max-w-[440px]"}`}>
                              {video.title && (
                                <h3 className="text-lg font-black tracking-[-0.02em] text-slate-950 dark:text-white">
                                  {video.title}
                                </h3>
                              )}
                              {video.description && (
                                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                                  {video.description}
                                </p>
                              )}
                            </div>
                          )}
                        </article>
                      ))}
                    </div>
                  )
                })()}

                {(project.prototypeUrl || project.figmaUrl) && (
                  <div className="flex justify-center pt-8">
                    <a
                      href={project.prototypeUrl || project.figmaUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl bg-[#2D5BFF] px-7 py-4 text-sm font-bold text-white"
                    >
                      Explore Interactive Prototype →
                    </a>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {project.edgeCases?.length ? (
        <section id="edge-cases" className="scroll-mt-24 bg-[#050914] px-6 py-24 text-white lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal><SectionHeading eyebrow="08 — Edge Cases & System States" title="Designing beyond the happy path" description={project.edgeCaseIntro} inverse /></Reveal>
            <div className="mt-14 space-y-10">{project.edgeCases.map((edge, index) => <Reveal key={`${edge.title}-${index}`}><article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8"><div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-300">{edge.stateStatus === "proposed" ? "Proposed System State" : `Edge Case ${String(index + 1).padStart(2, "0")}`}</p><h3 className="mt-3 text-3xl font-black">{edge.title}</h3>{edge.scenario && <div className="mt-6"><p className="font-bold text-blue-300">Scenario</p><p className="mt-2 leading-7 text-slate-300">{edge.scenario}</p></div>}{(edge.challenge || edge.response) && <div className="mt-6"><p className="font-bold text-blue-300">Problem</p><p className="mt-2 leading-7 text-slate-300">{edge.challenge || edge.response}</p></div>}{(edge.solution || edge.recoveryAction) && <div className="mt-6"><p className="font-bold text-blue-300">Response</p><p className="mt-2 leading-7 text-slate-300">{edge.solution || edge.recoveryAction}</p></div>}{edge.whyItMatters && <div className="mt-6"><p className="font-bold text-blue-300">Why it matters</p><p className="mt-2 leading-7 text-slate-300">{edge.whyItMatters}</p></div>}</div>{edge.screens?.length ? <LightboxGallery items={mapGallery(edge.screens)} /> : null}</div></article></Reveal>)}</div>
          </div>
        </section>
      ) : null}

      {(project.validationSummary || project.validationPlan?.length) && (
        <section id="validation" className="scroll-mt-24 px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal><SectionHeading eyebrow="Validation Plan" title="Testing the workflow before making impact claims" description={project.validationSummary} /></Reveal>
            {project.validationPlan?.length ? <div className="mt-14"><LightboxGallery items={mapGallery(project.validationPlan)} /></div> : null}
          </div>
        </section>
      )}

      {isClientProject && (project.implementationSummary || project.implementationRole || project.architectureSteps?.length || project.cmsApproach || project.implementationHighlights?.length || project.responsiveImplementation) && (
        <section id="implementation" className="scroll-mt-24 px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal><SectionHeading eyebrow="09 — Development & Implementation" title="Turning product decisions into a working experience" description={project.implementationSummary} /></Reveal>
            {project.implementationRole && <div className="mt-10 max-w-xl"><MetaCard label="Role in Implementation" value={project.implementationRole} /></div>}
            {project.architectureSteps?.length ? <div className="mt-14"><h3 className="mb-6 text-2xl font-black">Technical Architecture</h3><div className="grid gap-5 lg:grid-cols-2">{project.architectureSteps.map((step, index) => <Reveal key={`${step.title}-${index}`}><article className="h-full rounded-[2rem] border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-white/[0.04]"><p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Layer {String(index + 1).padStart(2, "0")}</p><h4 className="mt-3 text-xl font-black">{step.title}</h4>{step.subtitle && <p className="mt-2 text-sm text-slate-500">{step.subtitle}</p>}{step.responsibilities?.length ? <div className="mt-5"><PillList items={step.responsibilities} /></div> : null}</article></Reveal>)}</div></div> : null}
            <div className="mt-14 grid gap-8 lg:grid-cols-2">
              {project.cmsApproach && <Reveal><article className="rounded-[2rem] border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.04]"><p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600">Client Control</p><h3 className="mt-3 text-2xl font-black">CMS & Content Management</h3><p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">{project.cmsApproach}</p></article></Reveal>}
              {project.responsiveImplementation && <Reveal delay={80}><article className="rounded-[2rem] border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.04]"><p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600">Responsive Implementation</p><h3 className="mt-3 text-2xl font-black">One Product, Multiple Breakpoints</h3><p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">{project.responsiveImplementation}</p></article></Reveal>}
            </div>
            {project.implementationHighlights?.length ? <div className="mt-14"><h3 className="mb-6 text-2xl font-black">Implementation Highlights</h3><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{project.implementationHighlights.map((item, index) => <Reveal key={`${item.title}-${index}`}><article className="h-full rounded-[2rem] border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-white/[0.04]"><h4 className="text-xl font-black">{item.title}</h4>{item.description && <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>}</article></Reveal>)}</div></div> : null}
            {project.deploymentStatus && <div className="mt-12 max-w-md"><MetaCard label="Deployment Status" value={project.deploymentStatus === "live" ? "Live" : project.deploymentStatus} /></div>}
          </div>
        </section>
      )}

      {((isClientProject && (project.outcome || project.deliveredOutcomes?.length || project.expectedImpacts?.length || project.futureMetrics?.length || project.outcomeImages?.length)) || (!isClientProject && (hasRichContent(project.impactSummary) || project.outcomes?.length || project.metrics?.length || project.outcomeImages?.length))) && (
        <section id="impact" className="scroll-mt-24 bg-white px-6 py-24 dark:bg-[#080D1A] lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal><SectionHeading eyebrow="10 — Impact & Outcomes" title="From business problems to product outcomes" description={project.outcome} /></Reveal>
            {!isClientProject && hasRichContent(project.impactSummary) && <div className="mt-12 max-w-4xl"><RichContent value={project.impactSummary} /></div>}
            {project.deliveredOutcomes?.length ? <div className="mt-12"><h3 className="mb-6 text-2xl font-black">Delivered Outcomes</h3><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{project.deliveredOutcomes.map((item, index) => <Reveal key={`${item.title}-${index}`}><article className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 dark:border-white/10 dark:bg-[#0B1120]"><h4 className="text-lg font-black">{item.title}</h4>{item.description && <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>}</article></Reveal>)}</div></div> : null}
            {project.expectedImpacts?.length ? <div className="mt-12"><h3 className="mb-6 text-2xl font-black">Expected Business & UX Impact</h3><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{project.expectedImpacts.map((item, index) => <Reveal key={`${item.title}-${index}`}><article className="rounded-[2rem] border border-emerald-200 bg-emerald-50/60 p-7 dark:border-emerald-400/20 dark:bg-emerald-400/10"><h4 className="text-lg font-black">{item.title}</h4>{item.description && <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>}</article></Reveal>)}</div></div> : null}
            {project.futureMetrics?.length ? <div className="mt-12"><h3 className="mb-6 text-2xl font-black">Success Metrics / Future Measurement</h3><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{project.futureMetrics.map((item, index) => <Reveal key={`${item.metric}-${index}`}><article className="rounded-[2rem] border border-blue-200 bg-blue-50/60 p-7 dark:border-blue-400/20 dark:bg-blue-400/10"><h4 className="text-lg font-black">{item.metric}</h4>{item.description && <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>}</article></Reveal>)}</div></div> : null}
            {!isClientProject && project.metrics?.length ? <div className="mt-12 grid gap-5 md:grid-cols-3">{project.metrics.map((metric, index) => <Reveal key={`${metric.label || metric.value}-${index}`} delay={index * 70}><article className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 dark:border-white/10 dark:bg-[#0B1120]">{metric.value && <p className="text-3xl font-black text-blue-600">{metric.value}</p>}{metric.label && <h3 className="mt-3 text-lg font-black">{metric.label}</h3>}{metric.note && <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{metric.note}</p>}</article></Reveal>)}</div> : null}
            {!isClientProject && project.outcomes?.length ? <div className="mt-12"><h3 className="mb-6 text-2xl font-black">Design Outcomes</h3><div className="grid gap-4 md:grid-cols-2">{project.outcomes.map((outcome, index) => <Reveal key={`${outcome}-${index}`}><div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-lg font-semibold leading-8 dark:border-white/10 dark:bg-[#0B1120]">{outcome}</div></Reveal>)}</div></div> : null}
            {project.outcomeImages?.length ? <div className="mt-14"><h3 className="mb-6 text-2xl font-black">Outcomes & Reflection</h3><LightboxGallery items={mapGallery(project.outcomeImages)} /></div> : null}
          </div>
        </section>
      )}

      {((isClientProject && (project.reflectionSummary || project.learningCards?.length || project.tradeOffs?.length || project.validationNeeds?.length || project.whatIDoDifferently || project.nextSteps?.length || project.finalReflection)) || (!isClientProject && ((Array.isArray(project.learnings) && project.learnings.length) || project.nextSteps?.length || hasRichContent(project.reflection)))) && (
        <section id="reflection" className="scroll-mt-24 px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal><SectionHeading eyebrow="11 — Reflection & Next Steps" title="Learning from the product and looking forward" description={project.reflectionSummary} /></Reveal>
            {project.learningCards?.length ? <div className="mt-12 grid gap-5 lg:grid-cols-3">{project.learningCards.map((item, index) => <Reveal key={`${item.title}-${index}`}><article className="h-full rounded-[2rem] border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-white/[0.04]"><p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">{String(index + 1).padStart(2, "0")}</p><h3 className="mt-3 text-xl font-black">{item.title}</h3>{item.lesson && <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">{item.lesson}</p>}{item.takeaway && <div className="mt-5 border-t border-slate-200 pt-5 dark:border-white/10"><p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">Takeaway</p><p className="mt-2 font-semibold">{item.takeaway}</p></div>}</article></Reveal>)}</div> : null}
            {project.tradeOffs?.length ? <div className="mt-14"><h3 className="mb-6 text-2xl font-black">Key Trade-offs</h3><div className="space-y-4">{project.tradeOffs.map((item, index) => <Reveal key={`${item.decision}-${index}`}><article className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.04] md:grid-cols-3"><div><p className="text-xs font-bold uppercase text-blue-600">Decision</p><p className="mt-2 font-bold">{item.decision}</p></div><div><p className="text-xs font-bold uppercase text-blue-600">Why</p><p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">{item.why}</p></div><div><p className="text-xs font-bold uppercase text-blue-600">Trade-off</p><p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">{item.tradeOff}</p></div></article></Reveal>)}</div></div> : null}
            <div className="mt-12 grid gap-8 lg:grid-cols-3">
              {project.validationNeeds?.length ? <Reveal><article className="rounded-[2rem] border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.04]"><h3 className="text-2xl font-black">What Still Needs Validation</h3><div className="mt-6 space-y-5">{project.validationNeeds.map((item, index) => <div key={`${item.title}-${index}`}><p className="font-bold">{item.title}</p>{item.description && <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>}</div>)}</div></article></Reveal> : null}
              {project.nextSteps?.length ? <Reveal delay={80}><article className="rounded-[2rem] border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.04]"><h3 className="text-2xl font-black">Next Steps</h3><div className="mt-6 space-y-4">{project.nextSteps.map((item, index) => <div key={`${item}-${index}`} className="flex gap-3"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600" /><p className="leading-7">{item}</p></div>)}</div></article></Reveal> : null}
              {project.whatIDoDifferently ? <Reveal delay={160}><article className="rounded-[2rem] border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.04]"><h3 className="text-2xl font-black">What I Would Do Differently</h3><p className="mt-6 whitespace-pre-line leading-8 text-slate-600 dark:text-slate-300">{project.whatIDoDifferently}</p></article></Reveal> : null}
            </div>
            {project.finalReflection ? <Reveal><article className="mt-14 rounded-[2rem] bg-[#050914] p-8 text-white"><p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-300">Final Reflection</p><p className="mt-5 whitespace-pre-line text-lg leading-9 text-slate-300">{project.finalReflection}</p></article></Reveal> : null}
            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              {!isClientProject && Array.isArray(project.learnings) && project.learnings.length ? <Reveal><article className="rounded-[2rem] border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.04]"><h3 className="text-2xl font-black">What I Learned</h3><div className="mt-6 space-y-4">{project.learnings.map((item, index) => <div key={`${item}-${index}`} className="flex gap-3"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600" /><p className="leading-7">{item}</p></div>)}</div></article></Reveal> : null}
            </div>
            {!isClientProject && hasRichContent(project.reflection) && <div className="mt-12 max-w-4xl"><RichContent value={project.reflection} /></div>}
          </div>
        </section>
      )}

      {(project.liveUrl || project.figmaUrl || project.githubUrl || project.repositoryUrl) && (
        <section id="links" className="scroll-mt-24 bg-white px-6 py-20 dark:bg-[#080D1A] lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal><SectionHeading eyebrow="Links" title="Explore the project" /></Reveal>
            <div className="mt-10 flex flex-wrap gap-4">
              {project.figmaUrl && <a href={project.figmaUrl} target="_blank" rel="noreferrer" className="rounded-xl bg-[#2D5BFF] px-6 py-4 text-sm font-bold text-white">Open Figma →</a>}
              {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold dark:border-white/10 dark:bg-white/[0.04]">View Live Project →</a>}
              {(project.githubUrl || project.repositoryUrl) && <a href={project.githubUrl || project.repositoryUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold dark:border-white/10 dark:bg-white/[0.04]">View Repository →</a>}
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
