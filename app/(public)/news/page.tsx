import { getPaginatedPosts } from '@bdt/features/News';

import NewsPage from '@bdt/pages/public/NewsPage';

interface IPageProps {
    searchParams: Promise<{
        page?: number;
    }>
}

export default async function Page({ searchParams }: IPageProps) {
    try {
        const paramsObj = await searchParams || {};
        const page = Number(paramsObj.page) || 1;

        const { posts, totalPages } = await getPaginatedPosts({ page });

        return <NewsPage posts={posts} currentPage={page} totalPages={totalPages} />;
    } catch (error) {
        console.error('Error loading page:', error);
        return <NewsPage posts={[]} currentPage={1} totalPages={0} />;
    }
}

export const revalidate = 600;
