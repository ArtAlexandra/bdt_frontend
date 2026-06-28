'use client';

import PublicHeader from '@bdt/widgets/PublicHeader';

import HeroSection from './HeroSection';
import LocationSection from './LocationSection';
import VKWallSection from './VKWallSection';

import type { TPost } from '@bdt/entities/VK';

interface IMainPageProps {
    posts: TPost[];
};

function MainPage({ posts }: IMainPageProps) {
    return (
        <>
            <PublicHeader />
            <HeroSection />
            <VKWallSection posts={posts} />
            <LocationSection />
        </>
    );
}

export default MainPage;
