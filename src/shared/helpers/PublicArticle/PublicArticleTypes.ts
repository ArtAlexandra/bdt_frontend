import type { TMediaCarouselType } from '@bdt/shared/ui/MediaCarousel';

export enum PublicArticleType {
    VK = 'vk',
    SITE = 'site'
};

export type TPublicArticle = {
    id: string | number;
    type: PublicArticleType,
    content?: string;
    date: Date;
    title: string;
    href: string;
    isPinned: boolean;
    isRepost: boolean;
    media?: TMediaCarouselType[];
};
