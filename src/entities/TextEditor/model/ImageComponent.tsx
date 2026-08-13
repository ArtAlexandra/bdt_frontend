/* eslint-disable @next/next/no-img-element */

import React, { Suspense, useRef } from 'react';

import { isImageUrl } from '@bdt/shared/helpers/isImageUrl';

import type { NodeKey } from 'lexical';

const imageCache = new Set();
const videoCache = new Set();

const useSuspenseImage = (src: string) => {
    if (imageCache.has(src)) return;

    throw new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            imageCache.add(src);
            resolve(null);
        };
    });
};

const useSuspenseVideo = (src: string) => {
    if (videoCache.has(src)) return;

    throw new Promise((resolve) => {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.muted = true;
        video.src = src;

        const onReady = () => {
            videoCache.add(src);
            cleanup();
            resolve(null);
        };

        const onError = () => {
            cleanup();
            resolve(null);
        };

        const cleanup = () => {
            video.removeEventListener('loadedmetadata', onReady);
            video.removeEventListener('error', onError);
            video.src = '';
        };

        video.addEventListener('loadedmetadata', onReady);
        video.addEventListener('error', onError);
    });
};

interface ILazyImageProps {
    altText: string;
    className?: string;
    imageRef: { current: null | HTMLImageElement };
    src: string;
    width?: string;
    height?: string;
}

const LazyImage = ({ altText, className, imageRef, src, width, height }: ILazyImageProps): React.JSX.Element => {
    useSuspenseImage(src);

    return (
        <img
            className={className}
            src={src}
            alt={altText}
            ref={imageRef}
            style={{
                maxWidth: '100%',
                width: width || 'auto',
                height: height || 'auto',
                display: 'inline-block'
            }}
        />
    );
};

interface ILazyVideoProps {
    className?: string;
    videoRef: { current: null | HTMLVideoElement };
    src: string;
    width?: string;
    height?: string;
}

const LazyVideo = ({ className, videoRef, src, width, height }: ILazyVideoProps): React.JSX.Element => {
    useSuspenseVideo(src);

    return <video
        className={className}
        src={src}
        muted
        loop
        autoPlay
        playsInline
        preload="metadata"
        ref={videoRef}
        style={{
            maxWidth: '100%',
            width: width || 'auto',
            height: height || 'auto',
            display: 'inline-block'
        }}
    />;
};

interface IImageComponentProps {
    src: string;
    altText: string;
    nodeKey: NodeKey;
    width?: string;
    height?: string;
}

const ImageComponent = ({ src, altText, width, height }: IImageComponentProps): React.JSX.Element => {
    const imageRef = useRef<null | HTMLImageElement>(null);
    const videoRef = useRef<null | HTMLVideoElement>(null);
    const isImage = isImageUrl(src);

    return (
        <Suspense fallback={null}>
            { isImage ?
                <LazyImage
                    src={src}
                    altText={altText}
                    imageRef={imageRef}
                    width={width}
                    height={height}
                />
                :
                <LazyVideo
                    src={src}
                    videoRef={videoRef}
                    width={width}
                    height={height}
                />
            }
        </Suspense>
    );
};

export default ImageComponent;
