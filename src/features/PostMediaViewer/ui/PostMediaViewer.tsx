'use client';

import { memo, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import { formatUnixToDate } from '@bdt/shared/helpers/Date';

import { VK_LOGO_URL } from '@bdt/shared/config/AppEnvironment';

import Badge from '@bdt/shared/ui/Badge';
import ExpandableText from '@bdt/shared/ui/ExpandableText';
import MediaCarousel from '@bdt/shared/ui/MediaCarousel';

import { getMedia } from '../model/getMedia';

import style from './PostMediaViewer.module.scss';

import type { TPost } from '@bdt/entities/VK';

interface IPostMediaViewerProps {
    post: TPost;
    id: string;
    isTextFirst?: boolean;
    className?: string;
};

function PostMediaViewer({ post, id, isTextFirst = false, className }: IPostMediaViewerProps) {
    const date = formatUnixToDate({ unixTimestamp: post.date, format: 'DD MMMM YYYY в HH:mm' });
    const media = useMemo(() => getMedia(post.content), [post.content]);
    return (
        <div
            className={clsx(style.postMediaViewer, className, {
                [style.postMediaViewer_textFirst]: isTextFirst,
            })}
            id={id}>
            <div className={style.postMediaViewer__media}>
                <MediaCarousel media={media} defaultImageUrl="/image/logo.svg" isVK />
            </div>
            <div className={style.postMediaViewer__textBlock}>
                <div className="flex gap-4">
                    <div className={style.postMediaViewer__title}>{ post.title }</div>
                    { post.isPinned && <Badge iconName="pinned" /> }
                    { post.isRepost && <Badge iconName="repost" /> }
                </div>

                { post.description && <ExpandableText text={post.description} maxLines={5} isShowButton /> }
                <div className={style.postMediaViewer__details}>
                    <Link
                        href={post.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={style.postMediaViewer__link}
                    >
                        <Image
                            src={VK_LOGO_URL}
                            alt="Логотип ВКонтакте"
                            width={25}
                            height={25}
                            loading="eager"
                        />
                    </Link>
                    <div className={style.postMediaViewer__date}>{ date }</div>
                </div>
            </div>
        </div>
    );
}

export default memo(PostMediaViewer);
