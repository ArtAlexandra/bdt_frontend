import { fetchPublicApi } from '@bdt/shared/helpers/ServerHelpers';

import type { TArticle } from '@bdt/shared/api/Article';
import type { TPaginated } from '@bdt/shared/helpers/FetchHelpers';
import type { TPublicArticleQueryParams } from './ArticleApiTypes';

export async function getPublicArticleServer(params: TPublicArticleQueryParams): Promise<TPaginated<TArticle> | null> {
    const cached = await fetchPublicApi<TPaginated<TArticle>>('/article/all-public', {
        params,
        next: { revalidate: 3600 },
        cache: 'force-cache',
    });

    if (cached) return cached;

    return fetchPublicApi<TPaginated<TArticle>>('/article/all-public', { params });
};

export async function getPublicArticleByIdServer(id: string): Promise<TArticle | null> {
    const cached = await fetchPublicApi<TArticle>(`/article/public/${id}`, {
        next: { revalidate: 3600 },
        cache: 'force-cache',
    });

    if (cached) return cached;

    return fetchPublicApi<TArticle>(`/article/public/${id}`);
};
