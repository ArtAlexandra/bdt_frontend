import ReactHotToast from 'react-hot-toast';

import { getApiErrorMessage } from '@bdt/shared/helpers/ErrorHelpers';

import Icon from '@bdt/shared/ui/Icon';

type TToastOptions<T> = {
    loading?: string;
    success?: string | ((data: T) => string);
    error?: string | ((error: unknown) => string);
    duration?: number;
};

type TToastMessage = Parameters<typeof ReactHotToast.custom>[0];

export function notifyPromise<T extends object | void>(promise: Promise<T>, options: TToastOptions<T> = {}) {
    const toastOptions = {
        ...options,
        loading: options.loading || 'Загрузка...',
        success: options.success || 'Операция прошла успешно',
        error: options.error || getApiErrorMessage,
    };

    return ReactHotToast.promise(promise, toastOptions);
}

export function notifySuccess(message: string, duration?: number) {
    return ReactHotToast.success(message, { duration });
}

export function notifyInfo(message: TToastMessage, duration?: number) {
    return ReactHotToast(message, { duration });
}

export function notifyWarning(message: TToastMessage, duration?: number) {
    return ReactHotToast(message, {
        duration,
        icon: <Icon name="error" className="text-color-warning text-lg" />,
    });
}

export function notifyError(message: string | unknown, duration?: number) {
    return ReactHotToast.error(getApiErrorMessage(message), { duration });
}

export function notifyCustomError(message: TToastMessage, duration?: number) {
    return ReactHotToast.error(message, { duration });
}
