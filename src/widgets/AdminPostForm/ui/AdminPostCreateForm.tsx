'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { getNormalizeSlug } from '@bdt/shared/helpers/TextHelpers';
import { notifyPromise } from '@bdt/shared/lib/Notifications';
import { createArticleSchema, type TCreateArticleSchema } from '@bdt/shared/schemas/Article';

import { ArticleType } from '@bdt/shared/config/ApiConstants';

import Button from '@bdt/shared/ui/Button';
import Input from '@bdt/shared/ui/Input';

import { useCreateAdminArticleMutation } from '@bdt/entities/Article';
import TextEditor, { type TGalleryComponent } from '@bdt/entities/TextEditor';

import MediaGallery from '@bdt/features/MediaGallery';

import type { TArticle } from '@bdt/shared/api/Article';

interface IAdminPostCreateFormProps {
    path: ArticleType;
    className?: string;
    GalleryComponent: TGalleryComponent;

    onSubmit?: (article: TArticle) => void;
};

function AdminPostCreateForm({ path, className, GalleryComponent, onSubmit }: IAdminPostCreateFormProps) {
    const { handleSubmit, formState: { errors, isSubmitting }, setValue, watch, reset, register } = useForm<TCreateArticleSchema>({
        resolver: zodResolver(createArticleSchema),
        defaultValues: {
            path,
        },
    });

    const [createPost, { isLoading }] = useCreateAdminArticleMutation();

    const images = watch('images') || [];

    const handleSetContent = (value: string) => {
        setValue('content', value);
    };

    const submitForm = async (data: TCreateArticleSchema) => {
        data.slug = getNormalizeSlug(data.title);

        const article = await notifyPromise(createPost(data).unwrap(), {
            loading: 'Создание поста...',
            success: 'Пост успешно создан',
        });

        reset();
        onSubmit?.(article);
    };

    return (
        <form className={className} onSubmit={handleSubmit(submitForm)}>
            <Input label="Заголовок" className="mb-5" placeholder="Введите заголовок" type="text" register={register('title')} required error={errors.title} />

            <MediaGallery label="Медиа" className="mb-5" images={images} error={errors.images} GalleryComponent={GalleryComponent} onChange={(newImages) => setValue('images', newImages)} />

            <TextEditor className="mb-5" placeholder="Начните писать.." onChange={handleSetContent} GalleryComponent={GalleryComponent} error={errors.content} />

            <div className="flex justify-end">
                <Button variant="primary" type="submit" isLoading={isLoading || isSubmitting}>
                    Сохранить
                </Button>
            </div>
        </form>
    );
}

export default AdminPostCreateForm;
