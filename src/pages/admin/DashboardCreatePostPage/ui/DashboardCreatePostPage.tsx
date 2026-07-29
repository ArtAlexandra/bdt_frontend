'use client';

import { useRouter } from 'next/navigation';

import { ArticleType } from '@bdt/shared/config/ApiConstants';
import { ROUTES } from '@bdt/shared/config/Routes';

import Steps, { type IStep } from '@bdt/shared/ui/Steps';

import { DashboardHead, DashboardSection, DashboardSectionSuperstructure } from '@bdt/features/Dashboard';

import { AdminPostCreateForm } from '@bdt/widgets/AdminPostForm';
import UserGallery from '@bdt/widgets/UserGallery';

import type { TArticle } from '@bdt/shared/api/Article';

const CreatePostSteps: IStep[] = [
    { title: 'Создание', content: 'Напишите пост' },
    { title: 'Превью', content: 'Проверьте правильность написания поста' },
    { title: 'Публикация', content: 'Сделайте пост доступным' }
];

function DashboardCreatePostPage() {
    const router = useRouter();

    const handleSubmit = (post?: TArticle) => {
        if (!post) return;
        const path = ROUTES.admin.dashboard.posts.edit.generatePath(post.id);

        router.push(`${path}?step=1`);
    };

    return (
        <>
            <DashboardHead title="Создание нового поста" />

            <DashboardSectionSuperstructure>
                <Steps data={CreatePostSteps} current={0} />
            </DashboardSectionSuperstructure>

            <DashboardSection>
                <AdminPostCreateForm path={ArticleType.POST} GalleryComponent={UserGallery} onSubmit={handleSubmit} />
            </DashboardSection>
        </>
    );
}

export default DashboardCreatePostPage;
