export type SanityAsset = {
  _ref?: string
  _id?: string
  _type?: string
  url?: string
}

export type SanityImage = {
  asset?: SanityAsset
  alt?: string
  caption?: string
  hotspot?: {
    x?: number
    y?: number
    height?: number
    width?: number
  }
  crop?: {
    top?: number
    bottom?: number
    left?: number
    right?: number
  }
}

export type CaseStudyImage = {
  _key?: string
  _type: "caseStudyImage"
  display?: "full" | "contained" | "half"
  image?: SanityImage
}

export type PortableTextSpan = {
  _key?: string
  _type?: "span"
  text?: string
  marks?: string[]
}

export type PortableTextBlock = {
  _key?: string
  _type: "block"
  style?: string
  listItem?: "bullet" | "number"
  level?: number
  children?: PortableTextSpan[]
}

export type RichContentItem = PortableTextBlock | CaseStudyImage

export type ResearchInsight = {
  title: string
  evidence?: string
  decision?: string
}

export type DesignDecision = {
  decision: string
  reason: string
  impact?: string
}

export type FeatureFlow = {
  title: string
  description?: string
  screens?: CaseStudyImage[]
}

export type EdgeCase = {
  title: string
  scenario?: string
  response?: string
  recoveryAction?: string
  screens?: CaseStudyImage[]
}

export type Iteration = {
  eyebrow?: string
  title: string
  body?: RichContentItem[]
}

export type Metric = {
  label?: string
  value?: string
  note?: string
}

export type Project = {
  _id?: string
  title: string
  slug?: {current?: string}
  summary?: string
  heroImage?: SanityImage

  projectType?: string
  role?: string
  timeline?: string
  platform?: string
  team?: string
  tools?: string[]
  responsibilities?: string[]

  problemStatement?: string
  context?: RichContentItem[]
  howMightWe?: string
  constraints?: string[]

  researchMethods?: string[]
  personas?: CaseStudyImage[]
  journeyMap?: CaseStudyImage[]
  competitiveAnalysis?: RichContentItem[]
  researchInsights?: ResearchInsight[]

  productGoal?: string
  successCriteria?: string[]
  productPrinciples?: string[]
  designDecisions?: DesignDecision[]

  informationArchitecture?: RichContentItem[]
  primaryUserFlow?: RichContentItem[]
  secondaryFlows?: FeatureFlow[]

  wireframeSummary?: RichContentItem[]
  lowFidelityWireframes?: CaseStudyImage[]
  iterations?: Iteration[]

  visualDirection?: RichContentItem[]
  designSystem?: CaseStudyImage[]
  accessibility?: string[]

  solutionIntro?: RichContentItem[]
  featureFlows?: FeatureFlow[]

  prototypeDescription?: string
  prototypeVideoUrl?: string
  prototypeUrl?: string

  edgeCases?: EdgeCase[]

  impactSummary?: RichContentItem[]
  outcomes?: string[]
  metrics?: Metric[]

  learnings?: string[]
  nextSteps?: string[]
  reflection?: RichContentItem[]

  liveUrl?: string
  figmaUrl?: string
  githubUrl?: string
}
