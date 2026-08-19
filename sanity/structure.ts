import type {StructureResolver} from 'sanity/structure'

const excludedProjectSlugs = ['cleaning-website', 'abas-pie']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Projects')
        .child(
          S.documentList()
            .title('Projects')
            .filter(
              `_type == "project" && !(slug.current in $excludedSlugs) && !(title in $excludedTitles)`,
            )
            .params({
              excludedSlugs: excludedProjectSlugs,
              excludedTitles: ['Cleaning Website', 'Aba’s Pie', "Aba's Pie"],
            }),
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
