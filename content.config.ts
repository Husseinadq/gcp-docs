import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      type: 'page',
      source: {
        include: '**/*.md',
        cwd: 'content',
        prefix: '/docs'
      },
      schema: z.object({
        order: z.number().default(0),
        docType: z.enum(['tutorial', 'how-to', 'explanation', 'reference', 'service-hub']).optional(),
        category: z.string().optional(),
        goal: z.string().optional(),
        product: z.string().optional(),
        summary: z.string().optional(),
        difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
        estimatedTime: z.string().optional(),
        bestFor: z.array(z.string()).default([]),
        prerequisites: z.array(z.string()).default([]),
        tags: z.array(z.string()).default([]),
        related: z.array(z.string()).default([]),
        awsEquivalent: z.string().optional(),
        azureEquivalent: z.string().optional(),
        lastReviewed: z.string().optional(),
        icon: z.string().optional()
      })
    })
  }
})
