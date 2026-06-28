import { getVKWallServer } from '@bdt/shared/api/VKServer';

import { getPostsByVK, type TPost } from '@bdt/entities/VK';

import NewsPage from '@bdt/pages/public/NewsPage';

interface IPageProps {
    searchParams: Promise<{
        page?: number;
    }>
};

export default async function Page({ searchParams }: IPageProps) {
    try {
        const paramsObj = await searchParams || {};
        const page = Number(paramsObj.page) || 1;
        const count = 20;
        const offset = count * (page - 1);
        const data = await getVKWallServer({ count, offset });
        const totalPages = data?.response.count ? Math.ceil(data.response.count / count) : 0;

        let posts: TPost[] = [];

        if (data && data.response) {
            try {
                posts = getPostsByVK(data.response.items);
            } catch (error) {
                console.error('Error processing posts:', error);
                posts = [];
            }
        }

        return <NewsPage posts={posts} currentPage={page} totalPages={totalPages} />;
    } catch (error) {
        console.error('Error loading page:', error);

        return <NewsPage posts={[]} currentPage={1} totalPages={0} />;
    }
}

export const revalidate = 3600;
