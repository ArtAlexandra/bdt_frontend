'use client';


import { usePagination } from '@bdt/shared/hooks/usePagination';

import { ArticleType } from '@bdt/shared/config/ApiConstants';

import Alert from '@bdt/shared/ui/Alert';
import Pagination from '@bdt/shared/ui/Pagination';
import Table from '@bdt/shared/ui/Table';

import { useGetAdminArticlesQuery } from '@bdt/entities/Article';

import { COLUMNS } from '../config/TableSettings';

function PostsList() {
    const { pageSize, currentPage, handleChangePage, getTotalPages } = usePagination();
    const { data: response, error, isLoading } = useGetAdminArticlesQuery({ page: currentPage, limit: pageSize, path: ArticleType.POST });
    const posts = response?.items ?? [];
    const total = response?.total || 0;
    const totalPages = getTotalPages(total);

    return (
        <>
            { error && <Alert className="mb-4" error={error} type="error" /> }
            <Table data={posts} columns={COLUMNS} loading={isLoading} className="mb-4" />
            <Pagination align="end" onChangePage={handleChangePage} pageSize={totalPages} currentPage={currentPage} />
        </>
    );
}

export default PostsList;
