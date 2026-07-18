'use client';

import { memo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import { VK_LOGO_URL } from '@bdt/shared/config/AppEnvironment';

import Button from '@bdt/shared/ui/Button';
import ExpandableText from '@bdt/shared/ui/ExpandableText';
import Icon from '@bdt/shared/ui/Icon';
import Skeleton, { SkeletonType } from '@bdt/shared/ui/Skeleton';

import style from './Card.module.scss';

interface ICardProps {
    imageSrc?: string;
    videoSrc?: string;
    date: string;
    title: string;
    href: string;
    isPinned: boolean;
    isRepost: boolean;

    onClick: () => void;
};

function Card({ imageSrc, videoSrc, date, title, href, isPinned, isRepost, onClick }: ICardProps) {
    const [mediaLoaded, setMediaLoaded] = useState<boolean>(false);
    const showImage = imageSrc && !videoSrc;

    return (
        <div className={style.card}>

            { showImage && (
                <div className={style.card__mediaWrapper}>
                    { !mediaLoaded && (
                        <div className={style.card__mediaSkeleton}>
                            <Skeleton active type={SkeletonType.Node} height={200} width={280} />
                        </div>
                    ) }

                    <Image
                        src={imageSrc}
                        alt={title}
                        width={280}
                        height={200}
                        className={clsx(style.card__image, { [style['card__image-loaded']]: mediaLoaded })}
                        loading="eager"
                        onLoad={() => setMediaLoaded(true)}
                    />
                </div>
            ) }

            { videoSrc && (
                <div className={style.card__mediaWrapper}>
                    { !mediaLoaded && (
                        <div className={style.card__mediaSkeleton}>
                            <Skeleton active type={SkeletonType.Node} height={200} width={280} />
                        </div>
                    ) }

                    <iframe
                        src={videoSrc}
                        loading="lazy"
                        title={title}
                        height="250"
                        width="500"
                        allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                        className={style.card__video}
                        allowFullScreen
                        onLoad={() => setMediaLoaded(true)}
                    />
                </div>
            ) }
            { isPinned && (
                <div className={style.card__badge}>
                    <Icon name="pinned" />
                </div>
            ) }

            { isRepost && (
                <div className={style.card__badge}>
                    <Icon name="repost" />
                </div>
            ) }

            <div className={style.card__content}>
                <div className={style.card__header}>
                    <p className={style.card__date}>{ date }</p>
                    <Link
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={style.card__link}
                    >
                        <Image
                            src={VK_LOGO_URL}
                            alt="Логотип ВКонтакте"
                            width={25}
                            height={25}
                        />
                    </Link>
                </div>

                <ExpandableText text={title} className={style.card__title} maxLines={2} />

                <Button onClick={onClick} variant="light" className={style.card__button}><Icon name="arrowCircleRight" />Подробнее</Button>
            </div>
        </div>
    );
}

export default memo(Card);
