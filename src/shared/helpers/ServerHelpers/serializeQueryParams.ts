export const serializeQueryParams = (params: Record<string, (string | number | boolean | Date | undefined | string[])>): string => {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (!value || value === '') return;

        if (Array.isArray(value)) {
            value.forEach(item => {
                if (!!item && item !== '') {
                    searchParams.append(key, String(item));
                }
            });
        }
        if (value instanceof Date) {
            searchParams.append(key, value.toISOString());
        }
        if (typeof value === 'boolean' || typeof value === 'number' || typeof value === 'string') {
            searchParams.append(key, String(value));
        }
    });

    return searchParams.toString();
};
