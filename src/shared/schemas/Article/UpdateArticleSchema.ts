import { z } from 'zod';

import { ArticleStatus } from '@bdt/shared/config/ApiConstants';

export const updateArticleSchema = z.object({
    title: z.string().min(1, 'Заголовок обязателен').max(150, 'Заголовок не может превышать 150 символов'),
    slug: z.string().optional(),
    images: z.array(z.string()).optional(),
    status: z.enum([ArticleStatus.ARCHIVED, ArticleStatus.DRAFT, ArticleStatus.PUBLISHED]).optional(),
    isPinned: z.boolean().optional(),
    content: z.string().nullable().optional(),
    publishedAt: z.date().nullable().optional(),
});

export type TUpdateArticleSchema = z.infer<typeof updateArticleSchema>;
