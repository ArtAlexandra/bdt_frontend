'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { notifyPromise } from '@bdt/shared/lib/Notifications';

import { ROUTES } from '@bdt/shared/config/Routes';

import Button from '@bdt/shared/ui/Button';
import Modal from '@bdt/shared/ui/Modal';

import { useRemoveAdminArticleByIdMutation } from '@bdt/entities/Article';

import type { TArticle } from '@bdt/shared/api/Article';

interface IPostArchivedFormProps {
    post: TArticle;

    onSuccess: () => void;
};

function PostArchivedForm({ post, onSuccess }: IPostArchivedFormProps) {
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
    const [removePost] = useRemoveAdminArticleByIdMutation();
    const router = useRouter();

    const handleCloseDeleteModal = () => setIsOpenDeleteModal(false);

    const handleDelete = async () => {
        await notifyPromise(removePost(post.id).unwrap(), {
            loading: 'Удаление поста...',
            success: 'Пост успешно удален',
        });
        router.push(ROUTES.admin.dashboard.posts.index.path);

        onSuccess();
    };

    return (
        <>
            <Button variant="danger" onClick={() => setIsOpenDeleteModal(true)}>Удалить</Button>

            <Modal title={`Обновление статуса поста "${post.title}"`} isOpen={isOpenDeleteModal} onCancel={handleCloseDeleteModal}>
                <p className="mb-4">Вы уверены, что хотите удалить пост?</p>
                <div className="flex justify-end gap-3">
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>Отмена</Button>
                    <Button variant="danger" onClick={handleDelete}>Удалить</Button>
                </div>
            </Modal>
        </>
    );
}

export default PostArchivedForm;
