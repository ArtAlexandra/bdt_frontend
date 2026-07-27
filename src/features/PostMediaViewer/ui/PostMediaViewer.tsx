'use client';

import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import { formatDate } from '@bdt/shared/helpers/Date';
import { PublicArticleType, type TPublicArticle } from '@bdt/shared/helpers/PublicArticle';

import { LOGO_COLOR_URL, VK_LOGO_URL } from '@bdt/shared/config/AppEnvironment';

import Badge from '@bdt/shared/ui/Badge';
import ExpandableText from '@bdt/shared/ui/ExpandableText';
import Icon from '@bdt/shared/ui/Icon';
import MediaCarousel from '@bdt/shared/ui/MediaCarousel';

import { TextPreview } from '@bdt/entities/TextEditor';

import style from './PostMediaViewer.module.scss';

interface IPostMediaViewerProps {
    post: TPublicArticle;
    id: string;
    isTextFirst?: boolean;
    className?: string;
};

function PostMediaViewer({ post, id, isTextFirst = false, className }: IPostMediaViewerProps) {
    const date = formatDate(post.date, 'DD.MM.YYYY');
    const isVK = post.type === PublicArticleType.VK;

    return (
        <div
            className={clsx(style.postMediaViewer, className, {
                [style.postMediaViewer_textFirst]: isTextFirst,
            })}
            id={id}>
            <div className={style.postMediaViewer__media}>
                <MediaCarousel media={post.media || []} defaultImageUrl={LOGO_COLOR_URL} isVK={isVK} />
            </div>
            <div className={style.postMediaViewer__textBlock}>
                <div className="flex gap-4">
                    <div className={style.postMediaViewer__title}>{ post.title }</div>
                    { post.isPinned && <Badge iconName="pinned" /> }
                    { post.isRepost && <Badge iconName="repost" /> }
                </div>

                { post.content &&
                    (post.type === PublicArticleType.VK ?
                        <ExpandableText text={post.content} maxLines={5} isShowButton />
                        : <TextPreview data={post.content} />
                    ) }

                <div className={style.postMediaViewer__details}>
                    <Link
                        href={post.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={style.postMediaViewer__link}
                    >
                        { isVK ?
                            <Image
                                src={VK_LOGO_URL}
                                alt="Логотип ВКонтакте"
                                width={25}
                                height={25}
                                loading="eager"
                            />
                            :
                            <Icon name="world" className="text-[25px]" />
                        }
                    </Link>
                    <div className={style.postMediaViewer__date}>{ date }</div>
                </div>
            </div>
        </div>
    );
}

export default memo(PostMediaViewer);
