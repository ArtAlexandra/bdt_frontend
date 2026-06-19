import axios, { AxiosError } from 'axios';

import { AuthStorage } from '@bdt/shared/lib/AuthStorage';

import { PUBLIC_API_URL } from '@bdt/shared/config/AppEnvironment';

import type { TApiError } from './ApiResponseTypes';

export const handleError = (error: AxiosError<TApiError>): TApiError['error'] => {
    // Проверяем, есть ли ответ от сервера с данными об ошибке
    if (error.response?.data) {
        const data = error.response.data as unknown as { error?: { message: string; code: number }; message?: string; statusCode?: number };

        if (data?.error) return data.error;

        if (typeof data?.message === 'string') {
            return {
                message: data.message,
                code: typeof data.statusCode === 'number' ? data.statusCode : (error.response?.status ?? 500),
            };
        }

        return {
            message: 'Произошла неизвестная ошибка',
            code: error.response?.status ?? 500,
        };
    }

    // Если нет ответа от сервера, но есть сообщение об ошибке в объекте ошибки
    if (error.message) {
        return {
            message: error.message,
            code: 500,
        };
    }

    // Запасной вариант, если нет никакой информации об ошибке
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
