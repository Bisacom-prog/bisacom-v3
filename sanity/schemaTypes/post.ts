import {defineArrayMember, defineField, defineType} from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'publishing', title: 'Publishing'},
    {name: 'seo', title: 'SEO'},
    {name: 'relationships', title: 'Relationships'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().min(10).max(90),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Short summary used on cards and in search/social previews.',
      validation: (Rule) => Rule.required().min(80).max(220),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      group: 'content',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          validation: (Rule) => Rule.required().max(160),
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
          validation: (Rule) => Rule.max(180),
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Article Body',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (Rule) =>
                      Rule.uri({
                        allowRelative: true,
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  }),
                  defineField({
                    name: 'openInNewTab',
                    title: 'Open in New Tab',
                    type: 'boolean',
                    initialValue: false,
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
              validation: (Rule) => Rule.required().max(160),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
              validation: (Rule) => Rule.max(180),
            }),
          ],
        }),
        defineArrayMember({
          name: 'callout',
          title: 'Callout',
          type: 'object',
          fields: [
            defineField({
              name: 'tone',
              title: 'Tone',
              type: 'string',
              initialValue: 'insight',
              options: {
                layout: 'radio',
                list: [
                  {title: 'Insight', value: 'insight'},
                  {title: 'Tip', value: 'tip'},
                  {title: 'Warning', value: 'warning'},
                ],
              },
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.max(80),
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required().max(500),
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'text'},
            prepare({title, subtitle}) {
              return {title: title || 'Callout', subtitle}
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      group: 'publishing',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'blogCategory'}],
      group: 'publishing',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'publishing',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      validation: (Rule) => Rule.unique().max(10),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'publishing',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Feature This Article',
      type: 'boolean',
      group: 'publishing',
      initialValue: false,
      description: 'Use for articles you want to highlight on the Insights page or homepage.',
    }),

    defineField({
      name: 'seo',
      title: 'Search & Social',
      type: 'seo',
      group: 'seo',
    }),

    defineField({
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      group: 'relationships',
      description: 'Optional. Choose up to three relevant articles.',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'post'}],
          options: {disableNew: true},
        }),
      ],
      validation: (Rule) => Rule.unique().max(3),
    }),
  ],
  orderings: [
    {
      title: 'Published, newest first',
      name: 'publishedDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Title, A–Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category.title',
      author: 'author.name',
      publishedAt: 'publishedAt',
      media: 'featuredImage',
    },
    prepare({title, category, author, publishedAt, media}) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
        : 'No publish date'

      return {
        title,
        subtitle: [category, author, date].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
