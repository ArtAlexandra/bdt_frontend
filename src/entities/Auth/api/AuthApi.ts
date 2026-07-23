import { login, logout, register, type TAuthResponse, type TLogin, type TRegister } from '@bdt/shared/api/Auth';
import { API_TAGS, baseRtkQueryApi, createQueryFn } from '@bdt/shared/helpers/RtkQueryHelpers';
import { AuthStorage } from '@bdt/shared/lib/AuthStorage';

import type { TMessage } from '@bdt/shared/helpers/FetchHelpers';

export const authApi = baseRtkQueryApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<TAuthResponse, TLogin>({
            invalidatesTags: [API_TAGS.AUTH],
            queryFn: createQueryFn(login),
        }),
        register: builder.mutation<TAuthResponse, TRegister>({
            invalidatesTags: [API_TAGS.AUTH, API_TAGS.USER],
            queryFn: createQueryFn(register),
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

export const { useLoginMutation, useRegisterMutation, useLogoutUserMutation, } = authApi;
