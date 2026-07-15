'use client';

import Image from 'next/image';
import clsx from 'clsx';

import Button from '@bdt/shared/ui/Button';
import Icon from '@bdt/shared/ui/Icon';

import style from './UserGalleryImage.module.scss';

interface IUserGalleryImageProps {
    src: string;
    index: number;
    isSelected?: boolean;

    onSelect: () => void;
    onDelete: () => void;
};

function UserGalleryImage({ src, index, isSelected, onSelect, onDelete }: IUserGalleryImageProps) {
    return (
        <div className={clsx(style.userGalleryImage, { [style.userGalleryImage_selected]: isSelected })}>
            <Button className={style.userGalleryImage__deleteButton} onClick={onDelete} variant="light" size="small">
                <Icon className={style.userGalleryImage__deleteButtonIcon} name="delete" />
            </Button>
            <Image className={style.userGalleryImage__image} src={src} alt={`изображение ${index}`} width={200} height={200} onClick={onSelect} />
        </div>
    );
}

export default UserGalleryImage;
