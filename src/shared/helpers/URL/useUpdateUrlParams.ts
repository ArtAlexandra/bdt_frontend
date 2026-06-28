'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface IUseUpdateUrlParamsProps {
    params: Record<string, string | string[] | number | null | undefined>;
};

export function useUpdateUrlParams() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return function updateUrlParams({ params }: IUseUpdateUrlParamsProps) {
        const newParams = new URLSearchParams(searchParams?.toString() || '');

        Object.entries(params).forEach(([key, value]) => {
            if (!value) {
                newParams.delete(key);
                return;
            }

            if (Array.isArray(value)) {
                if (value.length === 0) {
                    newParams.delete(key);
                } else {
                    newParams.set(key, value.join(','));
                }
                return;
            }

            const stringValue = String(value);
            if (stringValue === '') {
                newParams.delete(key);
            } else {
                newParams.set(key, stringValue);
            }
        });

        const newUrl = `${pathname}?${newParams.toString()}`;
        router.push(newUrl, { scroll: false });
    };
}
