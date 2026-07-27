import { PUBLIC_API_URL } from '@bdt/shared/config/AppEnvironment';

import { serializeQueryParams } from './serializeQueryParams';

import type { TApiResponse } from '@bdt/shared/helpers/FetchHelpers';

interface IFetchPublicApiOptions extends RequestInit {
    params?: Record<string, (string | number | boolean | Date | undefined | string[])>;
}

export async function fetchPublicApi<T = unknown>(path: string, init?: IFetchPublicApiOptions): Promise<T | null> {
    try {
        const { params, ...fetchOptions } = init || {};

        let url = `${PUBLIC_API_URL}${path}`;
        if (params && Object.keys(params).length > 0) {
            const queryString = serializeQueryParams(params);
            if (queryString) url += `?${queryString}`;
        }

        const response = await fetch(url, {
            cache: 'no-store',
            ...(fetchOptions),
        });

        if (!response.ok) return null;

        const json = await response.json() as TApiResponse<T>;

        if (!json || !json.success) return null;

        return json.data;
    } catch {
        return null;
    }
}
