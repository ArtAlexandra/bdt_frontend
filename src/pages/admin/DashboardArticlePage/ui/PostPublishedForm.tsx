'use client';

import { useState } from 'react';

import { notifyPromise } from '@bdt/shared/lib/Notifications';

import { ArticleStatus } from '@bdt/shared/config/ApiConstants';

import Button from '@bdt/shared/ui/Button';
import Checkbox from '@bdt/shared/ui/Checkbox';
import Modal from '@bdt/shared/ui/Modal';

import { useUpdateAdminArticleByIdMutation, useUpdateAdminArticleStatusByIdMutation } from '@bdt/entities/Article';

import type { TArticle } from '@bdt/shared/api/Article';
import type { TUpdateArticleSchema } from '@bdt/shared/schemas/Article';

interface IPostPublishedFormProps {
    post: TArticle;

    onSuccess: () => void;
};

function PostPublishedForm({ post, onSuccess }: IPostPublishedFormProps) {
    const [isOpenArchivedModal, setIsOpenArchivedModal] = useState<boolean>(false);
    const [isPinned, setIsPinned] = useState<boolean>(post.isPinned);
    const [updatePost] = useUpdateAdminArticleByIdMutation();
    const [updateStatusPost] = useUpdateAdminArticleStatusByIdMutation();

    const handleCloseArchivedModal = () => setIsOpenArchivedModal(false);

    const handleUpdateStatus = async () => {
        await notifyPromise(updateStatusPost({ id: post.id, data: { status: ArticleStatus.ARCHIVED } }).unwrap(), {
            loading: 'Архивирование статьи...',
            success: 'Статья успешно архивирована',
        });

        onSuccess();
    };

    const handleUpdate = async () => {
        if (isPinned === post.isPinned) return;

        const data: TUpdateArticleSchema = {
            ...post,
            publishedAt: post?.publishedAt ? new Date(post.publishedAt) : undefined,
            isPinned
        };

        await notifyPromise(updatePost({ id: post.id, data }).unwrap(), {
            loading: 'Обновление статьи...',
            success: 'Статья успешно обновлена',
        });

        onSuccess();
    };

    return (
        <>
            <Checkbox className="mb-4" checked={isPinned} onChange={setIsPinned}>Закрепить статью?</Checkbox>

            <div className="flex gap-3">
                <Button variant="danger" onClick={handleUpdateStatus}>Архивировать</Button>
                <Button variant="primary" disabled={isPinned === post.isPinned} onClick={handleUpdate}>Обновить</Button>
            </div>

            <Modal title={`Архивирование поста "${post.title}"`} isOpen={isOpenArchivedModal} onCancel={handleCloseArchivedModal} onClose={handleCloseArchivedModal}>
                <p className="mb-4">Вы уверены, что хотите архивировать статью?</p>
                <div className="flex justify-end gap-3">
                    <Button variant="secondary" onClick={handleCloseArchivedModal}>Отмена</Button>
                    <Button variant="danger" onClick={handleUpdateStatus}>Удалить</Button>
                </div>
            </Modal>
        </>
    );
}

export default PostPublishedForm;
