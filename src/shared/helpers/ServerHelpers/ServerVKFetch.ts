import { VK_API_PUBLIC_URL } from '@bdt/shared/config/AppEnvironment';

import { serializeQueryParams } from './serializeQueryParams';

interface IFetchPublicApiOptions extends RequestInit {
    params?: Record<string, (string | number | boolean | Date | undefined | string[])>;
};

export async function fetchPublicVKApi<T = unknown>(path: string, init?: IFetchPublicApiOptions): Promise<T | null> {
    try {
        const { params, ...fetchOptions } = init || {};

        let url = `${VK_API_PUBLIC_URL}${path}`;
        if (params && Object.keys(params).length > 0) {
            const queryString = serializeQueryParams(params);
            if (queryString) url += `?${queryString}`;
        }

        const response = await fetch(url, {
            cache: 'no-store',
            ...(fetchOptions),
        });

        if (!response.ok) return null;

        const json = await response.json();

        if (!json || !json.response) return null;

        return json;
    } catch {
        return null;
    }
}
