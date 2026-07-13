import { useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import Button from '@bdt/shared/ui/Button';
import Icon from '@bdt/shared/ui/Icon';

import { INSERT_IMAGE_COMMAND } from '../../model/ImagePlugin';

import ImageButtonModal from './ImageButtonModal';

import type { TGalleryComponent } from '../TextEditorTypes';

interface IImageButtonProps {
    className?: string;
    GalleryComponent: TGalleryComponent;
};

function ImageButton({ className, GalleryComponent }: IImageButtonProps) {
    const [editor] = useLexicalComposerContext();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleGetUrl = (src: string, width?: string, height?: string) => {
        editor.dispatchCommand(INSERT_IMAGE_COMMAND, { src, width, height, altText: 'изображение к описанию' });
        setError('');
        setIsOpen(false);
    };

    const handleOpenModal = () => {
        setError('');
        setIsOpen(true);
    };

    return (
        <>
            <Button size="medium" variant="light" onClick={handleOpenModal} className={className}>
                <Icon name="addImage" />
            </Button>

            <ImageButtonModal isOpen={isOpen} onSubmit={handleGetUrl} onClose={() => setIsOpen(false)} error={error} GalleryComponent={GalleryComponent} />
        </>
    );
}

export default ImageButton;
