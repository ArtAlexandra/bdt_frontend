'use client';

import { memo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import { formatDate } from '@bdt/shared/helpers/Date';
import { PublicArticleType, type TPublicArticle } from '@bdt/shared/helpers/PublicArticle';

import { LOGO_COLOR_URL, VK_LOGO_URL } from '@bdt/shared/config/AppEnvironment';

import Badge from '@bdt/shared/ui/Badge';
import Button from '@bdt/shared/ui/Button';
import Icon from '@bdt/shared/ui/Icon';
import Skeleton, { SkeletonType } from '@bdt/shared/ui/Skeleton';

import style from './Card.module.scss';

interface ICardProps {
    post: TPublicArticle;

    onClick: () => void;
};

function Card({ post, onClick }: ICardProps) {
    const { date, title, href, isPinned, isRepost, type } = post;
    const isPostFromSite = type === PublicArticleType.SITE;
    const [mediaLoaded, setMediaLoaded] = useState<boolean>(isPostFromSite ? true : false);
    const imageSrc = post.media?.length && post.media[0].isPhoto ? post.media[0].link : LOGO_COLOR_URL;
    const videoSrc = post.media?.length && !post.media[0].isPhoto ? post.media[0].link : undefined;
    const showImage = imageSrc && !videoSrc;
    const formateDate = formatDate(date, 'DD.MM.YYYY');

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

                    { isPostFromSite ?
                        <video
                            src={videoSrc}
                            muted
                            loop
                            playsInline
                            autoPlay
                            preload="metadata"
                            className={style.card__video}
                        />
                        :
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
                    }

                </div>
            ) }

            <div className={style.card__badgeContainer}>
                { isPinned && <Badge iconName="pinned" /> }
                { isRepost && <Badge iconName="repost" /> }
            </div>

            <div className={style.card__content}>
                <div className={style.card__header}>
                    <p className={style.card__date}>{ formateDate }</p>
                    <Link
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={style.card__link}
                    >
                        { isPostFromSite ?
                            <Icon name="world" className="text-[25px]" />
                            :
                            <Image src={VK_LOGO_URL} alt="Логотип ВК" width={25} height={25} />
                        }
                    </Link>
                </div>

                <div className={style.card__title}>{ title }</div>

                <Button onClick={onClick} variant="light" fullWidth className={style.card__button}><Icon name="arrowCircleRight" />Подробнее</Button>
            </div>
        </div>
    );
}

export default memo(Card);
