import { getPosts } from '@bdt/features/News';

import MainPage from '@bdt/pages/public/MainPage';

const COUNT_POSTS_IN_PAGE = 16;

export default async function Page() {
    const { posts } = await getPosts(COUNT_POSTS_IN_PAGE);

    return (
        <>
            <MainPage posts={posts} />
        </>
    );
};

export const revalidate = 3600;
