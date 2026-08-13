'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { isImageUrl } from '@bdt/shared/helpers/isImageUrl';

import Button from '@bdt/shared/ui/Button';
import Error from '@bdt/shared/ui/Error';
import Input from '@bdt/shared/ui/Input';
import Label from '@bdt/shared/ui/Label';
import Modal from '@bdt/shared/ui/Modal';

import style from './ImageButtonModal.module.scss';

import type { TGalleryComponent } from '../TextEditorTypes';

type TUnit = 'px' | '%';

interface IImageButtonModalProps {
    error?: string;
    initialWidth?: string;
    initialHeight?: string;
    isOpen: boolean;
    GalleryComponent: TGalleryComponent;

    onSubmit: (url: string, width?: string, height?: string) => void;
    onClose: () => void;
}

function ImageButtonModal({ isOpen, onSubmit, onClose, error, initialWidth, initialHeight, GalleryComponent }: IImageButtonModalProps) {
    const [width, setWidth] = useState<string>(initialWidth || '');
    const [height, setHeight] = useState<string>(initialHeight || '');
    const [widthUnit, setWidthUnit] = useState<TUnit>('px');
    const [heightUnit, setHeightUnit] = useState<TUnit>('px');
    const [url, setUrl] = useState<string | null>(null);
    const isImage = url ? isImageUrl(url) : false;

    useEffect(() => {
        if (isOpen) {
            setUrl(null);
            setWidth(initialWidth || '');
            setHeight(initialHeight || '');
            setWidthUnit('px');
            setHeightUnit('px');
        }
    }, [isOpen, initialWidth, initialHeight]);

    const handleSubmit = () => {
        if (!url) return;

        const widthValue = width ? `${width}${widthUnit}` : undefined;
        const heightValue = height ? `${height}${heightUnit}` : undefined;

        onSubmit(url, widthValue, heightValue);
    };

    const handleClose = () => {
        setUrl(null);
        setWidth('');
        setHeight('');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} onCancel={handleClose} title="Вставка изображения">
            <Error error={error} className="mb-2" />
            { url
                ? <>
                    <div className={style.imagePreview}>
                        { isImage ?
                            <Image src={url} alt="Выбранное изображение" fill className={style.imagePreview__image} sizes="(max-width: 768px) 100vw, 640px" />
                            :
                            <video src={url} className={style.imagePreview__image} muted loop autoPlay playsInline preload="metadata" />
                        }
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <Label className="justify-between">
                                <span>Ширина</span>
                                <div className="flex gap-1">
                                    <Button size="small" variant={widthUnit === 'px' ? 'secondary' : 'light'} onClick={() => setWidthUnit('px')}>px</Button>
                                    <Button size="small" variant={widthUnit === '%' ? 'secondary' : 'light'} onClick={() => setWidthUnit('%')}>%</Button>
                                </div>
                            </Label>
                            <Input
                                type="number"
                                value={width}
                                onChange={(e) => setWidth(e.target.value)}
                                placeholder="auto"
                                autoComplete="off"
                            />
                        </div>
                        <div>
                            <Label className="justify-between">
                                <span>Высота</span>
                                <div className="flex gap-1">
                                    <Button size="small" variant={heightUnit === 'px' ? 'secondary' : 'light'} onClick={() => setHeightUnit('px')}>px</Button>
                                    <Button size="small" variant={heightUnit === '%' ? 'secondary' : 'light'} onClick={() => setHeightUnit('%')}>%</Button>
                                </div>
                            </Label>
                            <Input
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                placeholder="auto"
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button size="medium" variant="light" onClick={handleClose} type="button">Отмена</Button>
                        <Button size="medium" variant="primary" onClick={handleSubmit} type="button" disabled={!url}>Добавить</Button>
                    </div>
                </>
                : <GalleryComponent onSelect={setUrl} text="Выберите фото для вставки" className="mb-2" />
            }
        </Modal>
    );
}

export default ImageButtonModal;
