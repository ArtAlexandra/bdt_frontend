import { getVKWallServer } from '@bdt/shared/api/VKServer';

import { getPostsByVK, type TPost } from '@bdt/entities/VK';

import MainPage from '@bdt/pages/public/MainPage';

export default async function Page() {
    const data = await getVKWallServer({ count: 6 });
    let posts: TPost[] = [];

    if (data && data.response) {
        try {
            posts = getPostsByVK(data.response.items);
        } catch (error) {
            console.error('Error processing posts:', error);
            posts = [];
        }
    }

    return (
        <>
            <MainPage posts={posts} />
        </>
    );
};

export const revalidate = 3600;
