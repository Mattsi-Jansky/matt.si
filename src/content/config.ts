import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      description: z.string(),
      img: image().optional(),
      imgCaption: z.string().optional(),
      imgCaptionLink: z.string().url().optional(),
      tags: z.array(z.string()),
      canonicalLink: z.string().url().optional(),
    }),
});

export const collections = { blog };
