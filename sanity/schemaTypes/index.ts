import {projectSchemaTypes} from './project'
import {review} from './review'

// Register the project document and every reusable object type it references.
// This includes caseStudyImage, featureFlow, edgeCase and the Validation fields.
export const schemaTypes = [...projectSchemaTypes, review]
