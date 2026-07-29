'use client';

import { ArticleReader } from '@bdt/features/Article';

import type { TArticle } from '@bdt/shared/api/Article';

interface IArticlePageProps {
    article: TArticle;
};

function ArticlePage({ article }: IArticlePageProps) {
    return <ArticleReader article={article} className="mt-[50px]" />;
}

export default ArticlePage;
