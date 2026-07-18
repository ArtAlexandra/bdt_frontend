import { usePathname } from 'next/navigation';
import { match } from 'path-to-regexp';

export const useIsActivePath = () => {
    const currentPath = usePathname();

    return (paths: string | string[]) => {
        const check = (pattern: string) => {
            const matcher = match(pattern, { decode: decodeURIComponent });
            return matcher(currentPath ?? '') !== false;
        };

        if (Array.isArray(paths)) {
            return paths.some(check);
        }

        return check(paths);
    };
};
