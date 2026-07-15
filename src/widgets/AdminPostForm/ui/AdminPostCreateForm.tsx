'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';

import { getNormalizeSlug } from '@bdt/shared/helpers/TextHelpers';
import { notifyPromise } from '@bdt/shared/lib/Notifications';
import { createArticleSchema, type TCreateArticleSchema } from '@bdt/shared/schemas/Article';

import { ArticleType } from '@bdt/shared/config/ApiConstants';

import Button from '@bdt/shared/ui/Button';
import Error from '@bdt/shared/ui/Error';
import Icon from '@bdt/shared/ui/Icon';
import Input from '@bdt/shared/ui/Input';
import Label from '@bdt/shared/ui/Label';
import Modal from '@bdt/shared/ui/Modal';

import { useCreateAdminArticleMutation } from '@bdt/entities/Article';
import TextEditor, { type TGalleryComponent } from '@bdt/entities/TextEditor';

import type { TArticle } from '@bdt/shared/api/Article';

interface IAdminPostCreateFormProps {
    className?: string;
    GalleryComponent: TGalleryComponent;

    onSubmit?: (article: TArticle) => void;
};

function AdminPostCreateForm({ className, GalleryComponent, onSubmit }: IAdminPostCreateFormProps) {
    const { handleSubmit, formState: { errors, isSubmitting }, setValue, watch, reset } = useForm<TCreateArticleSchema>({
        resolver: zodResolver(createArticleSchema),
        defaultValues: { path: ArticleType.POST },
    });

    const [createPost, { isLoading }] = useCreateAdminArticleMutation();

    const imageUrl = watch('image');

    const [isOpenGalleryComponent, setIsOpenGalleryComponent] = useState<boolean>(false);

    const handleCloseGalleryComponent = () => setIsOpenGalleryComponent(false);

    const handleSelectImage = (url: string) => {
        setValue('image', url);
        handleCloseGalleryComponent();
    };

    const handleSetContent = (value: string) => {
        setValue('content', value);
    };

    const submitForm = async (data: TCreateArticleSchema) => {
        data.slug = getNormalizeSlug(data.title);
        const article = await notifyPromise(createPost(data).unwrap(), {
            loading: 'Создание статьи...',
            success: 'Статья успешно создана',
        });

        reset();
        onSubmit?.(article);
    };

    return (
        <>
            <Modal title="Выберите обложку" isOpen={isOpenGalleryComponent} onCancel={handleCloseGalleryComponent} onClose={handleCloseGalleryComponent}>
                <GalleryComponent onSelect={handleSelectImage} />
            </Modal>

            <form className={className} onSubmit={handleSubmit(submitForm)}>
                <Input label="Заголовок" className="mb-5" placeholder="Введите заголовок" type="text" onChange={(value) => setValue('title', value)} required error={errors.title?.message} />

                <Label text="Обложка" />

                { errors.image && <Error error={errors.image} className="mb-2" /> }

                <Button size="medium" variant="primary" className="mb-5" onClick={() => setIsOpenGalleryComponent(true)}><Icon name="upload" />Выбрать обложку</Button>

                { imageUrl && <Image src={imageUrl} alt="Превью" width={300} height={300} className="mb-5" /> }

                <TextEditor className="mb-5" placeholder="Начните писать.." onChange={handleSetContent} GalleryComponent={GalleryComponent} error={errors.content} />

                <div className="flex justify-end">
                    <Button variant="primary" type="submit" isLoading={isLoading || isSubmitting}>Сохранить</Button>
                </div>
            </form>
        </>
    );
}

export default AdminPostCreateForm;
