'use client';

import { memo, useCallback, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

import Button from '@bdt/shared/ui/Button';
import Icon from '@bdt/shared/ui/Icon';

import Dots from './Dots';
import MediaItem from './MediaItem';

import style from './MediaCarousel.module.scss';

export type TMediaCarouselType = {
    link: string;
    isPhoto: boolean;
};

interface IMediaCarouselProps {
    media: TMediaCarouselType[];
    defaultImageUrl: string;
    isVK?: boolean;
    className?: string;
};

function MediaCarousel({ media, defaultImageUrl, isVK = false, className }: IMediaCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [mediaLoaded, setMediaLoaded] = useState<boolean>(false);

    const handlePrevious = useCallback(() => {
        setCurrentIndex(prev => (prev === 0 ? media.length - 1 : prev - 1));
        setMediaLoaded(false);
    }, [media.length]);

    const handleNext = useCallback(() => {
        setCurrentIndex(prev => (prev === media.length - 1 ? 0 : prev + 1));
        setMediaLoaded(false);
    }, [media.length]);

    if (media.length === 0) {
        return (
            <Image
                src={defaultImageUrl}
                alt="Картинка к посту"
                width={0}
                height={0}
                sizes="100vw"
                className={className}
                style={{ width: '100%', height: 'auto' }}
            />
        );
    }
    const currentMedia = media[currentIndex];

    return (
        <div className={clsx(style.mediaCarousel, className)}>
            <div className={style.mediaCarousel__container}>
                <MediaItem isVK={isVK} isPhoto={currentMedia.isPhoto} link={currentMedia.link} mediaLoaded={mediaLoaded} index={currentIndex} onLoad={() => setMediaLoaded(true)} />
                { media.length > 1 && (
                    <>
                        <Button
                            variant="transparent"
                            className={clsx(style.mediaCarousel__button, style['mediaCarousel__button--prev'])}
                            onClick={handlePrevious}
                            aria-label="Предыдущий слайд"
                        >
                            <Icon name="arrowCircleLeft" className={style['mediaCarousel__button-icon']} />
                        </Button>

                        <Button
                            variant="transparent"
                            className={clsx(style.mediaCarousel__button, style['mediaCarousel__button--next'])}
                            onClick={handleNext}
                            aria-label="Следующий слайд"
                        >
                            <Icon name="arrowCircleRight" className={style['mediaCarousel__button-icon']} />
                        </Button>

                        <div className={style.mediaCarousel__counter}>
                            { currentIndex + 1 } / { media.length }
                        </div>
                    </>
                ) }
            </div>

            { media.length > 1 && (
                <Dots
                    mediaSize={media.length}
                    currentIndex={currentIndex}
                    onClick={setCurrentIndex}
                    className="mt-3"
                />
            ) }
        </div>
    );
}

export default memo(MediaCarousel);
