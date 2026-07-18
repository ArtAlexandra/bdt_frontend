'use client';

import { useState } from 'react';
import Image from 'next/image';

import { isImageUrl } from '@bdt/shared/helpers/isImageUrl';

import Button from '@bdt/shared/ui/Button';
import Error from '@bdt/shared/ui/Error';
import Icon from '@bdt/shared/ui/Icon';
import Label from '@bdt/shared/ui/Label';
import Modal from '@bdt/shared/ui/Modal';

import style from './MediaGallery.module.scss';

import type { TGalleryComponent } from '@bdt/entities/TextEditor';
import type { TError } from '@bdt/shared/helpers/ErrorHelpers';

interface IMediaGalleryProps {
    images: string[];
    error?: TError;
    label?: string;
    className?: string;
    GalleryComponent: TGalleryComponent;

    onChange: (images: string[]) => void;
};

function MediaGallery({ images, error, label = 'Медиа', className, GalleryComponent, onChange }: IMediaGalleryProps) {
    const [isOpenGalleryComponent, setIsOpenGalleryComponent] = useState<boolean>(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);

    const handleCloseGalleryComponent = () => {
        setIsOpenGalleryComponent(false);
        setCurrentImageIndex(null);
    };

    const handleSelectImage = (url: string) => {
        if (currentImageIndex !== null) {
            // Заменяем изображение по индексу
            const newImages = [...images];
            newImages[currentImageIndex] = url;
            onChange(newImages);
            setCurrentImageIndex(null);
        } else {
            // Добавляем новое изображение
            onChange([...images, url]);
        }
        handleCloseGalleryComponent();
    };

    const handleRemoveImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        onChange(newImages);
    };

    return (
        <>
            <Modal
                title={currentImageIndex !== null ? 'Заменить файл' : 'Выберите файл'}
                isOpen={isOpenGalleryComponent}
                onCancel={handleCloseGalleryComponent}
                onClose={handleCloseGalleryComponent}
            >
                <GalleryComponent onSelect={handleSelectImage} />
            </Modal>

            <div className={className}>
                <Label text={label} />

                { error && <Error error={error} className="mb-2" /> }

                { images.length > 0 && (
                    <div className={style.mediaGallery}>
                        { images.map((image, index) => {
                            const isPhoto = isImageUrl(image);

                            return (<div key={index} className={style.mediaGallery__item}>
                                { isPhoto ? <Image
                                    src={image}
                                    alt={`Изображение ${index + 1}`}
                                    width={150}
                                    height={150}
                                    className={style.mediaGallery__image}
                                /> : <video
                                    src={image}
                                    className={style.mediaGallery__video}
                                    muted
                                    loop
                                    playsInline
                                    autoPlay
                                    preload="metadata"
                                /> }
                                <div className={style.mediaGallery__overlay}>
                                    <Button
                                        size="small"
                                        variant="secondary"
                                        className={style.mediaGallery__button}
                                        onClick={() => {
                                            setCurrentImageIndex(index);
                                            setIsOpenGalleryComponent(true);
                                        }}
                                    >
                                        <Icon name="pencil" />
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="danger"
                                        className={style.mediaGallery__button}
                                        onClick={() => handleRemoveImage(index)}
                                    >
                                        <Icon name="delete" />
                                    </Button>
                                </div>
                            </div>
                            );
                        }
                        ) }
                    </div>
                ) }

                <Button
                    size="medium"
                    variant="primary"
                    className={style.mediaGallery__addButton}
                    onClick={() => {
                        setCurrentImageIndex(null);
                        setIsOpenGalleryComponent(true);
                    }}
                >
                    <Icon name="upload" />
                    { images.length > 0 ? 'Добавить ещё изображение' : 'Выбрать медиа' }
                </Button>
            </div>
        </>
    );
}

export default MediaGallery;
