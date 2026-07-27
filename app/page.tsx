import { getPublicArticleServer } from '@bdt/shared/api/ArticleServer';
import { getVKWallServer } from '@bdt/shared/api/VKServer';
import { mergeAndSortPublicPosts } from '@bdt/shared/helpers/PublicArticle';

import { mapArticlesToPublic } from '@bdt/entities/Article';
import { mapVKPostsToPublic } from '@bdt/entities/VK';

import MainPage from '@bdt/pages/public/MainPage';

const COUNT_POSTS_IN_PAGE = 6;

export default async function Page() {
    const [vkResponse, articles] = await Promise.all([
        getVKWallServer({ count: COUNT_POSTS_IN_PAGE }),
        getPublicArticleServer({ page: 1, limit: COUNT_POSTS_IN_PAGE })
    ]);

    const vkPosts = vkResponse?.response?.items ? mapVKPostsToPublic(vkResponse.response.items) : [];

    const sitePosts = articles?.items ? mapArticlesToPublic(articles?.items) : [];

    const publicPosts = mergeAndSortPublicPosts(vkPosts, sitePosts, COUNT_POSTS_IN_PAGE);

    return (
        <>
            <MainPage posts={publicPosts} />
        </>
    );
};

export const revalidate = 3600;
