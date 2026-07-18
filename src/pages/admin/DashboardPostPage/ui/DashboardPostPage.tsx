'use client';

import { useCallback, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { ROUTES } from '@bdt/shared/config/Routes';

import Button from '@bdt/shared/ui/Button';
import Steps, { type IStep } from '@bdt/shared/ui/Steps';

import { useGetAdminArticleByIdQuery } from '@bdt/entities/Article';

import { DashboardHead, DashboardSection, DashboardSectionSuperstructure } from '@bdt/features/Dashboard';
import SitePostViewer from '@bdt/features/SitePostViewer';

import { AdminPostUpdateForm } from '@bdt/widgets/AdminPostForm';
import UserGallery from '@bdt/widgets/UserGallery';

import PublicationSection from './PublicationSection';

const STEPS = {
    description: 0,
    preview: 1,
    publication: 2
};

const UpdatePostSteps: IStep[] = [
    { title: 'Редактирование', content: 'Дополните пост' },
    { title: 'Превью', content: 'Проверьте правильность написания поста' },
    { title: 'Публикация', content: 'Сделайте пост доступным' }
];

interface IDashboardPostPageProps {
    postId: string;
};

function DashboardPostPage({ postId }: IDashboardPostPageProps) {
    const router = useRouter();
    const { data: post, refetch } = useGetAdminArticleByIdQuery(postId);
    const searchParams = useSearchParams();
    const step = searchParams?.get('step');
    const [current, setCurrent] = useState(step ? parseInt(step) : STEPS.description);

    const handleStepChange = useCallback(async (step: number, shouldRefresh: boolean = false) => {
        if (!post) return;

        if (shouldRefresh) await refetch();

        setCurrent(step);
        const path = ROUTES.admin.dashboard.posts.edit.generatePath(post.id);
        router.push(`${path}?step=${step}`);
    }, [post, refetch, router]);

    return (
        <>
            <DashboardHead title={post?.title ?? ''} backLink={ROUTES.admin.dashboard.posts.index.path} />

            <DashboardSectionSuperstructure>
                <Steps data={UpdatePostSteps} current={current} onChange={(step) => handleStepChange(step)} />
            </DashboardSectionSuperstructure>

            <DashboardSection>
                { post && current === STEPS.description && <AdminPostUpdateForm post={post} GalleryComponent={UserGallery} buttonSecondaryText="Продолжить" onSuccess={() => handleStepChange(STEPS.preview)} onSubmit={() => handleStepChange(STEPS.preview, true)} /> }

                { post && current === STEPS.preview &&
                    <>
                        <SitePostViewer post={post} id={post.id} className="max-w-[900px]" />
                        <Button variant="primary" onClick={() => handleStepChange(STEPS.publication)} className="ml-auto">Продолжить</Button>
                    </>
                }

                { post && current === STEPS.publication && <PublicationSection post={post} onSuccess={refetch} /> }
            </DashboardSection>
        </>
    );
}

export default DashboardPostPage;
