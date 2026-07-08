import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './schemaTypes'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export const sanityConfig = defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: schema,
})
