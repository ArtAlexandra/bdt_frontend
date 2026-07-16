import { useCallback, useState } from 'react';

export function usePagination(initialPageSize = 25) {
    const [pageSize, setPageSize] = useState<number>(initialPageSize);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const handleChangePage = useCallback((page: number, nextPageSize?: number) => {
        setCurrentPage(page);
        if (nextPageSize) setPageSize(nextPageSize);
    }, []);

    const getTotalPages = useCallback((total: number | undefined) => {
        if (!total || total <= 0) return 1;
        return Math.max(1, Math.ceil(total / pageSize));
    }, [pageSize]);

    return { pageSize, currentPage, handleChangePage, getTotalPages } as const;
}
