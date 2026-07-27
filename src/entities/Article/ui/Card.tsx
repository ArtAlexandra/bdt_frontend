'use client';

import { memo } from 'react';
import Image from 'next/image';

import { isImageUrl } from '@bdt/shared/helpers/isImageUrl';

import { LOGO_COLOR_URL } from '@bdt/shared/config/AppEnvironment';

import Button from '@bdt/shared/ui/Button';
import ExpandableText from '@bdt/shared/ui/ExpandableText';

import style from './Card.module.scss';

import type { TArticle } from '@bdt/shared/api/Article';

interface ICardProps {
    post: TArticle;
    href: string;
};

function Card({ post, href }: ICardProps) {
    const isPostHasImage = !!post.images.length;
    const src = isPostHasImage ? post.images[0] : LOGO_COLOR_URL;
    const isFirstSrcImage = isImageUrl(src);

    return (
        <div className={style.card}>
            <div className={style.card__mediaWrapper}>
                { isFirstSrcImage ?
                    <Image
                        src={src}
                        alt={post.title}
                        fill
                        loading="eager"
                    />
                    : <video
                        src={src}
                        muted
                        loop
                        playsInline
                        autoPlay
                        preload="metadata"
                    />
                }
            </div>
            <div className={style.card__content}>
                <ExpandableText className={style.card__title}>{ post.title }</ExpandableText>
                <Button href={href} variant="secondary" fullWidth className={style.card__button}>Редактировать</Button>
            </div>
        </div>
    );
}

export default memo(Card);
