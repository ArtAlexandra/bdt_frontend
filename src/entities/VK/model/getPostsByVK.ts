import { type TVKPost, VKAttachmentType } from '@bdt/shared/api/VKServer';

import { BDT_VK_DOMAIN } from '@bdt/shared/config/AppEnvironment';

import type { TContent, TPost } from './PostTypes';

const getDescription = (post: TVKPost) => {
    if (post?.copy_history) return post.copy_history?.[0].text;
    return post.text;
};

const getTitle = (text: string) => {
    const sentences = text.split(/[.!?]\s+/);
    const title = sentences[0];
    return title;
};

const getVideoURL = (ownerId: number, videoId: number) => `https://vk.com/video_ext.php?oid=${ownerId}&id=${videoId}&autoplay=1&loop=1&mute=1`;

const getOwnerId = (post: TVKPost) => {
    if (post?.copy_history?.[0].owner_id) return post?.copy_history?.[0].owner_id;

    return post.owner_id;
};

const getValidAttachmentType = (type: string): VKAttachmentType | null => {
    const validTypes = Object.values(VKAttachmentType);
    return validTypes.includes(type as VKAttachmentType) ? (type as VKAttachmentType) : null;
};

const DEFAULT_IMAGE_SRC = '/image/gold_fish.jpg';
const DEFAULT_TITLE_POST = `Пост @${BDT_VK_DOMAIN}`;
const DEFAULT_TITLE_SHORT_VIDEO = `Клип @${BDT_VK_DOMAIN}`;

const getPostByVK = (post: TVKPost): TPost | null => {
    try {
        const id = post.id;
        const text = getDescription(post);
        const title = getTitle(text);
        const isPinned = Boolean(post.is_pinned);
        const isRepost = Boolean(post.copy_history);
        const date = post.date;
        let ownerId = getOwnerId(post);
        const attachments = post.copy_history?.[0]?.attachments || post.attachments || [];

        const content: TContent[] = [];

        for (const attachment of attachments) {
            try {
                // исключаем записи, которые не входят в список VKAttachmentType. Например, link
                const validType = getValidAttachmentType(attachment.type);
                if (!validType) continue;

                let type: VKAttachmentType = validType;
                let link: string | undefined;
                let height = 0;
                let width = 0;
                let videoId = 0;

                if (attachment.photo?.orig_photo?.url) {
                    link = attachment.photo.orig_photo.url;
                    height = attachment.photo.orig_photo.height;
                    width = attachment.photo.orig_photo.width;

                } else if (attachment.video) {
                    if (attachment.video.processing) continue; // processing = 1 означает, что видеоролик находится в процессе обработки (отображается с ошибкой, поэтому специально пропускаю эту запись)

                    // если запись является репостом, то у такого ролика другой хозяин (выявлена такая проблема только у видео)
                    if (attachment.video?.owner_id) ownerId = attachment.video.owner_id;
                    videoId = attachment.video.id;

                    link = getVideoURL(ownerId, videoId);
                    height = attachment.video.first_frame[0].height;
                    width = attachment.video.first_frame[0].width;

                    // attachment.video - это общее "понятие" видео, в attachment.video.type хранится "short_video" и "video"
                    type = attachment.video.type;
                }

                if (link) {
                    content.push({
                        type,
                        link,
                        height,
                        width
                    });
                }
            } catch (error) {
                console.warn(`Error processing attachment in post ${post.id}:`, error);
                continue;
            }
        };

        if (!content.length) return null;

        // firstType, firstLink нужны для отображения в карточках
        const firstType = content[0].type;
        const isFirstShortVideo = firstType === VKAttachmentType.SHORT_VIDEO;
        const defaultTitle = isFirstShortVideo ? DEFAULT_TITLE_SHORT_VIDEO : DEFAULT_TITLE_POST;
        const firstLink = isFirstShortVideo ? (attachments[0].video?.first_frame[0].url ?? DEFAULT_IMAGE_SRC) : content[0].link;

        return {
            id,
            title: title || defaultTitle,
            description: text,
            date,
            content,
            ownerId,
            isPinned,
            isRepost,
            firstType,
            firstLink,
        };
    } catch (error) {
        console.error(`Error processing post ${post.id}:`, error);
        return null;
    }
};

export const getPostsByVK = (posts: TVKPost[]): TPost[] => {
    const data: TPost[] = [];

    posts.forEach((post) => {
        try {
            const item = getPostByVK(post);
            if (item) {
                data.push(item);
            }
        } catch (error) {
            console.error(`Failed to process post ${post.id}:`, error);
        }
    });

    return data;
};