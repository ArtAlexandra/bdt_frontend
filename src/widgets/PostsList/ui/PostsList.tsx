'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { useUpdateUrlParams } from '@bdt/shared/helpers/URL';
import { usePagination } from '@bdt/shared/hooks/usePagination';

import { ArticleStatus, ArticleType } from '@bdt/shared/config/ApiConstants';
import { ROUTES } from '@bdt/shared/config/Routes';

import Alert from '@bdt/shared/ui/Alert';
import Button from '@bdt/shared/ui/Button';
import Input from '@bdt/shared/ui/Input';
import Pagination from '@bdt/shared/ui/Pagination';
import Select from '@bdt/shared/ui/Select';
import Table from '@bdt/shared/ui/Table';

import { useGetAdminArticlesQuery } from '@bdt/entities/Article';

import { sortedOptions } from '../config/SortedOptions';
import { getPostColumns } from '../config/TableSettings';

import type { TAdminArticlesQueryParams } from '@bdt/shared/api/Article';

interface IPostsListProps {
    path: ArticleType;
};

function PostsList({ path }: IPostsListProps) {
    const searchParams = useSearchParams();
    const statusParams = searchParams?.get('status');
    const status = statusParams ? statusParams as ArticleStatus : undefined;
    const updateUrlParams = useUpdateUrlParams();
    const { pageSize, currentPage, handleChangePage, getTotalPages } = usePagination();
    const [params, setParams] = useState<TAdminArticlesQueryParams>({ limit: pageSize, page: currentPage, path, ...{ status } });

    const { data: response, error, isLoading } = useGetAdminArticlesQuery(params);
    const posts = response?.items ?? [];
    const total = response?.total || 0;
    const totalPages = getTotalPages(total);

    const hrefCreatePost = path === ArticleType.POST ? ROUTES.admin.dashboard.posts.create.path : ROUTES.admin.dashboard.articles.create.path;
    const columns = getPostColumns(path);

    const handleChangeStatus = (value: string) => {
        updateUrlParams({ params: { status: value } });

        setParams((prev) => {
            const newParams = { ...prev };
            newParams.page = 1;
            if (value === '') {
                delete newParams.status;
            } else {
                newParams.status = value;
            }
            return newParams;
        });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setParams((prev) => {
            const newParams = { ...prev };
            newParams.page = 1;
            if (value === '') {
                delete newParams.search;
            } else {
                newParams.search = value;
            }
            return newParams;
        });
    };

    return (
        <>
            { error && <Alert className="mb-4" error={error} type="error" /> }

            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <Input placeholder="Поиск по названию" onChange={handleSearchChange} iconName="search" />
                <Select options={sortedOptions} onChange={handleChangeStatus} defaultValue={status ?? sortedOptions[0].value} popupMatchSelectWidth={false} />
                <Button className="md:ml-auto mb-4" variant="primary" href={hrefCreatePost}>Создать</Button>
            </div>

            <Table data={posts} columns={columns} loading={isLoading} className="mb-4" />
            <Pagination align="end" onChangePage={handleChangePage} pageSize={totalPages} currentPage={currentPage} />
        </>
    );
}

export default PostsList;
