import { type TVKPost, VKAttachmentType } from '@bdt/shared/api/VKServer';
import { PublicArticleType, type TPublicArticle } from '@bdt/shared/helpers/PublicArticle';

import { BDT_VK_DOMAIN, VK_PUBLIC_WALL_URL } from '@bdt/shared/config/AppEnvironment';

import { getMedia } from './getMedia';

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

const getPostHref = (postOwnerId: number, postId: number) => `${VK_PUBLIC_WALL_URL}${postOwnerId}_${postId}`;

const getOwnerId = (post: TVKPost) => {
    if (post?.copy_history?.[0].owner_id) return post?.copy_history?.[0].owner_id;

    return post.owner_id;
};

const getValidAttachmentType = (type: string): VKAttachmentType | null => {
    const validTypes = Object.values(VKAttachmentType);
    return validTypes.includes(type as VKAttachmentType) ? (type as VKAttachmentType) : null;
};

const DEFAULT_TITLE_POST = `Пост @${BDT_VK_DOMAIN}`;
const DEFAULT_TITLE_SHORT_VIDEO = `Клип @${BDT_VK_DOMAIN}`;

const mapVKPostToPublic = (post: TVKPost): TPublicArticle | null => {
    try {
        const id = post.id;
        const text = getDescription(post);
        const title = getTitle(text);
        const isPinned = Boolean(post.is_pinned);
        const isRepost = Boolean(post.copy_history);
        const date = new Date(post.date * 1000);
        let ownerId = getOwnerId(post); // это owner_id хозяина контента (в случае репоста это owner_id другой группы)
        const postOwerId = post.owner_id; // это owner_id хозяина группы (для ссылки на пост в группу)
        const attachments = post.copy_history?.[0]?.attachments || post.attachments || [];

        const content: { link: string, type: VKAttachmentType }[] = [];

        for (const attachment of attachments) {
            try {
                // исключаем записи, которые не входят в список VKAttachmentType. Например, link
                const validType = getValidAttachmentType(attachment.type);
                if (!validType) continue;

                let type: VKAttachmentType = validType;
                let link: string | undefined;
                let videoId = 0;

                if (attachment.photo?.orig_photo?.url) {
                    link = attachment.photo.orig_photo.url;

                } else if (attachment.video) {
                    if (attachment.video.processing) continue; // processing = 1 означает, что видеоролик находится в процессе обработки (отображается с ошибкой, поэтому специально пропускаю эту запись)

                    // если запись является репостом, то у такого ролика другой хозяин (выявлена такая проблема только у видео)
                    if (attachment.video?.owner_id) ownerId = attachment.video.owner_id;
                    videoId = attachment.video.id;

                    link = getVideoURL(ownerId, videoId);

                    // attachment.video - это общее "понятие" видео, в attachment.video.type хранится "short_video" и "video"
                    type = attachment.video.type;
                }

                if (link) {
                    content.push({
                        type,
                        link,
                    });
                }
            } catch (error) {
                console.warn(`Error processing attachment in post ${post.id}:`, error);
                continue;
            }
        };

        if (!content.length) return null;

        // firstLink, firstFrame нужны для отображения в карточках
        const isFirstShortVideo = content[0].type === VKAttachmentType.SHORT_VIDEO;
        const defaultTitle = isFirstShortVideo ? DEFAULT_TITLE_SHORT_VIDEO : DEFAULT_TITLE_POST;
        const href = getPostHref(postOwerId, id);
        const media = getMedia(content);

        return {
            id,
            type: PublicArticleType.VK,
            title: title || defaultTitle,
            content: text,
            date,
            isPinned,
            isRepost,
            href,
            media,
        };
    } catch (error) {
        console.error(`Error processing post ${post.id}:`, error);
        return null;
    }
};

export const mapVKPostsToPublic = (posts: TVKPost[]): TPublicArticle[] => {
    const data: TPublicArticle[] = [];

    posts.forEach((post) => {
        try {
            const item = mapVKPostToPublic(post);
            if (item) {
                data.push(item);
            }
        } catch (error) {
            console.error(`Failed to process post ${post.id}:`, error);
        }
    });

    return data;
};
