import { cache } from 'react';

import { getPublicArticleServer } from '@bdt/shared/api/ArticleServer';
import { getVKWallServer } from '@bdt/shared/api/VKServer';
import { mergeAndSortPublicPosts } from '@bdt/shared/helpers/PublicArticle';

import { mapArticlesToPublic } from '@bdt/entities/Article';
import { mapVKPostsToPublic } from '@bdt/entities/VK';

import NewsPage from '@bdt/pages/public/NewsPage';

interface IPageProps {
    searchParams: Promise<{
        page?: number;
    }>
}

const POSTS_PER_PAGE = 20;
const FETCH_OVERHEAD = 1;

const getCachedSitePosts = cache(async () => {
    const response = await getPublicArticleServer({ page: 1, limit: 100 });
    const posts = response?.items ? mapArticlesToPublic(response.items) : [];
    return {
        posts: posts.sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        ),
        total: response?.total || 0
    };
});

export default async function Page({ searchParams }: IPageProps) {
    try {
        const paramsObj = await searchParams || {};
        const page = Number(paramsObj.page) || 1;

        const { posts: allSitePosts, total: totalSite } = await getCachedSitePosts();

        // Посты сайта для текущей страницы
        const siteOffset = (page - 1) * POSTS_PER_PAGE;
        const siteFetchCount = POSTS_PER_PAGE * FETCH_OVERHEAD;
        const sitePosts = allSitePosts.slice(siteOffset, siteOffset + siteFetchCount);

        // Вычисляем, сколько постов сайта реально попало на предыдущие страницы
        // Для этого берем посты сайта с предыдущих страниц и считаем их количество
        const previousSitePosts = allSitePosts.slice(0, siteOffset);
        const sitePostsOnPreviousPages = previousSitePosts.length;

        // Смещение для VK = (общее количество постов на предыдущих страницах) - (посты сайта на предыдущих страницах)
        // То есть сколько постов VK было показано на предыдущих страницах
        const totalPostsOnPreviousPages = (page - 1) * POSTS_PER_PAGE;
        const vkOffset = Math.max(0, totalPostsOnPreviousPages - sitePostsOnPreviousPages);

        const vkFetchCount = POSTS_PER_PAGE * FETCH_OVERHEAD;

        const vkResponse = await getVKWallServer({
            count: vkFetchCount,
            offset: vkOffset
        });

        const vkPosts = vkResponse?.response?.items
            ? mapVKPostsToPublic(vkResponse.response.items)
            : [];

        // Сортируем и берем только POSTS_PER_PAGE постов
        const allPosts = mergeAndSortPublicPosts(vkPosts, sitePosts, POSTS_PER_PAGE);

        const totalVK = vkResponse?.response?.count || 0;
        const total = totalVK + totalSite;
        const totalPages = Math.ceil(total / POSTS_PER_PAGE);

        return <NewsPage posts={allPosts} currentPage={page} totalPages={totalPages} />;
    } catch (error) {
        console.error('Error loading page:', error);

        return <NewsPage posts={[]} currentPage={1} totalPages={0} />;
    }
}

export const revalidate = 3600;
