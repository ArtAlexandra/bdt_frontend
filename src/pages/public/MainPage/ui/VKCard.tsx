'use client';

import { memo } from 'react';
import { useRouter } from 'next/navigation';

import { VKAttachmentType } from '@bdt/shared/api/VKServer';
import { formatUnixToDate } from '@bdt/shared/helpers/Date';

import { ROUTES } from '@bdt/shared/config/Routes';

import Card from '@bdt/shared/ui/Card';

import type { TPost } from '@bdt/entities/VK';

interface IVKCardProps {
    post: TPost;
};

function VKCard({ post }: IVKCardProps) {
    const date = formatUnixToDate({ unixTimestamp: post.date, format: 'DD.MM.YYYY' });
    const isFirstVideo = post.firstType === VKAttachmentType.VIDEO;
    const router = useRouter();

    const handleReadMore = () => {
        router.push(`${ROUTES.public.news.path}#post-${post.id}`);
    };

    return <Card
        imageSrc={post.firstLink}
        videoSrc={isFirstVideo ? post.firstLink : undefined}
        title={post.title}
        date={date}
        href={post.href}
        isPinned={post.isPinned}
        isRepost={post.isRepost}
        onClick={handleReadMore} />;
}

export default memo(VKCard);
