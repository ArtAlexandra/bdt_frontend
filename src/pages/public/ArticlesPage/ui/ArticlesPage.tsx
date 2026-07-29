'use client';

import { useUpdateUrlParams } from '@bdt/shared/helpers/URL';

import { ROUTES } from '@bdt/shared/config/Routes';

import Button from '@bdt/shared/ui/Button';
import Icon from '@bdt/shared/ui/Icon';
import Pagination from '@bdt/shared/ui/Pagination';

import { Card } from '@bdt/features/Article';

import style from './ArticlesPage.module.scss';

import type { TArticle } from '@bdt/shared/api/Article';

interface IArticlesPageProps {
    articles: TArticle[];
    currentPage?: number;
    totalPages?: number;
};

function ArticlesPage({ articles, currentPage = 1, totalPages = 0 }: IArticlesPageProps) {
    const updateUrlParams = useUpdateUrlParams();

    const handlePageSize = (page: number) => {
        updateUrlParams({
            params: { page },
            scroll: true
        });
    };

    if (articles.length === 0) {
        return (
            <div className={style.articlesPage__empty}>
                <Icon name="emptyBox" className={style['articlesPage__empty-icon']} />
                <h3 className={style['articlesPage__empty-title']}>Пока нет статей</h3>
                <div className={style['articlesPage__empty-description']}>
                    Здесь будут появляться статьи по мере их добавления.
                    Следите за обновлениями!
                </div>
                <Button variant="primary" href={ROUTES.public.home.path}>На главную</Button>
            </div>
        );
    }

    return (
        <div className={style.articlesPage}>
            <h1 className={style.articlesPage__title}>Статьи</h1>
            <div className={style.articlesPage__list}>
                { articles.map((article, index) => {
                    return (
                        <Card article={article} href={ROUTES.public.articles.show.generatePath(article.id)} key={`article_${index}`} />
                    );
                }) }

            </div>
            <Pagination currentPage={currentPage} onChangePage={handlePageSize} pageSize={articles.length} totalPages={totalPages} showSizeChanger={false} />
        </div>
    );
};

export default ArticlesPage;
