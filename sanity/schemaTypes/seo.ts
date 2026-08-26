import {defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'SEO Title',
      type: 'string',
      description: 'Recommended: 50–60 characters. Leave blank to use the article title.',
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Recommended: 140–160 characters.',
      validation: (Rule) => Rule.max(180),
    }),
    defineField({
      name: 'primaryKeyword',
      title: 'Primary Keyword',
      type: 'string',
      description: 'The main search phrase this article is targeting.',
    }),
    defineField({
      name: 'keywords',
      title: 'Supporting Keywords',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      validation: (Rule) => Rule.unique().max(12),
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL Override',
      type: 'url',
      description: 'Usually leave blank. Use only when this article should canonicalise elsewhere.',
    }),
    defineField({
      name: 'socialImage',
      title: 'Social Sharing Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          validation: (Rule) => Rule.required().max(160),
        }),
      ],
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      initialValue: false,
      description: 'Enable only when this article should not appear in search results.',
    }),
  ],
})
