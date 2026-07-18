import { ArticleStatus, ArticleType } from '@bdt/shared/config/ApiConstants';

import type { TUser } from '@bdt/shared/api/User';

export type TArticle = {
    id: string;
    title: string;
    slug: string;
    images: string[];
    content?: string;
    path: ArticleType;
    status: ArticleStatus;
    authorId: string;
    author: TUser;
    publishedAt?: string;
    isPinned: boolean;
    createdAt: string;
    updatedAt: string;
};

export type TAdminArticlesQueryParams = {
    page: number;
    limit: number;
    path?: ArticleType;
    status?: string,
    search?: string;
}

export type TPublicArticlesQueryParams = {
    path: ArticleType;
    page: number;
    limit: number;
}
