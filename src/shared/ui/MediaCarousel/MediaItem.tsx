'use client';

import Image from 'next/image';
import clsx from 'clsx';

import Skeleton, { SkeletonType } from '@bdt/shared/ui/Skeleton';

import style from './MediaItem.module.scss';

interface IMediaItemProps {
    isPhoto: boolean;
    mediaLoaded: boolean;
    index: number;
    link: string;
    isVK: boolean;
    size: 'small' | 'big';

    onLoad: () => void;
};

function MediaItem({ isPhoto, mediaLoaded, index, link, isVK, size, onLoad }: IMediaItemProps) {
    return (
        <div className={style.mediaItem}>
            { isPhoto ? (
                <div className={clsx(style.mediaItem__imageWrapper, { [style['mediaItem__imageWrapper-small']]: size === 'small' },)}>
                    { !mediaLoaded && (
                        <Skeleton active type={SkeletonType.Node} className={style.mediaItem__skeletonWrapper} />
                    ) }

                    <Image
                        key={index}
                        src={link}
                        alt={link}
                        className={clsx(
                            style.mediaItem__image,
                            mediaLoaded && style['mediaItem__image-loaded']
                        )}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                        onLoad={onLoad}
                        loading="eager"
                    />
                </div>
            ) : (
                <div className={clsx(style.mediaItem__videoWrapper, { [style['mediaItem__videoWrapper-small']]: size === 'small' })}>
                    { !mediaLoaded && <Skeleton active type={SkeletonType.Node} className={style.mediaItem__skeletonWrapper} /> }
                    { isVK ? (
                        <iframe
                            key={index}
                            src={link}
                            className={clsx(
                                style.mediaItem__video,
                                mediaLoaded && style['mediaItem__video-loaded']
                            )}
                            title="Video player"
                            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                            onLoad={onLoad}
                        />
                    ) : (
                        <video
                            key={index}
                            src={link}
                            className={clsx(
                                style.mediaItem__video,
                                mediaLoaded && style['mediaItem__video-loaded']
                            )}
                            controls
                            autoPlay={true}
                            playsInline
                            preload="metadata"
                            onLoadedData={onLoad}
                        />
                    ) }
                </div>
            ) }
        </div>
    );
}

export default MediaItem;
