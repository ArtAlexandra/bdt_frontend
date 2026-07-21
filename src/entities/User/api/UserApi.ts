import { getUser, type TUser } from '@bdt/shared/api/User';
import { editUser } from '@bdt/shared/api/User/UserApi';
import { API_TAGS, baseRtkQueryApi, createQueryFn } from '@bdt/shared/helpers/RtkQueryHelpers';

import type { TEditUserSchema } from '@bdt/shared/schemas/User';

export const userApi = baseRtkQueryApi.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<TUser, void>({
            providesTags: [API_TAGS.USER],
            queryFn: createQueryFn(getUser),
        }),
        editUser: builder.mutation<TUser, { id: string, data: TEditUserSchema }>({
            invalidatesTags: (_result, _error, { id }) => [{ type: API_TAGS.USER, id }],
            queryFn: createQueryFn(({ id, data }) => editUser(id, data)),
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetUserQuery,
    useEditUserMutation,
} = userApi;
