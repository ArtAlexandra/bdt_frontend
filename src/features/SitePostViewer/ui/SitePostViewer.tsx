'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import { formatDate } from '@bdt/shared/helpers/Date';

import { LOGO_COLOR_URL } from '@bdt/shared/config/AppEnvironment';
import { ROUTES } from '@bdt/shared/config/Routes';

import Badge from '@bdt/shared/ui/Badge';
import Icon from '@bdt/shared/ui/Icon';
import MediaCarousel from '@bdt/shared/ui/MediaCarousel';

import { TextPreview } from '@bdt/entities/TextEditor';

import { getMedia } from '../model/getMedia';

import style from './SitePostViewer.module.scss';

import type { TArticle } from '@bdt/shared/api/Article';

interface ISitePostViewerProps {
    post: TArticle;
    id: string;
    isTextFirst?: boolean;
    className?: string;
};

function SitePostViewer({ post, id, isTextFirst = false, className }: ISitePostViewerProps) {
    const date = post.publishedAt ? formatDate(post.publishedAt, 'DD MMMM YYYY в HH:mm') : formatDate(new Date(), 'DD MMMM YYYY в HH:mm');
    const media = useMemo(() => getMedia(post.images), [post.images]);

    return (
        <div
            className={clsx(style.sitePostViewer, className, {
                [style.sitePostViewer_textFirst]: isTextFirst,
            })}
            id={id}
        >
            <MediaCarousel media={media} defaultImageUrl={LOGO_COLOR_URL} className={style.sitePostViewer__media} />

            <div className={style.sitePostViewer__textBlock}>
                <div className="flex gap-4">
                    { post.isPinned && <Badge iconName="pinned" /> }
                    <div className={style.sitePostViewer__title}>{ post.title }</div>
                </div>

                { post.content && (
                    <div className={style.sitePostViewer__content}>
                        <TextPreview data={post.content} />
                    </div>
                ) }

                <div className={style.sitePostViewer__details}>
                    <Link
                        href={ROUTES.public.home.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={style.sitePostViewer__link}
                    >
                        <Icon name="world" className="text-[25px]" />
                    </Link>
                    <div className={style.sitePostViewer__date}>{ date }</div>
                </div>
            </div>
        </div>
    );
}

export default SitePostViewer;
