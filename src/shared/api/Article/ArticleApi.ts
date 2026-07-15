import api, { type TPaginated } from '@bdt/shared/helpers/FetchHelpers';

import type { TCreateArticleSchema } from '@bdt/shared/schemas/Article';
import type { TAdminArticlesQueryParams, TArticle } from './ArticleApiTypes';

export const getAdminArticles = (params: TAdminArticlesQueryParams): Promise<TPaginated<TArticle>> => {
    return api.get('/article/all', { params });
};

export const createAdminArticle = (data: TCreateArticleSchema): Promise<TArticle> => {
    return api.post('/article/create', data);
};
