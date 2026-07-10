import axios, { AxiosError } from 'axios';

import { AuthStorage } from '@bdt/shared/lib/AuthStorage';

import { PUBLIC_API_URL } from '@bdt/shared/config/AppEnvironment';

import type { TApiError } from './ApiResponseTypes';

export const handleError = (error: AxiosError<TApiError>): TApiError['error'] => {
    if (error.response?.data) {
        const data = error.response.data as unknown as {
            statusCode?: number;
            message?: string | string[];
            error?: string;
        };

        if (data.statusCode && data.message) {
            const message = Array.isArray(data.message)
                ? data.message.join(', ')
                : data.message;

            return {
                message: message || 'Произошла ошибка',
                code: data.statusCode || error.response?.status || 500,
            };
        }

        if (data.error && typeof data.error === 'string') {
            return {
                message: data.error,
                code: error.response?.status || 500,
            };
        }
    }

    if (error.message) {
        return {
            message: error.message,
            code: error.response?.status || 500,
        };
    }

    return {
        message: 'Произошла неизвестная ошибка',
        code: 500,
    };
};

export const refreshToken = async (): Promise<string | null> => {
    try {
        const refreshToken = AuthStorage.getRefreshToken();

        if (!refreshToken) return null;

        const { data } = await axios.post<{ data: { accessToken: string; } }>(`${PUBLIC_API_URL}/auth/refresh-token`, { refreshToken });

        const newAccessToken = data.data.accessToken;

        AuthStorage.setToken(newAccessToken);

        return newAccessToken;
    } catch (error) {
        console.error('Failed to refresh token:', error);

        return null;
    }
};
