//https://dev.vk.com/ru/method/wall.getById
export type TVKWallQueryParams = {
    offset?: number;
    count?: number;
};

export enum VKAttachmentType {
    VIDEO = 'video',
    PHOTO = 'photo',
};

//https://dev.vk.com/ru/reference/objects/post
export type TVKPost = {
    id: number;
    text: string;
    attachments: [
        {
            type: VKAttachmentType | string;
            photo?: {
                orig_photo: {
                    url?: string;
                }
            };
            video?: {
                id: number;
            };
        }
    ];
    owner_id: number;
};

export type TVKWallResponse = {
    response: {
        count: number;
        items: TVKPost[];
    };
};

//https://dev.vk.com/ru/method/video.get
export type TVKVideoQueryParams = {
    owner_id: number;
    video_id: number;
};

export type TVKVideo = {
    player: string;
};

export type TVKVideoResponse = {
    response: {
        count: number;
        items: TVKVideo[];
    }
};
