'use client';

import { useState } from 'react';

import { notifyPromise } from '@bdt/shared/lib/Notifications';

import { ArticleStatus } from '@bdt/shared/config/ApiConstants';

import Button from '@bdt/shared/ui/Button';
import Checkbox from '@bdt/shared/ui/Checkbox';
import Modal from '@bdt/shared/ui/Modal';

import { useUpdateAdminArticleByIdMutation } from '@bdt/entities/Article';

import type { TArticle } from '@bdt/shared/api/Article';
import type { TUpdateArticleSchema } from '@bdt/shared/schemas/Article';

interface IPostDraftFormProps {
    post: TArticle;

    onSuccess: () => void;
};

function PostDraftForm({ post, onSuccess }: IPostDraftFormProps) {
    const [isOpenPublishModal, setIsOpenPublishModal] = useState<boolean>(false);
    const [isPinned, setIsPinned] = useState<boolean>(post.isPinned);
    const [updatePost] = useUpdateAdminArticleByIdMutation();

    const handleCloseArchivedModal = () => setIsOpenPublishModal(false);

    const handleUpdate = async () => {
        if (isPinned === post.isPinned) return;

        const data: TUpdateArticleSchema = {
            ...post,
            publishedAt: new Date(),
            isPinned,
            status: ArticleStatus.PUBLISHED,
        };

        await notifyPromise(updatePost({ id: post.id, data }).unwrap(), {
            loading: 'Публикация поста...',
            success: 'Пост успешно опубликован',
        });

        onSuccess();
    };

    return (
        <>
            <Checkbox className="mb-4" checked={isPinned} onChange={setIsPinned}>Закрепить пост?</Checkbox>
            <Button variant="primary" onClick={() => setIsOpenPublishModal(true)}>Опубликовать</Button>

            <Modal title={`Публикация поста "${post.title}"`} isOpen={isOpenPublishModal} onCancel={handleCloseArchivedModal} onClose={handleCloseArchivedModal}>
                <p className="mb-4">Вы уверены, что хотите опубликовать пост?</p>
                <div className="flex justify-end gap-3">
                    <Button variant="secondary" onClick={handleCloseArchivedModal}>Отмена</Button>
                    <Button variant="primary" onClick={handleUpdate}>Опубликовать</Button>
                </div>
            </Modal>
        </>
    );
}

export default PostDraftForm;
