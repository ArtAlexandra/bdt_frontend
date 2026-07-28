'use client';

import { ArticleType } from '@bdt/shared/config/ApiConstants';

import { DashboardHead, DashboardSection } from '@bdt/features/Dashboard';

import PostsList from '@bdt/widgets/PostsList/ui/PostsList';

function DashboardArticlesPage() {
    return (
        <>
            <DashboardHead title="Управление статьями" />

            <DashboardSection>
                <PostsList path={ArticleType.ARTICLE} />
            </DashboardSection>
        </>
    );
}

export default DashboardArticlesPage;
