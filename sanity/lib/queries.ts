import {groq} from "next-sanity"

export const projectsIndexQuery = groq`
*[_type == "project" && defined(slug.current)] | order(_createdAt desc){
  _id,
  title,
  "slug": slug.current,
  summary,
  projectType,
  platform,
  "heroImageUrl": heroImage.asset->url,
  "heroImageAlt": coalesce(heroImage.alt, title + " case study preview")
}
`

export const projectBySlugQuery = groq`
*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  summary,
  heroImage{
    ...,
    asset->{_id,url,metadata},
    alt,
    caption
  },

  projectType,
  role,
  timeline,
  platform,
  team,
  tools,
  responsibilities,

  problemStatement,
  context[]{
    ...,
    _type == "caseStudyImage" => {
      _key,_type,display,
      alt,caption,image{...,asset->{_id,url,metadata}}
    }
  },
  howMightWe,
  constraints,

  researchMethods,
  personas[]{_key,_type,display,alt,caption,image{...,asset->{_id,url,metadata}}},
  journeyMap[]{_key,_type,display,alt,caption,image{...,asset->{_id,url,metadata}}},
  competitiveAnalysis[]{
    ...,
    _type == "caseStudyImage" => {
      _key,_type,display,
      alt,caption,image{...,asset->{_id,url,metadata}}
    }
  },
  researchInsights[]{title,evidence,description,decision},

  productGoal,
  successCriteria,
  productPrinciples,
  designDecisions[]{decision,reason,impact},
  strategyOverview[]{_key,_type,display,displaySize,alt,caption,image{...,asset->{_id,url,metadata}}},

  informationArchitecture[]{
    ...,
    _type == "caseStudyImage" => {
      _key,_type,display,
      alt,caption,image{...,asset->{_id,url,metadata}}
    }
  },
  primaryUserFlow[]{
    ...,
    _type == "caseStudyImage" => {
      _key,_type,display,
      alt,caption,image{...,asset->{_id,url,metadata}}
    }
  },
  secondaryFlows[]{
    title,
    description,
    screens[]{_key,_type,display,alt,caption,image{...,asset->{_id,url,metadata}}}
  },

  wireframeSummary[],
  lowFidelityWireframes[]{_key,_type,display,alt,caption,image{...,asset->{_id,url,metadata}}},
  iterations[]{
    _key,
    eyebrow,
    title,
    body[]{
      ...,
      _type == "caseStudyImage" => {
        _key,_type,display,
        alt,caption,image{...,asset->{_id,url,metadata}}
      }
    },
    screens[]{_key,_type,display,alt,caption,image{...,asset->{_id,url,metadata}}}
  },

  visualDirection[]{
    ...,
    _type == "caseStudyImage" => {
      _key,_type,display,
      alt,caption,image{...,asset->{_id,url,metadata}}
    }
  },
  designSystem[]{_key,_type,display,alt,caption,image{...,asset->{_id,url,metadata}}},
  accessibility,

  solutionIntro[],
  featureFlows[]{
    title,
    description,
    screens[]{_key,_type,display,alt,caption,image{...,asset->{_id,url,metadata}}}
  },

  prototypeDescription,
  "prototypeVideoUrl": prototypeVideo.asset->url,
  prototypeVideos[]{
    _key,
    title,
    description,
    "url": video.asset->url
  },
  prototypeUrl,
  validationSummary,
  validationPlan[]{_key,_type,display,displaySize,alt,caption,image{...,asset->{_id,url,metadata}}},

  edgeCases[]{
    title,
    scenario,
    response,
    recoveryAction,
    screens[]{_key,_type,display,alt,caption,image{...,asset->{_id,url,metadata}}}
  },

  impactSummary[],
  outcomes,
  metrics[]{label,value,note},

  learnings,
  nextSteps,
  reflection[],


  // V2 / Ma Adjo's Kitchen fields
  problem,
  goal,
  designChallenge,
  targetUsers,
  journeyMaps[]{_key,_type,display,displaySize,alt,caption,image{...,asset->{_id,url,metadata}}},
  userFlows[]{_key,_type,display,displaySize,alt,caption,image{...,asset->{_id,url,metadata}}},
  wireframes[]{_key,_type,display,displaySize,alt,caption,image{...,asset->{_id,url,metadata}}},
  solutionOverview,
  keyFeatures[]{title,description,icon{...,asset->{_id,url,metadata}}},
  finalUiSections[]{
    title,
    description,
    displayMode,
    screens[]{_key,_type,display,displaySize,alt,caption,image{...,asset->{_id,url,metadata}}}
  },

  edgeCaseIntro,
  edgeCases[]{
    title,
    stateStatus,
    scenario,
    challenge,
    solution,
    whyItMatters,
    actions,
    response,
    recoveryAction,
    screens[]{_key,_type,display,displaySize,alt,caption,image{...,asset->{_id,url,metadata}}}
  },

  implementationRole,
  implementationSummary,
  architectureSteps[]{title,subtitle,responsibilities},
  cmsApproach,
  implementationHighlights[]{title,description},
  responsiveImplementation,
  deploymentStatus,

  outcome,
  deliveredOutcomes[]{title,description},
  expectedImpacts[]{title,description},
  futureMetrics[]{metric,description},
  outcomeImages[]{_key,_type,display,displaySize,alt,caption,image{...,asset->{_id,url,metadata}}},
  impactMetrics[]{metric,label,description},

  reflectionSummary,
  learningCards[]{title,lesson,takeaway},
  tradeOffs[]{decision,why,tradeOff},
  validationNeeds[]{title,description},
  whatIDoDifferently,
  finalReflection,
  repositoryUrl,

  liveUrl,
  figmaUrl,
  githubUrl
}
`
