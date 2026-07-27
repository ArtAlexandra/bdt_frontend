import type { TPublicArticle } from './PublicArticleTypes';

export const mergeAndSortPublicPosts = (vkPosts: TPublicArticle[], sitePosts: TPublicArticle[], total: number) => {
    const allPosts = [...sitePosts, ...vkPosts];

    const sortByDate = (a: TPublicArticle, b: TPublicArticle) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
    };

    const pinned = allPosts
        .filter(item => item.isPinned)
        .sort(sortByDate);

    const regular = allPosts
        .filter(item => !item.isPinned)
        .sort(sortByDate);

    if (pinned.length >= total) {
        return pinned.slice(0, total);
    }

    const remaining = total - pinned.length;
    return [...pinned, ...regular.slice(0, remaining)];
};
