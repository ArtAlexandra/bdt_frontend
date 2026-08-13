'use client';

import PublicHeader from '@bdt/widgets/PublicHeader';

import HeroSection from './HeroSection';
import LocationSection from './LocationSection';
import TeamSection from './TeamSection';
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
            <TeamSection />
            <LocationSection />
        </>
    );
}

export default MainPage;
