import { headers } from 'next/headers';

import { getPosts } from '@bdt/features/News';

import MainPage from '@bdt/pages/public/MainPage';

const COUNT_POSTS_IN_PAGE_DESKTOP = 6;
const COUNT_POSTS_IN_PAGE_MOBILE = 3;

const isMobileDevice = (userAgent: string) => {
    return /android|iphone|ipad|ipod|mobile|windows phone/i.test(userAgent);
};

export default async function Page() {
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || '';
    const isMobile = isMobileDevice(userAgent);

    const counts = isMobile ? COUNT_POSTS_IN_PAGE_MOBILE : COUNT_POSTS_IN_PAGE_DESKTOP;
    const { posts } = await getPosts(counts);

    return (
        <MainPage posts={posts} />
    );
};

export const revalidate = 600;
