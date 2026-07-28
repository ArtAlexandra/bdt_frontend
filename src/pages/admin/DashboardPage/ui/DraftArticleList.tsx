'use client';

import { ArticleStatus, ArticleType } from '@bdt/shared/config/ApiConstants';
import { ROUTES } from '@bdt/shared/config/Routes';

import Button from '@bdt/shared/ui/Button';

import { Card, useGetAdminArticlesQuery } from '@bdt/entities/Article';

import style from './DraftPostList.module.scss';

function DraftArticleList() {
    const { data: response } = useGetAdminArticlesQuery({ limit: 6, page: 1, path: ArticleType.ARTICLE, status: ArticleStatus.DRAFT });
    const posts = response?.items || [];
    const manyDraftPosts = `${ROUTES.admin.dashboard.articles.index.path}?status=${ArticleStatus.DRAFT}`;

    if (posts.length === 0) return;

    return (
        <div className={style.draftPostList}>
            <h2 className={style.draftPostList__title}>Черновики статей</h2>

            <div className={style.draftPostList__content}>
                { posts.map((post, index) => {
                    const href = ROUTES.admin.dashboard.articles.edit.generatePath(post.id);

                    return <Card post={post} key={`article_draft_${index}`} href={href} />;
                }) }
            </div>

            { response?.hasMore && <Button variant="secondaryOutline" href={manyDraftPosts}>Больше</Button> }
        </div>
    );
}

export default DraftArticleList;
