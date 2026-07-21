import { createAdminArticle, getAdminArticleById, getAdminArticles, removeAdminArticleById, type TAdminArticlesQueryParams, type TArticle, updateAdminArticleById, updateAdminArticleStatusById } from '@bdt/shared/api/Article';
import { API_TAGS, baseRtkQueryApi, createQueryFn } from '@bdt/shared/helpers/RtkQueryHelpers';

import { ArticleStatus } from '@bdt/shared/config/ApiConstants';

import type { TMessage, TPaginated } from '@bdt/shared/helpers/FetchHelpers';
import type { TCreateArticleSchema, TUpdateArticleSchema } from '@bdt/shared/schemas/Article';

export const articleApi = baseRtkQueryApi.injectEndpoints({
    endpoints: (builder) => ({
        getAdminArticles: builder.query<TPaginated<TArticle>, TAdminArticlesQueryParams>({
            providesTags: [API_TAGS.ARTICLE],
            queryFn: createQueryFn(getAdminArticles),
        }),
        getAdminArticleById: builder.query<TArticle, string>({
            providesTags: [API_TAGS.ARTICLE],
            queryFn: createQueryFn(getAdminArticleById),
        }),
        createAdminArticle: builder.mutation<TArticle, TCreateArticleSchema>({
            invalidatesTags: [API_TAGS.ARTICLE],
            queryFn: createQueryFn(createAdminArticle),
        }),
        updateAdminArticleById: builder.mutation<TArticle, { id: string, data: TUpdateArticleSchema }>({
            invalidatesTags: [API_TAGS.ARTICLE],
            queryFn: createQueryFn(({ id, data }) => updateAdminArticleById(id, data)),
        }),
        updateAdminArticleStatusById: builder.mutation<TArticle, { id: string, data: { status: ArticleStatus } }>({
            invalidatesTags: (_result, _error, { id }) => [{ type: API_TAGS.ARTICLE, id }],
            queryFn: createQueryFn(({ id, data }) => updateAdminArticleStatusById(id, data)),
        }),
        removeAdminArticleById: builder.mutation<TMessage, string>({
            invalidatesTags: [API_TAGS.ARTICLE],
            queryFn: createQueryFn(removeAdminArticleById),

        }),
    }),
    overrideExisting: true,
});

export const {
    useCreateAdminArticleMutation,
    useGetAdminArticleByIdQuery,
    useGetAdminArticlesQuery,
    useUpdateAdminArticleByIdMutation,
    useUpdateAdminArticleStatusByIdMutation,
    useRemoveAdminArticleByIdMutation,
} = articleApi;
