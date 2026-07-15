import { z } from 'zod';

import { ArticleType } from '@bdt/shared/config/ApiConstants';

export const createArticleSchema = z.object({
    title: z.string().min(1, 'Заголовок обязателен').max(150, 'Заголовок не может превышать 150 символов'),
    slug: z.string().optional(),
    seoTitle: z.string().optional(),
    publishedAt: z.date().nullable().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    path: z.enum([ArticleType.ARTICLE, ArticleType.INSTRUCTION, ArticleType.POST]),
    tags: z.string().optional(),
    content: z.string().optional(),
});

export type TCreateArticleSchema = z.infer<typeof createArticleSchema>;
