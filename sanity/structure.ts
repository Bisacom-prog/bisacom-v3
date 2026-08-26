import type {StructureResolver} from 'sanity/structure'

const excludedProjectSlugs = ['cleaning-website', 'abas-pie']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Bisacom Content')
    .items([
      S.listItem()
        .title('Projects')
        .child(
          S.documentList()
            .title('Projects')
            .filter('_type == "project" && !(slug.current in $excludedSlugs)')
            .params({excludedSlugs: excludedProjectSlugs}),
        ),
      S.divider(),
      S.listItem()
        .title('Insights / Blog')
        .child(
          S.list()
            .title('Insights / Blog')
            .items([
              S.listItem()
                .title('All Posts')
                .child(
                  S.documentList()
                    .title('All Posts')
                    .filter('_type == "post"')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
                ),
              S.listItem()
                .title('Featured Posts')
                .child(
                  S.documentList()
                    .title('Featured Posts')
                    .filter('_type == "post" && featured == true')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
                ),
              S.divider(),
              S.documentTypeListItem('blogCategory').title('Categories'),
              S.documentTypeListItem('author').title('Authors'),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Client Reviews')
        .child(
          S.documentList()
            .title('Client Reviews')
            .filter('_type == "review"')
            .defaultOrdering([{field: '_createdAt', direction: 'desc'}]),
        ),
    ])
