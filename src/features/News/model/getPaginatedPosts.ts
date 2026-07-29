import { cache } from 'react';

import { getPublicArticleServer } from '@bdt/shared/api/ArticleServer';
import { getVKWallServer } from '@bdt/shared/api/VKServer';
import { mergeAndSortPublicPosts, type TPublicArticle } from '@bdt/shared/helpers/PublicArticle';

import { ArticleType } from '@bdt/shared/config/ApiConstants';

import { mapArticlesToPublic } from '@bdt/entities/Article';
import { mapVKPostsToPublic } from '@bdt/entities/VK';

const POSTS_PER_PAGE = 20;
const FETCH_OVERHEAD = 1;

const getCachedSitePosts = cache(async () => {
    const response = await getPublicArticleServer({ page: 1, limit: 100, path: ArticleType.POST });

    const posts = response?.items ? mapArticlesToPublic(response.items) : [];
    return {
        posts,
        total: response?.total || 0
    };
});

interface IGetPaginatedPostsResult {
    posts: TPublicArticle[];
    total: number;
    totalPages: number;
};

interface IGetPaginatedPostsProps {
    page: number;
    postsPerPage?: number;
    fetchOverhead?: number;
};

export const getPaginatedPosts = async ({ page, postsPerPage = POSTS_PER_PAGE, fetchOverhead = FETCH_OVERHEAD }: IGetPaginatedPostsProps): Promise<IGetPaginatedPostsResult> => {
    const { posts: allSitePosts, total: totalSite } = await getCachedSitePosts();

    // Посты сайта для текущей страницы
    const siteOffset = (page - 1) * postsPerPage;
    const siteFetchCount = postsPerPage * fetchOverhead;
    const sitePosts = allSitePosts.slice(siteOffset, siteOffset + siteFetchCount);

    // Вычисляем, сколько постов сайта реально попало на предыдущие страницы
    const previousSitePosts = allSitePosts.slice(0, siteOffset);
    const sitePostsOnPreviousPages = previousSitePosts.length;

    // Смещение для VK = (общее количество постов на предыдущих страницах) - (посты сайта на предыдущих страницах)
    const totalPostsOnPreviousPages = (page - 1) * postsPerPage;

    const vkOffset = Math.max(0, totalPostsOnPreviousPages - sitePostsOnPreviousPages);

    const vkFetchCount = postsPerPage * fetchOverhead;

    const vkResponse = await getVKWallServer({ count: vkFetchCount, offset: vkOffset });

    const vkPosts = vkResponse?.response?.items ? mapVKPostsToPublic(vkResponse.response.items) : [];

    // Сортируем и берем только нужное количество постов
    const posts = mergeAndSortPublicPosts(vkPosts, sitePosts, postsPerPage);

    const totalVK = vkResponse?.response?.count || 0;
    const total = totalVK + totalSite;
    const totalPages = Math.ceil(total / postsPerPage);

    return {
        posts,
        total,
        totalPages
    };
};
