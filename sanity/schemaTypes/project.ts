import {defineArrayMember, defineField, defineType} from 'sanity'

const caseStudyImage = defineArrayMember({
  name: 'caseStudyImage',
  title: 'Case Study Image',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
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
    defineField({
      name: 'displaySize',
      title: 'Display Size',
      type: 'string',
      initialValue: 'full',
      options: {
        layout: 'radio',
        list: [
          {title: 'Full width', value: 'full'},
          {title: 'Half width', value: 'half'},
          {title: 'Compact', value: 'compact'},
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'caption',
      subtitle: 'alt',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Case study image',
        subtitle,
        media,
      }
    },
  },
})

const contentSection = defineArrayMember({
  name: 'contentSection',
  title: 'Content Section',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Optional small label, for example: Research, Process or Solution.',
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Section Summary',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'body',
      title: 'Section Body',
      type: 'array',
      of: [
        defineArrayMember({type: 'block'}),
      ],
    }),
    defineField({
      name: 'images',
      title: 'Image Gallery',
      type: 'array',
      of: [caseStudyImage],
      options: {sortable: true},
    }),
    defineField({
      name: 'layout',
      title: 'Section Layout',
      type: 'string',
      initialValue: 'stacked',
      options: {
        list: [
          {title: 'Text above media', value: 'stacked'},
          {title: 'Text left, media right', value: 'split-left'},
          {title: 'Media left, text right', value: 'split-right'},
          {title: 'Media only', value: 'media-only'},
        ],
      },
    }),
    defineField({
      name: 'background',
      title: 'Background Style',
      type: 'string',
      initialValue: 'default',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Muted', value: 'muted'},
          {title: 'Dark', value: 'dark'},
          {title: 'Accent', value: 'accent'},
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'eyebrow',
      media: 'images.0.image',
    },
  },
})

export const project = defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',

  groups: [
    {name: 'overview', title: 'Overview', default: true},
    {name: 'strategy', title: 'Strategy'},
    {name: 'research', title: 'Research'},
    {name: 'process', title: 'Process'},
    {name: 'solution', title: 'Solution'},
    {name: 'edgeCases', title: 'Edge Cases'},
    {name: 'prototype', title: 'Prototype'},
    {name: 'impact', title: 'Impact'},
    {name: 'links', title: 'Links'},
    {name: 'content', title: 'Flexible Sections'},
  ],

  fields: [
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
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'overview',
      description: 'Example: Product Design / Automotive Technology',
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      group: 'overview',
      options: {
        list: [
          {title: 'Product Design Case Study', value: 'Product Design Case Study'},
          {title: 'UX/UI Design', value: 'UX/UI Design'},
          {title: 'Web Design', value: 'Web Design'},
          {title: 'Front-End Build', value: 'Front-End Build'},
          {title: 'Brand / Visual Design', value: 'Brand / Visual Design'},
        ],
      },
    }),
    defineField({
      name: 'summary',
      title: 'Short Summary',
      type: 'text',
      group: 'overview',
      rows: 4,
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
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      group: 'overview',
      initialValue: false,
    }),

    defineField({
      name: 'role',
      title: 'My Role',
      type: 'string',
      group: 'strategy',
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline',
      type: 'string',
      group: 'strategy',
    }),
    defineField({
      name: 'tools',
      title: 'Tools',
      type: 'array',
      group: 'strategy',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      group: 'strategy',
    }),
    defineField({
      name: 'problem',
      title: 'Problem',
      type: 'text',
      rows: 6,
      group: 'strategy',
    }),
    defineField({
      name: 'goal',
      title: 'Goal',
      type: 'text',
      rows: 6,
      group: 'strategy',
    }),
    defineField({
      name: 'designChallenge',
      title: 'Design Challenge / HMW Statement',
      type: 'text',
      rows: 4,
      group: 'strategy',
    }),
    defineField({
      name: 'targetUsers',
      title: 'Target Users',
      type: 'array',
      group: 'strategy',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),

    defineField({
      name: 'researchMethods',
      title: 'Research Methods',
      type: 'array',
      group: 'research',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'researchInsights',
      title: 'Research Insights',
      type: 'array',
      group: 'research',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Insight Title', type: 'string'}),
            defineField({
              name: 'description',
              title: 'Insight Description',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'description'},
          },
        }),
      ],
    }),
    defineField({
      name: 'personas',
      title: 'Personas',
      type: 'array',
      group: 'research',
      of: [caseStudyImage],
    }),
    defineField({
      name: 'journeyMaps',
      title: 'Journey Maps',
      type: 'array',
      group: 'research',
      of: [caseStudyImage],
    }),

    defineField({
      name: 'userFlows',
      title: 'User Flows',
      type: 'array',
      group: 'process',
      of: [caseStudyImage],
    }),
    defineField({
      name: 'wireframes',
      title: 'Wireframes',
      type: 'array',
      group: 'process',
      of: [caseStudyImage],
    }),
    defineField({
      name: 'designSystem',
      title: 'Design System',
      type: 'array',
      group: 'process',
      of: [caseStudyImage],
    }),

    defineField({
      name: 'solutionOverview',
      title: 'Solution Overview',
      type: 'text',
      rows: 6,
      group: 'solution',
    }),
    defineField({
      name: 'keyFeatures',
      title: 'Key Features',
      type: 'array',
      group: 'solution',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Feature Title', type: 'string'}),
            defineField({
              name: 'description',
              title: 'Feature Description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'icon',
              title: 'Feature Icon',
              type: 'image',
              options: {hotspot: true},
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'description', media: 'icon'},
          },
        }),
      ],
    }),
    defineField({
      name: 'finalUiSections',
      title: 'Final UI Sections',
      type: 'array',
      group: 'solution',
      description:
        'Group final screens by journey, for example: Onboarding, AI Diagnosis, Mechanic Search, Tracking and Payment.',
      of: [
        defineArrayMember({
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
              name: 'screens',
              title: 'Screens',
              type: 'array',
              of: [caseStudyImage],
              options: {sortable: true},
              validation: (Rule) => Rule.min(1),
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
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'screens.0.image',
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'edgeCaseIntro',
      title: 'Edge Cases Introduction',
      type: 'text',
      rows: 4,
      group: 'edgeCases',
    }),
    defineField({
      name: 'edgeCases',
      title: 'Priority Edge Cases',
      type: 'array',
      group: 'edgeCases',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Edge Case Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'scenario',
              title: 'Scenario',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'challenge',
              title: 'Challenge',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'solution',
              title: 'Solution',
              type: 'text',
              rows: 4,
            }),
            defineField({
              name: 'actions',
              title: 'Key Recovery Actions',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
            }),
            defineField({
              name: 'screens',
              title: 'Edge Case Screens',
              type: 'array',
              of: [caseStudyImage],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'scenario',
              media: 'screens.0.image',
            },
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
    defineField({
      name: 'prototypeVideo',
      title: 'Prototype Video',
      type: 'file',
      group: 'prototype',
      options: {
        accept: 'video/mp4,video/webm',
      },
      fields: [
        defineField({
          name: 'caption',
          title: 'Video Caption',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'prototypePoster',
      title: 'Prototype Video Poster',
      type: 'image',
      group: 'prototype',
      options: {hotspot: true},
    }),
    defineField({
      name: 'prototypeNotes',
      title: 'Prototype Notes',
      type: 'text',
      rows: 4,
      group: 'prototype',
    }),

    defineField({
      name: 'outcome',
      title: 'Outcome',
      type: 'text',
      rows: 6,
      group: 'impact',
    }),
    defineField({
      name: 'impactMetrics',
      title: 'Impact Metrics / Intended Impact',
      type: 'array',
      group: 'impact',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'metric', title: 'Metric', type: 'string'}),
            defineField({name: 'label', title: 'Label', type: 'string'}),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            }),
          ],
          preview: {
            select: {title: 'metric', subtitle: 'label'},
          },
        }),
      ],
    }),
    defineField({
      name: 'learnings',
      title: 'Key Learnings',
      type: 'text',
      rows: 6,
      group: 'impact',
    }),
    defineField({
      name: 'nextSteps',
      title: 'Next Steps',
      type: 'array',
      group: 'impact',
      of: [defineArrayMember({type: 'string'})],
    }),

    defineField({
      name: 'contentSections',
      title: 'Flexible Case Study Sections',
      type: 'array',
      group: 'content',
      description:
        'Optional reusable sections for content that does not fit the standard structure.',
      of: [contentSection],
      options: {sortable: true},
    }),

    defineField({
      name: 'liveUrl',
      title: 'Live URL',
      type: 'url',
      group: 'links',
    }),
    defineField({
      name: 'figmaUrl',
      title: 'Figma Design URL',
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
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'heroImage',
    },
  },
})
