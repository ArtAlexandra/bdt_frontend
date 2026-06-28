'use client';

import { memo } from 'react';

import { useUpdateUrlParams } from '@bdt/shared/helpers/URL';

import Pagination from '@bdt/shared/ui/Pagination';

import PostMediaViewer from '@bdt/features/PostMediaViewer';

import PublicHeader from '@bdt/widgets/PublicHeader';

import style from './NewsPage.module.scss';

import type { TPost } from '@bdt/entities/VK';

interface INewsPageProps {
    posts: TPost[];
    currentPage?: number;
    totalPages?: number;
};

function NewsPage({ posts, currentPage = 1, totalPages = 0 }: INewsPageProps) {
    const updateUrlParams = useUpdateUrlParams();

    const handlePageSize = (page: number) => {
        updateUrlParams({
            params: { page }
        });
    };

    return (
        <div className={style.newsPage}>
            <PublicHeader variant="black" />
            <div className={style.newsPage__content}>

                <h1 className={style.newsPage__title}>Новости</h1>

                <div className={style.newsPage__list}>
                    { posts.map((post, index) => {
                        const isTextFirst = index % 2 === 0;
                        return (
                            <PostMediaViewer post={post} key={`vk_post_${index}`} id={`post-${post.id}`} isTextFirst={isTextFirst} className={style['newsPage__list-card']} />
                        );
                    }) }
                </div>

                <Pagination currentPage={currentPage} onChangePage={handlePageSize} pageSize={posts.length} totalPages={totalPages} showSizeChanger={false} />
            </div>
        </div>
    );
}

export default memo(NewsPage);
