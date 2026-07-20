import { getUser, logout, type TUser } from '@bdt/shared/api/User';
import { API_TAGS, baseRtkQueryApi, createQueryFn } from '@bdt/shared/helpers/RtkQueryHelpers';
import { AuthStorage } from '@bdt/shared/lib/AuthStorage';

import type { TMessage } from '@bdt/shared/helpers/FetchHelpers';

export const userApi = baseRtkQueryApi.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<TUser, void>({
            providesTags: [API_TAGS.USER],
            queryFn: createQueryFn(getUser),
        }),
        logoutUser: builder.mutation<TMessage, void>({
            queryFn: createQueryFn(() => {
                const token = AuthStorage.getRefreshToken();
                if (!token) throw new Error('No refresh token');
                return logout({ refreshToken: token });
            }),
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetUserQuery,
    useLogoutUserMutation,
} = userApi;
