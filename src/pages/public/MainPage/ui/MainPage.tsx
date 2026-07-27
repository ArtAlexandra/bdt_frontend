'use client';

import PublicHeader from '@bdt/widgets/PublicHeader';

import HeroSection from './HeroSection';
import LocationSection from './LocationSection';
import VKWallSection from './VKWallSection';

import type { TPublicArticle } from '@bdt/shared/helpers/PublicArticle';

interface IMainPageProps {
    posts: TPublicArticle[];
};

function MainPage({ posts }: IMainPageProps) {
    return (
        <>
            <PublicHeader />
            <HeroSection />
            { posts.length > 0 && <VKWallSection posts={posts} /> }
            <LocationSection />
        </>
    );
}

export default MainPage;
