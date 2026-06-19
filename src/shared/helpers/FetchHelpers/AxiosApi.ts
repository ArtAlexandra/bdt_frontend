import axios, { AxiosError, AxiosHeaders, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { AuthStorage } from '@bdt/shared/lib/AuthStorage';

import { PUBLIC_API_URL } from '@bdt/shared/config/AppEnvironment';

import { handleError, refreshToken } from './AxiosApiHelpers';

import type { TApiError, TApiSuccess } from './ApiResponseTypes';

// Создаем экземпляр Axios
const api: AxiosInstance = axios.create({ baseURL: PUBLIC_API_URL, withCredentials: true });

let isRefreshing = false;
let failedQueue: Array<{ resolve: (value?: unknown) => void; reject: (reason?: unknown) => void }> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) return reject(error);

        resolve(token);
    });

    failedQueue = [];
};

// Интерцептор для добавления токена авторизации
api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        // Однозначность: всегда работаем с AxiosHeaders, чтобы .set() был доступен
        config.headers = new AxiosHeaders(config.headers);

        const token = AuthStorage.getToken();

        if (token) {
            config.headers.set('Authorization', `Bearer ${token}`);
        }

        return config;
    }, (error: AxiosError<TApiError>) => {
        return Promise.reject(handleError(error));
    },
);

// Интерцептор для обработки ошибок и возврата только data
api.interceptors.response.use(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (response: AxiosResponse<TApiSuccess<any>['data']>) => {
        // Возвращаем только data из ответа
        return response.data.data;
    }, async (error: AxiosError<TApiError>) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token: unknown) => {
                        if (typeof token === 'string') {
                            originalRequest.headers = new AxiosHeaders(originalRequest.headers);
                            originalRequest.headers.set('Authorization', `Bearer ${token}`);
                            return api(originalRequest);
                        }

                        return Promise.reject(new Error('Invalid token type'));
                    })
                    .catch((err: unknown) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const newAccessToken = await refreshToken();

                if (!newAccessToken) {
                    AuthStorage.clear();
                    return Promise.reject(new Error('Invalid refresh token'));
                }

                originalRequest.headers = new AxiosHeaders(originalRequest.headers);
                originalRequest.headers.set('Authorization', `Bearer ${newAccessToken}`);
                processQueue(null, newAccessToken);

                return api(originalRequest);
            } catch (refreshError) {
                AuthStorage.clear();
                return Promise.reject(new Error('Invalid refresh token', { cause: refreshError }));
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(handleError(error));
    },
);

export default api;
