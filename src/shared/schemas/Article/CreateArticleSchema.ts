import { z } from 'zod';

import { ArticleType } from '@bdt/shared/config/ApiConstants';

export const createArticleSchema = z.object({
    title: z.string().min(1, 'Заголовок обязателен').max(150, 'Заголовок не может превышать 150 символов'),
    slug: z.string().optional(),
    images: z.array(z.string()).optional(),
    path: z.enum([ArticleType.ARTICLE, ArticleType.INSTRUCTION, ArticleType.POST]),
    content: z.string().optional(),
    publishedAt: z.date().nullable().optional(),
});

export type TCreateArticleSchema = z.infer<typeof createArticleSchema>;
