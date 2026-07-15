import { createAdminArticle, getAdminArticles, type TAdminArticlesQueryParams, type TArticle } from '@bdt/shared/api/Article';
import { API_TAGS, baseRtkQueryApi, createQueryFn } from '@bdt/shared/helpers/RtkQueryHelpers';

import type { TPaginated } from '@bdt/shared/helpers/FetchHelpers';
import type { TCreateArticleSchema } from '@bdt/shared/schemas/Article';

export const articleApi = baseRtkQueryApi.injectEndpoints({
    endpoints: (builder) => ({
        getAdminArticles: builder.query<TPaginated<TArticle>, TAdminArticlesQueryParams>({
            providesTags: [API_TAGS.ARTICLE],
            queryFn: createQueryFn(getAdminArticles),
        }),
        createAdminArticle: builder.mutation<TArticle, TCreateArticleSchema>({
            invalidatesTags: [API_TAGS.ARTICLE],
            queryFn: createQueryFn(createAdminArticle),
        }),

    }),
    overrideExisting: true,
});

export const { useCreateAdminArticleMutation, useGetAdminArticlesQuery } = articleApi;
