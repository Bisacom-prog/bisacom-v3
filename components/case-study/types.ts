export type SanityImage = {
  asset?: {
    _ref?: string
    _type?: string
  }
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

export type GalleryImage = {
  image: SanityImage
  alt?: string
  caption?: string
  displaySize?: "small" | "medium" | "large" | "full"
}

export type ResearchInsight = {
  title: string
  description?: string
}

export type FinalUiSection = {
  title: string
  description?: string
  displayMode?: "grid" | "flow"
  screens?: GalleryImage[]
}

export type EdgeCase = {
  title: string
  scenario?: string
  challenge?: string
  solution?: string
  actions?: string[]
  screens?: GalleryImage[]
}

export type ImpactMetric = {
  metric: string
  label: string
  description?: string
}

export type Project = {
  title: string
  category?: string
  projectType?: string
  summary?: string

  heroImage?: SanityImage

  role?: string
  timeline?: string
  platform?: string
  tools?: string[]

  problem?: string
  goal?: string
  designChallenge?: string

  researchInsights?: ResearchInsight[]
  personas?: GalleryImage[]
  journeyMaps?: GalleryImage[]

  userFlows?: GalleryImage[]
  wireframes?: GalleryImage[]
  designSystem?: GalleryImage[]

  solutionOverview?: string
  finalUiSections?: FinalUiSection[]

  edgeCaseIntro?: string
  edgeCases?: EdgeCase[]

  prototypeUrl?: string
  prototypeVideoUrl?: string
  prototypePoster?: SanityImage
  prototypeNotes?: string

  outcome?: string
  impactMetrics?: ImpactMetric[]
  learnings?: string

  liveUrl?: string
  figmaUrl?: string
}