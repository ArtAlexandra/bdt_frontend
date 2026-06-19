import vkApi from '@bdt/shared/helpers/VKFetchHelpers';

import { BDT_VK_DOMAIN, VK_SERVICE_KEY, VK_VERSION } from '@bdt/shared/config/AppEnvironment';

import type { TVKVideoQueryParams, TVKVideoResponse, TVKWallQueryParams, TVKWallResponse } from './VKApiTypes';

//https://dev.vk.com/ru/method/wall.get
export const getVKWall = (params: TVKWallQueryParams): Promise<TVKWallResponse> => {
    return vkApi.get('/wall.get', {
        params: {
            ...params,
            domain: BDT_VK_DOMAIN,
            access_token: VK_SERVICE_KEY,
            v: VK_VERSION
        }
    });
};

//https://dev.vk.com/ru/method/video.get
export const getVKVideo = (params: TVKVideoQueryParams): Promise<TVKVideoResponse> => {
    return vkApi.get('/video.get', {
        params: {
            access_token: VK_SERVICE_KEY,
            v: VK_VERSION,
            videos: `${params.owner_id}_${params.video_id}`,
            owner_id: params.owner_id
        }
    });
};
