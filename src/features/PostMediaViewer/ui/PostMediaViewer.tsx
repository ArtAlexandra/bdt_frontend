'use client';

import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import { formatUnixToDate } from '@bdt/shared/helpers/Date';

import { VK_PUBLIC_WALL_URL } from '@bdt/shared/config/AppEnvironment';

import ExpandableText from '@bdt/shared/ui/ExpandableText';
import Icon from '@bdt/shared/ui/Icon';

import MediaCarousel from './MediaCarousel';

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
    const href = `${VK_PUBLIC_WALL_URL}${post.ownerId}_${post.id}`;

    return (
        <div
            className={clsx(style.postMediaViewer, className, {
                [style.postMediaViewer_textFirst]: isTextFirst,
            })}
            id={id}>
            <div className={style.postMediaViewer__media}>
                <MediaCarousel media={post.content} />
            </div>
            <div className={style.postMediaViewer__textBlock}>
                <div className="flex gap-4">
                    <div className={style.postMediaViewer__title}>{ post.title }</div>
                    { post.isPinned && <div className={style.postMediaViewer__badge}><Icon name="pinned" /></div> }
                    { post.isRepost && <div className={style.postMediaViewer__badge}><Icon name="repost" /></div> }
                </div>

                { post.description && <ExpandableText text={post.description} maxLines={5} isShowButton /> }
                <div className={style.postMediaViewer__details}>
                    <Link
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={style.postMediaViewer__link}
                    >
                        <Image
                            src="/image/vk_logo.png"
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
