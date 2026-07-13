/* eslint-disable @next/next/no-img-element */

import React, { Suspense, useRef } from 'react';

import type { NodeKey } from 'lexical';

const imageCache = new Set();

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

interface IImageComponentProps {
    src: string;
    altText: string;
    nodeKey: NodeKey;
    width?: string;
    height?: string;
}

const ImageComponent = ({ src, altText, width, height }: IImageComponentProps): React.JSX.Element => {
    const imageRef = useRef<null | HTMLImageElement>(null);

    return (
        <Suspense fallback={null}>
            <LazyImage
                src={src}
                altText={altText}
                imageRef={imageRef}
                width={width}
                height={height}
            />
        </Suspense>
    );
};

export default ImageComponent;
