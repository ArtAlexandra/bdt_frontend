import { isImageUrl } from '@bdt/shared/helpers/isImageUrl';

import type { TMediaCarouselType } from '@bdt/shared/ui/MediaCarousel';

export const getMedia = (links?: string[]): TMediaCarouselType[] => {
    if (!links || links.length === 0) return [];

    return links.map((link) => {
        return ({
            link,
            isPhoto: isImageUrl(link),
        });
    });
};
