'use client';

import Steps, { type IStep } from '@bdt/shared/ui/Steps';

import { DashboardHead, DashboardSection, DashboardSectionSuperstructure } from '@bdt/features/Dashboard';

import { AdminPostCreateForm } from '@bdt/widgets/AdminPostForm';
import UserGallery from '@bdt/widgets/UserGallery';

const CreatePostSteps: IStep[] = [
    { title: 'Создание', content: 'Напишите пост' },
    { title: 'Превью', content: 'Проверьте правильность написания поста' },
    { title: 'Публикация', content: 'Сделайте пост доступным!' }
];

function DashboardCreatePostPage() {
    return (
        <>
            <DashboardHead title="Создание нового поста" />

            <DashboardSectionSuperstructure>
                <Steps data={CreatePostSteps} current={0} />
            </DashboardSectionSuperstructure>

            <DashboardSection>
                <AdminPostCreateForm GalleryComponent={UserGallery} />
            </DashboardSection>
        </>
    );
}

export default DashboardCreatePostPage;
