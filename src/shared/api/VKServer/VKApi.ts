import { fetchPublicVKApi } from '@bdt/shared/helpers/ServerHelpers';

import { BDT_VK_DOMAIN, VK_SERVICE_KEY, VK_VERSION } from '@bdt/shared/config/AppEnvironment';

import type { TVKWallQueryParams, TVKWallResponse } from './VKApiTypes';

//https://dev.vk.com/ru/method/wall.getById
export async function getVKWallServer(params: TVKWallQueryParams): Promise<TVKWallResponse | null> {
    const fullParams = {
        ...params,
        domain: BDT_VK_DOMAIN,
        access_token: VK_SERVICE_KEY,
        v: VK_VERSION
    };

    const cached = await fetchPublicVKApi<TVKWallResponse>('/wall.get', {
        params: fullParams,
        next: { revalidate: 3600 },
        cache: 'force-cache',
    });

    if (cached) return cached;

    return (await fetchPublicVKApi<TVKWallResponse>('/wall.get', { params: fullParams }) || null);
};
