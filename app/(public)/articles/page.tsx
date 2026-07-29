import { getPublicArticleServer } from '@bdt/shared/api/ArticleServer';

import { ArticleType } from '@bdt/shared/config/ApiConstants';

import ArticlesPage from '@bdt/pages/public/ArticlesPage';

interface IPageProps {
    searchParams: {
        page?: number;
    };
};

export default async function Page({ searchParams }: IPageProps) {
    const { page = 1 } = await searchParams;
    const response = await getPublicArticleServer({ page, limit: 20, path: ArticleType.ARTICLE });
    const totalPages = response?.total ? Math.ceil(response?.total / 20) : 0;

    return <ArticlesPage articles={response?.items ?? []} currentPage={page} totalPages={totalPages} />;
}

export const revalidate = 3600;
