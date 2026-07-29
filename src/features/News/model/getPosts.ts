import { getPublicArticleServer } from '@bdt/shared/api/ArticleServer';
import { getVKWallServer } from '@bdt/shared/api/VKServer';
import { mergeAndSortPublicPosts, type TPublicArticle } from '@bdt/shared/helpers/PublicArticle';

import { ArticleType } from '@bdt/shared/config/ApiConstants';

import { mapArticlesToPublic } from '@bdt/entities/Article';
import { mapVKPostsToPublic } from '@bdt/entities/VK';

export const getPosts = async (count: number): Promise<{ posts: TPublicArticle[] }> => {
    const [vkResponse, articles] = await Promise.all([
        getVKWallServer({ count }),
        getPublicArticleServer({ page: 1, limit: count, path: ArticleType.POST })
    ]);

    const vkPosts = vkResponse?.response?.items ? mapVKPostsToPublic(vkResponse.response.items) : [];
    const sitePosts = articles?.items ? mapArticlesToPublic(articles.items) : [];

    const posts = mergeAndSortPublicPosts(vkPosts, sitePosts, count);

    return { posts };
};
