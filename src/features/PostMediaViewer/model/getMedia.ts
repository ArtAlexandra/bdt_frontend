import { VKAttachmentType } from '@bdt/shared/api/VKServer';

import type { TContent } from '@bdt/entities/VK';
import type { TMediaCarouselType } from '@bdt/shared/ui/MediaCarousel';

export const getMedia = (content?: TContent[]): TMediaCarouselType[] => {
    if (!content || content.length == 0) return [];

    return content.map((data) => ({
        link: data.link,
        isPhoto: data.type === VKAttachmentType.PHOTO ? true : false,
    }));
};
