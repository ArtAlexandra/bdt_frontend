import { notFound } from 'next/navigation';

import { getPublicArticleByIdServer } from '@bdt/shared/api/ArticleServer';

import ArticlePage from '@bdt/pages/public/ArticlePage';

interface IProps {
    params: Promise<{ articleId: string }>
};

export default async function Page({ params }: IProps) {
    const { articleId } = await params;
    const article = await getPublicArticleByIdServer(articleId);

    if (!article) notFound();

    return <ArticlePage article={article} />;
}

export const dynamic = 'force-dynamic';
