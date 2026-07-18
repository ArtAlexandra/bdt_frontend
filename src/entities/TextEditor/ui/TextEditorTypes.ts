import type { ComponentType } from 'react';

interface IGalleryComponentProps {
    text?: string;
    className?: string;
    /** URL выбранного изображения — подсветка в сетке галереи */
    selectedImageUrl?: string;

    onSelect: (url: string) => void;
}

export type TGalleryComponent = ComponentType<IGalleryComponentProps>;
