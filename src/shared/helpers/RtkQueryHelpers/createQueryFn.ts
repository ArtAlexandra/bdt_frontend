import { getApiError } from '@bdt/shared/helpers/ErrorHelpers';

/**
 * Создает queryFn handler для RTK Query с автоматической обработкой ошибок
 *
 * Оборачивает асинхронную функцию и возвращает результат в формате RTK Query:
 * - При успехе: `{ data: T }`
 * - При ошибке: `{ error: { status: 'CUSTOM_ERROR', data: { message, code }, code, message } }`
 *
 * Формат ошибки сохраняет ваш API формат (code, message) для удобного доступа в компонентах.
 *
 * @example
 * ```ts
 * // Для функций с одним параметром
 * queryFn: createQueryFn(getEvents)
 * queryFn: createQueryFn(getEventById)
 *
 * // Для функций с несколькими параметрами (объект распаковывается)
 * queryFn: createQueryFn(({ id, data }) => updateEvent(id, data))
 * ```
 */
export const createQueryFn = <TArg, TReturn>(fn: (arg: TArg) => Promise<TReturn>) => {
    return async (arg: TArg) => {
        try {
            const response = await fn(arg);
            return { data: response };
        } catch (error) {
            const apiError = getApiError(error);
            return {
                error: {
                    // Обязательные поля для RTK Query
                    status: 'CUSTOM_ERROR' as const,
                    error: apiError.message,
                    // Поля нашего API
                    code: apiError.code,
                    message: apiError.message,
                },
            };
        }
    };
};
