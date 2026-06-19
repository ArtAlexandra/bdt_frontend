import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { TApiError } from './FetchHelpers';

export type TError = string | Error | FetchBaseQueryError | SerializedError | undefined;

const DEFAULT_ERROR_MESSAGE = 'Произошла неизвестная ошибка';

export const getErrorMessage = (error: TError | unknown) => {
    if (!error) return DEFAULT_ERROR_MESSAGE;

    if (typeof error === 'string') return error;

    if (typeof error === 'object' && 'message' in error) return error.message as string || DEFAULT_ERROR_MESSAGE;

    if (error instanceof Error) return error.message;

    return DEFAULT_ERROR_MESSAGE;
};

function isTApiError(error: unknown): error is TApiError['error'] {
    if (!error || typeof error !== 'object') return false;
    if (!('message' in error) || !('code' in error)) return false;

    return (typeof error.message === 'string');
}

export const getApiError = (error: unknown): TApiError['error'] => {
    if (isTApiError(error)) return error;

    return {
        message: getErrorMessage(error),
        code: 500,
    };
};

export const getApiErrorMessage = (error: unknown): string => {
    if (isTApiError(error)) return error.message;

    return getErrorMessage(error);
};
