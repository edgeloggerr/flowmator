import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().min(10, 'Title must be at least 10 characters'),
    description: z.string().min(30, 'Description must be at least 30 characters for SEO'),
    excerpt: z.string().min(20, 'Excerpt must be at least 20 characters'),
    publishedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
    updatedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD').optional(),
    author: z.string().default('Flowmator Editorial Team'),
    category: z.enum([
      'Google Flow AI',
      'Prompt Automation',
      'AI Storyboarding',
      'Creator Productivity',
      'Technical Guides'
    ]),
    tags: z.array(z.string()).min(1, 'Provide at least one tag'),
    coverImage: z.string().optional().default('/icons/icon128.png'),
    coverImageAlt: z.string().optional().default('Flowmator AI workflow illustration'),
    draft: z.boolean().default(false),
    readingTime: z.number().int().positive().default(5),
    featured: z.boolean().default(false),
    relatedSlugs: z.array(z.string()).optional().default([]),
    series: z.string().optional()
  })
});

export const collections = { blog };
