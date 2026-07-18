import api, { type TMessage, type TPaginated } from '@bdt/shared/helpers/FetchHelpers';

import { ArticleStatus } from '@bdt/shared/config/ApiConstants';

import type { TCreateArticleSchema, TUpdateArticleSchema } from '@bdt/shared/schemas/Article';
import type { TAdminArticlesQueryParams, TArticle } from './ArticleApiTypes';

export const getAdminArticles = (params: TAdminArticlesQueryParams): Promise<TPaginated<TArticle>> => {
    return api.get('/article/all', { params });
};

export const getAdminArticleById = (id: string): Promise<TArticle> => {
    return api.get(`/article/${id}`);
};

export const createAdminArticle = (data: TCreateArticleSchema): Promise<TArticle> => {
    return api.post('/article/create', data);
};

export const updateAdminArticleById = (id: string, data: TUpdateArticleSchema): Promise<TArticle> => {
    return api.put(`/article/${id}`, data);
};

export const removeAdminArticleById = (id: string): Promise<TMessage> => {
    return api.delete(`/article/${id}`);
};

export const updateAdminArticleStatusById = (id: string, data: { status: ArticleStatus }): Promise<TArticle> => {
    return api.put(`/article/${id}`, data);
};
