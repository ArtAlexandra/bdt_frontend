'use client';

import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Button from '@bdt/shared/ui/Button';
import ExpandableText from '@bdt/shared/ui/ExpandableText';
import Icon from '@bdt/shared/ui/Icon';

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
    return (
        <div className={style.card}>

            { imageSrc && !videoSrc &&
                <div className={style.card__mediaWrapper}>
                    <Image
                        src={imageSrc}
                        alt={title}
                        width={100}
                        height={100}
                        className={style.card__image}
                        loading="eager"
                    />
                </div>
            }

            { videoSrc && (
                <div className={style.card__mediaWrapper}>
                    <iframe
                        src={videoSrc}
                        loading="lazy"
                        title={title}
                        height="250"
                        width="500"
                        allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                        className={style.card__video}
                        allowFullScreen
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
                            src="/image/vk_logo.png"
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
