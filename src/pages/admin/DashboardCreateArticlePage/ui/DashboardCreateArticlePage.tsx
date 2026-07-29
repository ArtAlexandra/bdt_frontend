'use client';

import { useRouter } from 'next/navigation';

import { ArticleType } from '@bdt/shared/config/ApiConstants';
import { ROUTES } from '@bdt/shared/config/Routes';

import Steps, { type IStep } from '@bdt/shared/ui/Steps';

import { DashboardHead, DashboardSection, DashboardSectionSuperstructure } from '@bdt/features/Dashboard';

import { AdminPostCreateForm } from '@bdt/widgets/AdminPostForm';
import UserGallery from '@bdt/widgets/UserGallery';

import type { TArticle } from '@bdt/shared/api/Article';

const CreateArticleSteps: IStep[] = [
    { title: 'Создание', content: 'Напишите статью' },
    { title: 'Превью', content: 'Проверьте правильность написания статьи' },
    { title: 'Публикация', content: 'Сделайте статью доступной' }
];

function DashboardCreateArticlePage() {
    const router = useRouter();

    const handleSubmit = (post?: TArticle) => {
        if (!post) return;
        const path = ROUTES.admin.dashboard.articles.edit.generatePath(post.id);

        router.push(`${path}?step=1`);
    };

    return (
        <>
            <DashboardHead title="Создание новой статьи" />

            <DashboardSectionSuperstructure>
                <Steps data={CreateArticleSteps} current={0} />
            </DashboardSectionSuperstructure>

            <DashboardSection>
                <AdminPostCreateForm path={ArticleType.ARTICLE} GalleryComponent={UserGallery} onSubmit={handleSubmit} />
            </DashboardSection>
        </>
    );
}

export default DashboardCreateArticlePage;
