'use client';

import { memo, useCallback, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

import { VKAttachmentType } from '@bdt/shared/api/VKServer';

import Button from '@bdt/shared/ui/Button';
import Icon from '@bdt/shared/ui/Icon';
import Skeleton, { SkeletonType } from '@bdt/shared/ui/Skeleton';

import Dots from './Dots';

import style from './MediaCarousel.module.scss';

import type { TContent } from '@bdt/entities/VK';

interface IMediaCarouselProps {
    media: TContent[];
    className?: string;
};

function MediaCarousel({ media, className }: IMediaCarouselProps) {
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

    const currentMedia = media[currentIndex];
    const isPhoto = currentMedia.type === VKAttachmentType.PHOTO;
    const isVerticalFormat = currentMedia.type === VKAttachmentType.PHOTO || currentMedia.type === VKAttachmentType.SHORT_VIDEO;

    // Вычисляем соотношение сторон для текущего медиа
    const getAspectRatio = () => {
        if (!isVerticalFormat) return '16 / 9'; // Для видео стандартное соотношение

        const { width, height } = currentMedia;
        if (!width || !height) return '1 / 1';

        return `${width} / ${height}`;
    };

    return (
        <div className={clsx(style.mediaCarousel, className)}>
            <div className={style.mediaCarousel__container}>
                <div
                    className={style.mediaCarousel__wrapper}
                    style={{ aspectRatio: getAspectRatio() }}
                >
                    { isPhoto ? (
                        <div className={style.mediaCarousel__imageWrapper}>
                            { !mediaLoaded && (
                                <div className={style.mediaCarousel__skeletonWrapper}>
                                    <Skeleton active type={SkeletonType.Node} height={currentMedia.height} width={currentMedia.width} />
                                </div>
                            ) }

                            <Image
                                src={currentMedia.link}
                                alt={currentMedia.link}
                                className={clsx(
                                    style.mediaCarousel__image,
                                    mediaLoaded && style['mediaCarousel__image-loaded']
                                )}
                                fill
                                loading="eager"
                                sizes="(max-width: 400px) 100vw, 400px"
                                onLoad={() => setMediaLoaded(true)}
                            />
                        </div>
                    ) : (
                        <div className={style.mediaCarousel__videoWrapper}>
                            { !mediaLoaded && (
                                <div className={style.mediaCarousel__skeletonWrapper}>
                                    <Skeleton active type={SkeletonType.Node} height={currentMedia.height} width={currentMedia.width} />
                                </div>
                            ) }
                            <iframe
                                src={currentMedia.link}
                                className={clsx(
                                    style.mediaCarousel__video,
                                    mediaLoaded && style['mediaCarousel__video-loaded']
                                )}
                                title="Video player"
                                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                                allowFullScreen
                                loading="lazy"
                                onLoad={() => setMediaLoaded(true)}
                            />
                        </div>
                    ) }
                </div>

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
                    media={media}
                    currentIndex={currentIndex}
                    onSetCuttentIndex={setCurrentIndex}
                    className="mt-3"
                />
            ) }
        </div>
    );
}

export default memo(MediaCarousel);