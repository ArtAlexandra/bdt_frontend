import { ArticleStatus, ArticleType } from '@bdt/shared/config/ApiConstants';

import type { TUser } from '@bdt/shared/api/User';

export type TArticle = {
    id: string;
    title: string;
    slug: string;
    description?: string;
    seoTitle?: string;
    image?: string;
    content?: string;
    tags: string[];
    path: ArticleType;
    status: ArticleStatus;
    authorId: string;
    author: TUser;
    publishedAt?: string;
    createdAt: string;
    updatedAt: string;
};

export type TAdminArticlesQueryParams = {
    page: number;
    limit: number;
    path?: ArticleType;
    status?: ArticleStatus,
    search?: string;
    email?: string;
}

export type TPublicArticlesQueryParams = {
    path: ArticleType;
    page: number;
    limit: number;
    tags?: string;
}
