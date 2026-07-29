'use client';

import Image from 'next/image';

import { formatDate } from '@bdt/shared/helpers/Date';
import { isImageUrl } from '@bdt/shared/helpers/isImageUrl';

import { LOGO_COLOR_URL } from '@bdt/shared/config/AppEnvironment';

import Badge from '@bdt/shared/ui/Badge';
import Button from '@bdt/shared/ui/Button';

import style from './Card.module.scss';

import type { TArticle } from '@bdt/shared/api/Article';

interface ICardProps {
    article: TArticle;
    href: string;
};

function Card({ article, href }: ICardProps) {
    const { title, isPinned } = article;
    const mediaSrc = article.images[0] ?? LOGO_COLOR_URL;
    const isImage = isImageUrl(mediaSrc);
    const date = article.publishedAt ?? article.updatedAt;
    const formateDate = formatDate(date, 'DD.MM.YYYY');

    return (
        <div className={style.card}>
            <div className={style.card__mediaWrapper}>
                { isImage ? <Image
                    src={mediaSrc}
                    alt={title}
                    width={280}
                    height={200}
                    className={style.card__image}
                    loading="eager"
                />
                    : <video
                        src={mediaSrc}
                        muted
                        loop
                        playsInline
                        autoPlay
                        preload="metadata"
                        className={style.card__video}
                    />
                }
            </div>

            { isPinned && <div className={style.card__badgeContainer}><Badge iconName="pinned" /></div> }

            <div className={style.card__textContainer}>
                <p className={style.card__date}>{ formateDate }</p>
                <div className={style.card__title}>{ title }</div>
            </div>
            <Button href={href} variant="primary" fullWidth className={style.card__button}>Подробнее</Button>
        </div>
    );
}

export default Card;
