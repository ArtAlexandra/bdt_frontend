import { addImageGallery, getImagesGallery, removeImageGallery } from '@bdt/shared/api/User';
import { API_TAGS, baseRtkQueryApi, createQueryFn } from '@bdt/shared/helpers/RtkQueryHelpers';

import type { TFile } from '@bdt/shared/config/FileType';
import type { TMessage } from '@bdt/shared/helpers/FetchHelpers';

export const userGalleryApi = baseRtkQueryApi.injectEndpoints({
    endpoints: (builder) => ({
        addImageGallery: builder.mutation<TFile, FormData>({
            invalidatesTags: [API_TAGS.USER_GALLERY],
            queryFn: createQueryFn(addImageGallery),
        }),
        removeImageGallery: builder.mutation<TMessage, string>({
            invalidatesTags: [API_TAGS.USER_GALLERY],
            queryFn: createQueryFn(removeImageGallery),
        }),
        getImagesGallery: builder.query<TFile[], void>({
            providesTags: [API_TAGS.USER_GALLERY],
            queryFn: createQueryFn(getImagesGallery),
        }),
    }),
    overrideExisting: true,
});

export const {
    useAddImageGalleryMutation,
    useGetImagesGalleryQuery,
    useRemoveImageGalleryMutation,
} = userGalleryApi;
