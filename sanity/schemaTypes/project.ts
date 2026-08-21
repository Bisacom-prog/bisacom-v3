import {defineArrayMember, defineField, defineType} from 'sanity'

const imageWithMeta = defineType({
  name: 'caseStudyImage',
  title: 'Case Study Image',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Describe the image for accessibility and SEO.',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'display',
      title: 'Display Style',
      type: 'string',
      initialValue: 'full',
      options: {
        layout: 'radio',
        list: [
          {title: 'Full width', value: 'full'},
          {title: 'Contained', value: 'contained'},
          {title: 'Half width', value: 'half'},
        ],
      },
    }),
  ],
  preview: {
    select: {title: 'image.alt', subtitle: 'image.caption', media: 'image'},
  },
})

const featureFlow = defineType({
  name: 'featureFlow',
  title: 'Feature Flow',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Flow Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Flow Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'displayMode',
      title: 'Display Mode',
      type: 'string',
      initialValue: 'gallery',
      options: {
        list: [
          {title: 'Gallery', value: 'gallery'},
          {title: 'Horizontal flow', value: 'flow'},
          {title: 'Featured screen + gallery', value: 'featured'},
        ],
      },
    }),
    defineField({
      name: 'screens',
      title: 'Screens',
      type: 'array',
      of: [{type: 'caseStudyImage'}],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'description', media: 'screens.0.image'},
  },
})

const researchInsight = defineType({
  name: 'researchInsight',
  title: 'Research Insight',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Insight',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'evidence',
      title: 'Evidence or Observation',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'decision',
      title: 'Design Decision',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'decision'}},
})

const designDecision = defineType({
  name: 'designDecision',
  title: 'Design Decision',
  type: 'object',
  fields: [
    defineField({
      name: 'decision',
      title: 'Decision',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'reason',
      title: 'Why',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'impact',
      title: 'Expected Impact',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {select: {title: 'decision', subtitle: 'reason'}},
})

const edgeCase = defineType({
  name: 'edgeCase',
  title: 'Edge Case',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'stateStatus',
      title: 'State Status',
      type: 'string',
      initialValue: 'implemented',
      options: {
        list: [
          {title: 'Implemented', value: 'implemented'},
          {title: 'Proposed system state', value: 'proposed'},
        ],
      },
    }),
    defineField({name: 'scenario', title: 'Scenario', type: 'text', rows: 3}),
    defineField({name: 'challenge', title: 'Problem / Challenge', type: 'text', rows: 3}),
    defineField({name: 'solution', title: 'Product Response', type: 'text', rows: 4}),
    defineField({name: 'whyItMatters', title: 'Why It Matters', type: 'text', rows: 3}),
    defineField({
      name: 'actions',
      title: 'Recovery Actions',
      type: 'array',
      of: [{type: 'string'}],
    }),

    // Legacy fields retained for existing projects.
    defineField({
      name: 'response',
      title: 'Legacy Product Response',
      type: 'text',
      rows: 4,
      hidden: true,
    }),
    defineField({
      name: 'recoveryAction',
      title: 'Legacy Primary Recovery Action',
      type: 'string',
      hidden: true,
    }),

    defineField({
      name: 'screens',
      title: 'Screens',
      type: 'array',
      of: [{type: 'caseStudyImage'}],
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'stateStatus', media: 'screens.0.image'},
  },
})

const architectureStep = defineType({
  name: 'architectureStep',
  title: 'Architecture Step',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Layer / Service',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'subtitle', title: 'Subtitle', type: 'string'}),
    defineField({
      name: 'responsibilities',
      title: 'Responsibilities',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'subtitle'}},
})

const outcomeItem = defineType({
  name: 'outcomeItem',
  title: 'Outcome Item',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
  ],
  preview: {select: {title: 'title', subtitle: 'description'}},
})

const futureMetric = defineType({
  name: 'futureMetric',
  title: 'Future Metric',
  type: 'object',
  fields: [
    defineField({
      name: 'metric',
      title: 'Metric',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'What to Measure',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {select: {title: 'metric', subtitle: 'description'}},
})

const learningCard = defineType({
  name: 'learningCard',
  title: 'Learning Card',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Learning',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'lesson', title: 'Lesson', type: 'text', rows: 3}),
    defineField({name: 'takeaway', title: 'Takeaway', type: 'string'}),
  ],
  preview: {select: {title: 'title', subtitle: 'takeaway'}},
})

const tradeOff = defineType({
  name: 'tradeOff',
  title: 'Trade-off',
  type: 'object',
  fields: [
    defineField({
      name: 'decision',
      title: 'Decision',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'why', title: 'Why', type: 'text', rows: 3}),
    defineField({name: 'tradeOff', title: 'Trade-off', type: 'text', rows: 3}),
  ],
  preview: {select: {title: 'decision', subtitle: 'tradeOff'}},
})

const validationNeed = defineType({
  name: 'validationNeed',
  title: 'Validation Need',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Validation Need',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
  ],
  preview: {select: {title: 'title', subtitle: 'description'}},
})

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',

  groups: [
    {name: 'overview', title: 'Overview', default: true},
    {name: 'discovery', title: 'Discovery'},
    {name: 'research', title: 'Research'},
    {name: 'strategy', title: 'Strategy'},
    {name: 'architecture', title: 'IA & Flows'},
    {name: 'wireframes', title: 'Wireframes'},
    {name: 'visual', title: 'Visual Design'},
    {name: 'solution', title: 'Final UI'},
    {name: 'edgeCases', title: 'Edge Cases'},
    {name: 'implementation', title: 'Implementation'},
    {name: 'prototype', title: 'Prototype'},
    {name: 'validation', title: 'Validation'},
    {name: 'outcomes', title: 'Outcomes'},
    {name: 'reflection', title: 'Reflection'},
    {name: 'links', title: 'Links'},
  ],

  fields: [
    // OVERVIEW
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      group: 'overview',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'overview',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Project Summary',
      type: 'text',
      rows: 4,
      group: 'overview',
      validation: (Rule) => Rule.required().max(500),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      group: 'overview',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      group: 'overview',
      options: {
        list: [
          {title: 'Concept Project', value: 'concept'},
          {title: 'Client Project', value: 'client'},
          {title: 'Internal Product', value: 'internal'},
          {title: 'Freelance Project', value: 'freelance'},
        ],
      },
    }),
    defineField({name: 'role', title: 'Role', type: 'string', group: 'overview'}),
    defineField({name: 'timeline', title: 'Timeline', type: 'string', group: 'overview'}),
    defineField({name: 'platform', title: 'Platform', type: 'string', group: 'overview'}),
    defineField({name: 'team', title: 'Team', type: 'string', group: 'overview'}),
    defineField({
      name: 'tools',
      title: 'Tools',
      type: 'array',
      group: 'overview',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'responsibilities',
      title: 'Responsibilities',
      type: 'array',
      group: 'overview',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),

    // DISCOVERY
    // Existing field names retained so current Mobile Mechanic content is preserved.
    defineField({
      name: 'problemStatement',
      title: 'Problem Statement',
      type: 'text',
      rows: 5,
      group: 'discovery',
    }),
    defineField({
      name: 'context',
      title: 'Context',
      type: 'array',
      group: 'discovery',
      of: [{type: 'block'}, {type: 'caseStudyImage'}],
    }),
    defineField({
      name: 'howMightWe',
      title: 'How Might We / Design Challenge',
      type: 'string',
      group: 'discovery',
    }),
    defineField({
      name: 'constraints',
      title: 'Constraints',
      type: 'array',
      group: 'discovery',
      of: [{type: 'string'}],
    }),

    // RESEARCH
    defineField({
      name: 'researchMethods',
      title: 'Research Methods',
      type: 'array',
      group: 'research',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'personas',
      title: 'Personas',
      type: 'array',
      group: 'research',
      of: [{type: 'caseStudyImage'}],
    }),
    defineField({
      name: 'journeyMap',
      title: 'Journey Map',
      type: 'array',
      group: 'research',
      of: [{type: 'caseStudyImage'}],
    }),
    defineField({
      name: 'competitiveAnalysis',
      title: 'Competitive Analysis',
      type: 'array',
      group: 'research',
      of: [{type: 'block'}, {type: 'caseStudyImage'}],
    }),
    defineField({
      name: 'researchInsights',
      title: 'Key Research Insights',
      type: 'array',
      group: 'research',
      of: [{type: 'researchInsight'}],
    }),

    // STRATEGY
    defineField({
      name: 'productGoal',
      title: 'Product Goal',
      type: 'text',
      rows: 4,
      group: 'strategy',
    }),
    defineField({
      name: 'successCriteria',
      title: 'Success Criteria',
      type: 'array',
      group: 'strategy',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'productPrinciples',
      title: 'Product Principles',
      type: 'array',
      group: 'strategy',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'designDecisions',
      title: 'Decision Log',
      type: 'array',
      group: 'strategy',
      of: [{type: 'designDecision'}],
    }),
    defineField({
      name: 'strategyOverview',
      title: 'Product Strategy & MVP Board',
      type: 'array',
      group: 'strategy',
      of: [{type: 'caseStudyImage'}],
      description: 'Optional portfolio presentation board for product strategy and MVP scope.',
    }),

    // IA & FLOWS
    defineField({
      name: 'informationArchitecture',
      title: 'Information Architecture',
      type: 'array',
      group: 'architecture',
      of: [{type: 'block'}, {type: 'caseStudyImage'}],
    }),
    defineField({
      name: 'primaryUserFlow',
      title: 'Primary User Flow',
      type: 'array',
      group: 'architecture',
      of: [{type: 'block'}, {type: 'caseStudyImage'}],
    }),
    defineField({
      name: 'secondaryFlows',
      title: 'Secondary Flows',
      type: 'array',
      group: 'architecture',
      of: [{type: 'featureFlow'}],
    }),

    // WIREFRAMES
    defineField({
      name: 'wireframeSummary',
      title: 'Wireframe Summary',
      type: 'array',
      group: 'wireframes',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'lowFidelityWireframes',
      title: 'Low-Fidelity Wireframes',
      type: 'array',
      group: 'wireframes',
      of: [{type: 'caseStudyImage'}],
    }),
    defineField({
      name: 'iterations',
      title: 'Key Iterations',
      type: 'array',
      group: 'wireframes',
      of: [{type: 'featureFlow'}],
    }),

    // VISUAL DESIGN
    defineField({
      name: 'visualDirection',
      title: 'Visual Direction',
      type: 'array',
      group: 'visual',
      of: [{type: 'block'}, {type: 'caseStudyImage'}],
    }),
    defineField({
      name: 'designSystem',
      title: 'Design System',
      type: 'array',
      group: 'visual',
      of: [{type: 'caseStudyImage'}],
    }),
    defineField({
      name: 'accessibility',
      title: 'Accessibility Decisions',
      type: 'array',
      group: 'visual',
      of: [{type: 'string'}],
    }),

    // FINAL UI
    defineField({
      name: 'solutionOverview',
      title: 'Solution Overview',
      type: 'text',
      rows: 5,
      group: 'solution',
    }),
    defineField({
      name: 'solutionIntro',
      title: 'Solution Introduction',
      type: 'array',
      group: 'solution',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'featureFlows',
      title: 'Final UI Sections',
      type: 'array',
      group: 'solution',
      of: [{type: 'featureFlow'}],
    }),

    // EDGE CASES
    defineField({
      name: 'edgeCaseIntro',
      title: 'Edge Cases Introduction',
      type: 'text',
      rows: 4,
      group: 'edgeCases',
    }),
    defineField({
      name: 'edgeCases',
      title: 'Edge Cases',
      type: 'array',
      group: 'edgeCases',
      of: [{type: 'edgeCase'}],
    }),

    // IMPLEMENTATION
    defineField({
      name: 'implementationRole',
      title: 'Role in Implementation',
      type: 'string',
      group: 'implementation',
    }),
    defineField({
      name: 'implementationSummary',
      title: 'Implementation Summary',
      type: 'text',
      rows: 5,
      group: 'implementation',
    }),
    defineField({
      name: 'architectureSteps',
      title: 'Technical Architecture',
      type: 'array',
      group: 'implementation',
      of: [{type: 'architectureStep'}],
    }),
    defineField({
      name: 'cmsApproach',
      title: 'CMS / Client Control',
      type: 'text',
      rows: 5,
      group: 'implementation',
    }),
    defineField({
      name: 'implementationHighlights',
      title: 'Implementation Highlights',
      type: 'array',
      group: 'implementation',
      of: [{type: 'outcomeItem'}],
    }),
    defineField({
      name: 'responsiveImplementation',
      title: 'Responsive Implementation',
      type: 'text',
      rows: 4,
      group: 'implementation',
    }),
    defineField({
      name: 'deploymentStatus',
      title: 'Deployment Status',
      type: 'string',
      group: 'implementation',
      options: {
        list: [
          {title: 'Live', value: 'live'},
          {title: 'In development', value: 'development'},
          {title: 'Prototype only', value: 'prototype'},
          {title: 'Archived', value: 'archived'},
        ],
      },
    }),

    // PROTOTYPE
    defineField({
      name: 'prototypeDescription',
      title: 'Prototype Description',
      type: 'text',
      rows: 4,
      group: 'prototype',
    }),
    defineField({
      name: 'prototypeVideo',
      title: 'Legacy Prototype Video',
      type: 'file',
      group: 'prototype',
      options: {accept: 'video/*'},
      description: 'Legacy single-video field retained for existing projects. For new uploads, use Prototype Videos below.',
    }),
    defineField({
      name: 'prototypeVideos',
      title: 'Prototype Videos',
      type: 'array',
      group: 'prototype',
      description: 'Add one or more focused prototype walkthroughs. Mobile Mechanic can use this for the Core Assistance Journey and AI-Assisted Diagnosis.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'prototypeVideoItem',
          title: 'Prototype Video',
          fields: [
            defineField({
              name: 'title',
              title: 'Video Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Video Description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'video',
              title: 'Video File',
              type: 'file',
              options: {accept: 'video/*'},
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'description'},
          },
        }),
      ],
    }),
    defineField({
      name: 'prototypeUrl',
      title: 'Interactive Prototype URL',
      type: 'url',
      group: 'prototype',
    }),

    // VALIDATION
    defineField({
      name: 'validationSummary',
      title: 'Validation Plan Summary',
      type: 'text',
      rows: 5,
      group: 'validation',
      description: 'Describe planned validation honestly; do not present proposed measures as completed results.',
    }),
    defineField({
      name: 'validationPlan',
      title: 'Validation Plan',
      type: 'array',
      group: 'validation',
      of: [{type: 'caseStudyImage'}],
    }),

    // OUTCOMES
    // Legacy fields are retained for existing projects, but new work should use
    // Delivered Outcomes / Expected Impact / Future Measurement.
    defineField({
      name: 'impactSummary',
      title: 'Legacy Impact Summary',
      type: 'array',
      group: 'outcomes',
      of: [{type: 'block'}],
      description: 'Legacy field retained for existing projects.',
    }),
    defineField({
      name: 'outcomes',
      title: 'Legacy Design Outcomes',
      type: 'array',
      group: 'outcomes',
      of: [{type: 'string'}],
      description: 'Legacy field retained for existing projects.',
    }),
    defineField({
      name: 'metrics',
      title: 'Legacy Metrics',
      type: 'array',
      group: 'outcomes',
      description: 'Legacy field retained for existing projects. Do not invent results.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Metric', type: 'string'}),
            defineField({name: 'value', title: 'Value', type: 'string'}),
            defineField({name: 'note', title: 'Context', type: 'string'}),
          ],
          preview: {select: {title: 'value', subtitle: 'label'}},
        }),
      ],
    }),
    defineField({
      name: 'outcome',
      title: 'Outcome Summary',
      type: 'text',
      rows: 6,
      group: 'outcomes',
    }),
    defineField({
      name: 'deliveredOutcomes',
      title: 'Delivered Outcomes',
      type: 'array',
      group: 'outcomes',
      description: 'Only include outcomes demonstrably present in the implemented product.',
      of: [{type: 'outcomeItem'}],
    }),
    defineField({
      name: 'expectedImpacts',
      title: 'Expected Business & UX Impact',
      type: 'array',
      group: 'outcomes',
      description: 'Qualitative or expected benefits that have not yet been quantitatively validated.',
      of: [{type: 'outcomeItem'}],
    }),
    defineField({
      name: 'futureMetrics',
      title: 'Success Metrics / Future Measurement',
      type: 'array',
      group: 'outcomes',
      description: 'Metrics to track once sufficient real-world usage data exists.',
      of: [{type: 'futureMetric'}],
    }),
    defineField({
      name: 'outcomeImages',
      title: 'Outcomes & Reflection Board',
      type: 'array',
      group: 'outcomes',
      of: [{type: 'caseStudyImage'}],
      description: 'Optional portfolio board summarising delivered design outcomes and reflection.',
    }),

    // REFLECTION
    // Existing fields kept for Mobile Mechanic.
    defineField({
      name: 'learnings',
      title: 'Legacy What I Learned',
      type: 'array',
      group: 'reflection',
      of: [{type: 'string'}],
      description: 'Legacy field retained for existing projects.',
    }),
    defineField({
      name: 'reflection',
      title: 'Legacy Reflection',
      type: 'array',
      group: 'reflection',
      of: [{type: 'block'}],
      description: 'Legacy field retained for existing projects.',
    }),

    defineField({
      name: 'reflectionSummary',
      title: 'Reflection Summary',
      type: 'text',
      rows: 5,
      group: 'reflection',
    }),
    defineField({
      name: 'learningCards',
      title: 'Learning Cards',
      type: 'array',
      group: 'reflection',
      of: [{type: 'learningCard'}],
    }),
    defineField({
      name: 'tradeOffs',
      title: 'Key Trade-offs',
      type: 'array',
      group: 'reflection',
      of: [{type: 'tradeOff'}],
    }),
    defineField({
      name: 'validationNeeds',
      title: 'What Still Needs Validation',
      type: 'array',
      group: 'reflection',
      of: [{type: 'validationNeed'}],
    }),
    defineField({
      name: 'whatIDoDifferently',
      title: 'What I Would Do Differently',
      type: 'text',
      rows: 7,
      group: 'reflection',
    }),
    defineField({
      name: 'nextSteps',
      title: 'Next Steps',
      type: 'array',
      group: 'reflection',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'finalReflection',
      title: 'Final Reflection',
      type: 'text',
      rows: 6,
      group: 'reflection',
    }),

    // LINKS
    defineField({
      name: 'liveUrl',
      title: 'Live Project URL',
      type: 'url',
      group: 'links',
    }),
    defineField({
      name: 'figmaUrl',
      title: 'Figma URL',
      type: 'url',
      group: 'links',
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
      group: 'links',
    }),
    defineField({
      name: 'repositoryUrl',
      title: 'Repository URL',
      type: 'url',
      group: 'links',
    }),
  ],

  preview: {
    select: {title: 'title', subtitle: 'summary', media: 'heroImage'},
  },
})

export const projectSchemaTypes = [
  imageWithMeta,
  featureFlow,
  researchInsight,
  designDecision,
  edgeCase,
  architectureStep,
  outcomeItem,
  futureMetric,
  learningCard,
  tradeOff,
  validationNeed,
  project,
]
