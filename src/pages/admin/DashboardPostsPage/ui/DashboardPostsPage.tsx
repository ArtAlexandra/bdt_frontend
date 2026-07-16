'use client';

import { DashboardHead, DashboardSection } from '@bdt/features/Dashboard';

import PostsList from '@bdt/widgets/PostsList/ui/PostsList';

function DashboardPostsPage() {
    return (
        <>
            <DashboardHead title="Управление постами" />

            <DashboardSection>
                <PostsList />
            </DashboardSection>
        </>
    );
}

export default DashboardPostsPage;
