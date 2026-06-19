import { getVKVideo, getVKWall, type TVKVideoQueryParams, type TVKVideoResponse, type TVKWallQueryParams, type TVKWallResponse } from '@bdt/shared/api/VK';
import { API_TAGS, baseRtkQueryApi, createQueryFn } from '@bdt/shared/helpers/RtkQueryHelpers';

export const vkApi = baseRtkQueryApi.injectEndpoints({
    endpoints: (builder) => ({
        getVKWall: builder.query<TVKWallResponse, TVKWallQueryParams>({
            queryFn: createQueryFn(getVKWall),
            providesTags: [API_TAGS.VK],
        }),
        getVKVideo: builder.query<TVKVideoResponse, TVKVideoQueryParams>({
            queryFn: createQueryFn(getVKVideo),
            providesTags: [API_TAGS.VK_VIDEO],
        }),
    }),
});

export const {
    useGetVKWallQuery,
    useGetVKVideoQuery,
    useLazyGetVKVideoQuery,
} = vkApi;
