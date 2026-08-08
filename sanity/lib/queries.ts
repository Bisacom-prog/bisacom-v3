import {groq} from "next-sanity"

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
      image{...,asset->{_id,url,metadata},alt,caption}
    }
  },
  howMightWe,
  constraints,

  researchMethods,
  personas[]{_key,_type,display,image{...,asset->{_id,url,metadata},alt,caption}},
  journeyMap[]{_key,_type,display,image{...,asset->{_id,url,metadata},alt,caption}},
  competitiveAnalysis[]{
    ...,
    _type == "caseStudyImage" => {
      _key,_type,display,
      image{...,asset->{_id,url,metadata},alt,caption}
    }
  },
  researchInsights[]{title,evidence,decision},

  productGoal,
  successCriteria,
  productPrinciples,
  designDecisions[]{decision,reason,impact},

  informationArchitecture[]{
    ...,
    _type == "caseStudyImage" => {
      _key,_type,display,
      image{...,asset->{_id,url,metadata},alt,caption}
    }
  },
  primaryUserFlow[]{
    ...,
    _type == "caseStudyImage" => {
      _key,_type,display,
      image{...,asset->{_id,url,metadata},alt,caption}
    }
  },
  secondaryFlows[]{
    title,
    description,
    screens[]{_key,_type,display,image{...,asset->{_id,url,metadata},alt,caption}}
  },

  wireframeSummary[],
  lowFidelityWireframes[]{_key,_type,display,image{...,asset->{_id,url,metadata},alt,caption}},
  iterations[]{
    _key,
    eyebrow,
    title,
    body[]{
      ...,
      _type == "caseStudyImage" => {
        _key,_type,display,
        image{...,asset->{_id,url,metadata},alt,caption}
      }
    },
    screens[]{_key,_type,display,image{...,asset->{_id,url,metadata},alt,caption}}
  },

  visualDirection[]{
    ...,
    _type == "caseStudyImage" => {
      _key,_type,display,
      image{...,asset->{_id,url,metadata},alt,caption}
    }
  },
  designSystem[]{_key,_type,display,image{...,asset->{_id,url,metadata},alt,caption}},
  accessibility,

  solutionIntro[],
  featureFlows[]{
    title,
    description,
    screens[]{_key,_type,display,image{...,asset->{_id,url,metadata},alt,caption}}
  },

  prototypeDescription,
  "prototypeVideoUrl": prototypeVideo.asset->url,
  prototypeUrl,

  edgeCases[]{
    title,
    scenario,
    response,
    recoveryAction,
    screens[]{_key,_type,display,image{...,asset->{_id,url,metadata},alt,caption}}
  },

  impactSummary[],
  outcomes,
  metrics[]{label,value,note},

  learnings,
  nextSteps,
  reflection[],

  liveUrl,
  figmaUrl,
  githubUrl
}
`
