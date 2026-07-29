'use client';

import { ArticleType } from '@bdt/shared/config/ApiConstants';

import { DashboardHead, DashboardSection } from '@bdt/features/Dashboard';

import PostsList from '@bdt/widgets/PostsList/ui/PostsList';

function DashboardPostsPage() {
    return (
        <>
            <DashboardHead title="Управление постами" />

            <DashboardSection>
                <PostsList path={ArticleType.POST} />
            </DashboardSection>
        </>
    );
}

export default DashboardPostsPage;
