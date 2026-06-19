/**
 * Базовый reducer path для централизованного RTK Query API
 */
export const BASE_REDUCER_PATH = 'api' as const;

/**
 * Все доступные tag types для RTK Query cache invalidation
 *
 * Используется для централизованного управления тегами кэша
 */
export const API_TAGS = {
    //VK
    VK: 'VK',
    VK_VIDEO: 'VK_VIDEO',
} as const;
