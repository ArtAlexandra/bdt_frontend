import { PublicArticleType, type TPublicArticle } from '@bdt/shared/helpers/PublicArticle/PublicArticleTypes';

import { ROUTES } from '@bdt/shared/config/Routes';

import { getMedia } from './getMedia';

import type { TArticle } from '@bdt/shared/api/Article';

export const mapArticleToPublic = (article: TArticle): TPublicArticle => {
    const date = article.publishedAt || article.createdAt;

    const media = getMedia(article.images);

    return {
        id: article.id,
        type: PublicArticleType.SITE,
        title: article.title,
        content: article.content,
        date: new Date(date),
        href: ROUTES.public.home.path,
        isPinned: article.isPinned,
        isRepost: false,
        media,
    };
};

export const mapArticlesToPublic = (articles: TArticle[]) => {
    const data: TPublicArticle[] = [];

    articles.forEach((article) => {
        try {
            const item = mapArticleToPublic(article);
            if (item) {
                data.push(item);
            }
        } catch (error) {
            console.error(`Failed to process post ${article.id}:`, error);
        }
    });

    return data;
};
