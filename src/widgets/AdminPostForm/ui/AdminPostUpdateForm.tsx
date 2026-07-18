'use client';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import isEqual from 'lodash/isEqual';

import { notifyPromise } from '@bdt/shared/lib/Notifications';
import { type TUpdateArticleSchema, updateArticleSchema } from '@bdt/shared/schemas/Article';

import { ArticleType } from '@bdt/shared/config/ApiConstants';

import Button from '@bdt/shared/ui/Button';
import Input from '@bdt/shared/ui/Input';

import { useUpdateAdminArticleByIdMutation } from '@bdt/entities/Article';
import TextEditor, { type TGalleryComponent } from '@bdt/entities/TextEditor';

import MediaGallery from '@bdt/features/MediaGallery';

import type { TArticle } from '@bdt/shared/api/Article';

interface IAdminPostUpdateFormProps {
    post: TArticle;
    className?: string;
    buttonText?: string;
    buttonSecondaryText?: string;
    GalleryComponent: TGalleryComponent;

    onSuccess?: () => void;
    onSubmit?: () => void;
};

function AdminPostUpdateForm({ post, buttonText = 'Сохранить', buttonSecondaryText, className, GalleryComponent, onSuccess, onSubmit }: IAdminPostUpdateFormProps) {
    const formDefaultValues: TUpdateArticleSchema = useMemo(() => ({
        ...post,
        path: post.path as ArticleType,
        publishedAt: post?.publishedAt ? new Date(post.publishedAt) : undefined,
    }), [post]);

    const { handleSubmit, formState: { errors, isSubmitting }, setValue, watch, register } = useForm<TUpdateArticleSchema>({
        resolver: zodResolver(updateArticleSchema),
        defaultValues: formDefaultValues,
    });

    const [updatePost] = useUpdateAdminArticleByIdMutation();

    const images = watch('images') || [];
    const formValues = watch();
    const content = watch('content');

    const formChanged = useMemo(() => {
        return !isEqual(formValues, formDefaultValues);
    }, [formValues, formDefaultValues]);

    const submitButtonText = formChanged ? buttonText : buttonSecondaryText || buttonText;

    const handleSetContent = (value: string) => {
        setValue('content', value);
    };

    const submitForm = async (data: TUpdateArticleSchema) => {
        if (!formChanged) return onSuccess?.();

        await notifyPromise(updatePost({ id: post.id, data }).unwrap(), {
            loading: 'Изменение поста...',
            success: 'Пост успешно обновлен',
        });

        onSubmit?.();
    };

    return (
        <form className={className} onSubmit={handleSubmit(submitForm)}>
            <Input label="Заголовок" className="mb-5" placeholder="Введите заголовок" type="text" register={register('title')} required error={errors.title} />

            <MediaGallery images={images} error={errors.images} label="Медиа" className="mb-5" GalleryComponent={GalleryComponent} onChange={(newImages) => setValue('images', newImages)} />

            <TextEditor className="mb-5" placeholder="Начните писать.." data={content ?? ''} onChange={handleSetContent} GalleryComponent={GalleryComponent} error={errors.content} />

            <div className="flex justify-end">
                <Button variant="primary" type="submit" isLoading={isSubmitting}>{ submitButtonText }</Button>
            </div>
        </form>
    );
}

export default AdminPostUpdateForm;
