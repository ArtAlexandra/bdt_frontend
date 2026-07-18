'use client';

import { useState } from 'react';

import { usePagination } from '@bdt/shared/hooks/usePagination';

import { ArticleType } from '@bdt/shared/config/ApiConstants';
import { ROUTES } from '@bdt/shared/config/Routes';

import Alert from '@bdt/shared/ui/Alert';
import Button from '@bdt/shared/ui/Button';
import Input from '@bdt/shared/ui/Input';
import Pagination from '@bdt/shared/ui/Pagination';
import Select from '@bdt/shared/ui/Select';
import Table from '@bdt/shared/ui/Table';

import { useGetAdminArticlesQuery } from '@bdt/entities/Article';

import { sortedOptions } from '../config/SortedOptions';
import { COLUMNS } from '../config/TableSettings';

import type { TAdminArticlesQueryParams } from '@bdt/shared/api/Article';

function PostsList() {
    const { pageSize, currentPage, handleChangePage, getTotalPages } = usePagination();
    const [params, setParams] = useState<TAdminArticlesQueryParams>({ limit: pageSize, page: currentPage, path: ArticleType.POST });

    const { data: response, error, isLoading } = useGetAdminArticlesQuery(params);
    const posts = response?.items ?? [];
    const total = response?.total || 0;
    const totalPages = getTotalPages(total);

    const handleChangeStatus = (value: string) => {
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
                <Select options={sortedOptions} onChange={handleChangeStatus} defaultValue={sortedOptions[0].value} popupMatchSelectWidth={false} />
                <Button className="md:ml-auto mb-4" variant="primary" href={ROUTES.admin.dashboard.posts.create.path}>Создать</Button>
            </div>

            <Table data={posts} columns={COLUMNS} loading={isLoading} className="mb-4" />
            <Pagination align="end" onChangePage={handleChangePage} pageSize={totalPages} currentPage={currentPage} />
        </>
    );
}

export default PostsList;
