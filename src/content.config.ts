import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string(),
    author: z.string().default('FlowForm Engineering Team'),
    category: z.string(),
    tags: z.array(z.string()),
    canonicalUrl: z.string().optional(),
    ogImage: z.string().optional(),
  }),
});

export const collections = { blog };
