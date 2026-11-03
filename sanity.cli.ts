import {defineCliConfig} from 'sanity/cli'

// Lets the Sanity CLI (documents, dataset, exec) find this project. Values come from .env.local, like the Studio.
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
})
