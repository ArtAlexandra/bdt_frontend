import { deleteUser, editUser, getUser, getUsers, type TUser } from '@bdt/shared/api/User';
import { API_TAGS, baseRtkQueryApi, createQueryFn } from '@bdt/shared/helpers/RtkQueryHelpers';

import type { TMessage } from '@bdt/shared/helpers/FetchHelpers';
import type { TEditUserSchema } from '@bdt/shared/schemas/User';

export const userApi = baseRtkQueryApi.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<TUser, void>({
            providesTags: [API_TAGS.USER],
            queryFn: createQueryFn(getUser),
        }),
        editUser: builder.mutation<TUser, { id: string, data: TEditUserSchema }>({
            invalidatesTags: [API_TAGS.USER],
            queryFn: createQueryFn(({ id, data }) => editUser(id, data)),
        }),
        getUsers: builder.query<TUser[], void>({
            providesTags: [API_TAGS.USER],
            queryFn: createQueryFn(getUsers),
        }),
        deleteUser: builder.mutation<TMessage, { id: string }>({
            invalidatesTags: [API_TAGS.USER],
            queryFn: createQueryFn(({ id }) => deleteUser(id)),
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetUserQuery,
    useEditUserMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
} = userApi;
