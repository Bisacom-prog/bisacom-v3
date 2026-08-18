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
  displaySize?: "full" | "half" | "compact"
  image?: SanityImage
  alt?: string
  caption?: string
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
  description?: string
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
  displayMode?: "gallery" | "flow" | "featured"
  screens?: CaseStudyImage[]
}

export type EdgeCase = {
  title: string
  stateStatus?: "implemented" | "proposed"
  scenario?: string
  challenge?: string
  solution?: string
  whyItMatters?: string
  actions?: string[]
  response?: string
  recoveryAction?: string
  screens?: CaseStudyImage[]
}

export type Iteration = {
  eyebrow?: string
  title: string
  body?: RichContentItem[]
  screens?: CaseStudyImage[]
}

export type Metric = {
  label?: string
  value?: string
  note?: string
}

export type TextOutcome = {
  title?: string
  description?: string
}

export type Project = {
  _id?: string
  title: string
  slug?: {current?: string}
  category?: string
  summary?: string
  heroImage?: SanityImage
  featured?: boolean

  projectType?: string
  role?: string
  timeline?: string
  platform?: string
  team?: string
  tools?: string[]
  responsibilities?: string[]

  // Legacy + V2 discovery
  problemStatement?: string
  problem?: string
  context?: RichContentItem[]
  howMightWe?: string
  designChallenge?: string
  goal?: string
  targetUsers?: string[]
  constraints?: string[]

  researchMethods?: string[]
  personas?: CaseStudyImage[]
  journeyMap?: CaseStudyImage[]
  journeyMaps?: CaseStudyImage[]
  competitiveAnalysis?: RichContentItem[]
  researchInsights?: ResearchInsight[]

  productGoal?: string
  successCriteria?: string[]
  productPrinciples?: string[]
  designDecisions?: DesignDecision[]
  strategyOverview?: CaseStudyImage[]

  informationArchitecture?: RichContentItem[]
  primaryUserFlow?: RichContentItem[]
  secondaryFlows?: FeatureFlow[]
  userFlows?: CaseStudyImage[]

  wireframeSummary?: RichContentItem[]
  lowFidelityWireframes?: CaseStudyImage[]
  wireframes?: CaseStudyImage[]
  iterations?: Iteration[]

  visualDirection?: RichContentItem[]
  designSystem?: CaseStudyImage[]
  accessibility?: string[]

  solutionIntro?: RichContentItem[]
  solutionOverview?: string
  keyFeatures?: Array<{title?: string; description?: string}>
  featureFlows?: FeatureFlow[]
  finalUiSections?: FeatureFlow[]

  prototypeDescription?: string
  prototypeVideoUrl?: string
  prototypeUrl?: string
  validationSummary?: string
  validationPlan?: CaseStudyImage[]

  edgeCaseIntro?: string
  edgeCases?: EdgeCase[]

  implementationRole?: string
  implementationSummary?: string
  architectureSteps?: Array<{title?: string; subtitle?: string; responsibilities?: string[]}>
  cmsApproach?: string
  implementationHighlights?: TextOutcome[]
  responsiveImplementation?: string
  deploymentStatus?: string

  impactSummary?: RichContentItem[]
  outcome?: string
  outcomes?: string[]
  metrics?: Metric[]
  deliveredOutcomes?: TextOutcome[]
  expectedImpacts?: TextOutcome[]
  futureMetrics?: Array<{metric?: string; description?: string}>
  outcomeImages?: CaseStudyImage[]
  impactMetrics?: Array<{metric?: string; label?: string; description?: string}>

  reflectionSummary?: string
  learnings?: string[] | string
  learningCards?: Array<{title?: string; lesson?: string; takeaway?: string}>
  tradeOffs?: Array<{decision?: string; why?: string; tradeOff?: string}>
  validationNeeds?: TextOutcome[]
  whatIDoDifferently?: string
  nextSteps?: string[]
  finalReflection?: string
  reflection?: RichContentItem[]

  liveUrl?: string
  figmaUrl?: string
  githubUrl?: string
  repositoryUrl?: string
}
