import {projectSchemaTypes} from './project'
import {review} from './review'
import {post} from './post'
import {author} from './author'
import {blogCategory} from './blogCategory'
import {seo} from './seo'

export const schemaTypes = [
  ...projectSchemaTypes,
  review,
  seo,
  author,
  blogCategory,
  post,
]
