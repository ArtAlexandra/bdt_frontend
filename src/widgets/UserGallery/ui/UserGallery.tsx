'use client';

import { useState } from 'react';
import clsx from 'clsx';

import { notifyPromise } from '@bdt/shared/lib/Notifications';

import Button from '@bdt/shared/ui/Button';
import Icon from '@bdt/shared/ui/Icon';
import Label from '@bdt/shared/ui/Label';
import Loader from '@bdt/shared/ui/Loader';
import Upload from '@bdt/shared/ui/Upload';

import { useAddImageGalleryMutation, useGetImagesGalleryQuery, useRemoveImageGalleryMutation } from '@bdt/entities/User';

import ModalDeleteImage from './ModalDeleteImage';
import UserGalleryImage from './UserGalleryImage';

import style from './UserGallery.module.scss';

interface IUserGalleryProps {
    text?: string;
    className?: string;
    selectedImageUrl?: string;
    initialVisibleCount?: number;

    onSelect: (url: string) => void;
};

const INITIAL_COUNT = 12;

function UserGallery({ text, className, selectedImageUrl, initialVisibleCount = INITIAL_COUNT, onSelect }: IUserGalleryProps) {
    const { data: gallery = [] } = useGetImagesGalleryQuery();
    const [addImage, { isLoading: isLoadingAddImage }] = useAddImageGalleryMutation();
    const [removeImage] = useRemoveImageGalleryMutation();

    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [imageToRemove, setImageToRemove] = useState({ id: '', src: '' });
    const [showAll, setShowAll] = useState(false);

    const displayedImages = showAll ? gallery : gallery.slice(0, initialVisibleCount);
    const hasMore = gallery.length > initialVisibleCount;

    const handleSelectImage = async (image: File | null) => {
        if (!image) return;

        const formData = new FormData();
        formData.append('image', image);

        const data = await notifyPromise(addImage(formData).unwrap(), {
            loading: 'Добавление изображения в галерею...',
            success: 'Изображение успешно добавлено',
        });

        onSelect(data.url);
    };

    const handleSelectRemoveImage = (imageId: string, imageSrc: string) => {
        setImageToRemove({ id: imageId, src: imageSrc });
        setIsOpenDeleteModal(true);
    };

    const handleRemoveImage = async () => {
        if (!imageToRemove.id) return;

        await notifyPromise(removeImage(imageToRemove.id).unwrap(), {
            loading: 'Удаление файла из галереи...',
            success: 'Файл удален',
        });

        setIsOpenDeleteModal(false);
        setImageToRemove({ id: '', src: '' });
    };

    return (
        <div className={clsx(style.userGallery, className)}>
            <div className={style.userGallery__head}>
                <Label text={text ?? 'Галерея'} />
                <Upload onChange={handleSelectImage} text="Загрузить" showPreview={false} />
            </div>
            { isLoadingAddImage && <Loader fullHeight /> }

            { gallery.length === 0
                ? <div className={style.userGallery__empty}>Нет изображений <Icon name="emptyBox" /></div>
                : (
                    <>
                        <div className={clsx(style.userGallery__imageList, 'mb-4')}>
                            { displayedImages.map((image, index) => (
                                <UserGalleryImage
                                    key={image.id}
                                    src={image.url}
                                    index={index}
                                    isSelected={Boolean(selectedImageUrl && selectedImageUrl === image.url)}
                                    onSelect={() => onSelect(image.url)}
                                    onDelete={() => handleSelectRemoveImage(image.id, image.url)}
                                />
                            )) }
                        </div>

                        <div className="flex justify-center">
                            { hasMore && !showAll && <Button onClick={() => setShowAll(true)} variant="secondary" size="medium" className="mt-2">Показать ещё <Icon name="arrowDown" /></Button> }
                            { showAll && <Button onClick={() => setShowAll(false)} variant="secondary" size="medium" className="mt-2">Свернуть <Icon name="arrowUp" /></Button> }
                        </div>
                    </>
                )
            }

            <ModalDeleteImage isOpen={isOpenDeleteModal} onClose={() => setIsOpenDeleteModal(false)} onConfirm={handleRemoveImage} />
        </div>
    );
}

export default UserGallery;
