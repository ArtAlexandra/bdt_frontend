import { login, register, type TAuthResponse, type TLogin, type TRegister } from '@bdt/shared/api/Auth';
import { API_TAGS, baseRtkQueryApi, createQueryFn } from '@bdt/shared/helpers/RtkQueryHelpers';

export const authApi = baseRtkQueryApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<TAuthResponse, TLogin>({
            invalidatesTags: [API_TAGS.AUTH],
            queryFn: createQueryFn(login),
        }),
        register: builder.mutation<TAuthResponse, TRegister>({
            invalidatesTags: [API_TAGS.AUTH],
            queryFn: createQueryFn(register),
        }),

    }),
    overrideExisting: true,
});

export const { useLoginMutation, useRegisterMutation, } = authApi;
