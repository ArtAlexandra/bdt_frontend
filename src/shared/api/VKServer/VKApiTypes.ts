//https://dev.vk.com/ru/method/wall.getById
export type TVKWallQueryParams = {
    offset?: number;
    count?: number;
};

export enum VKAttachmentType {
    VIDEO = 'video',
    PHOTO = 'photo',
    SHORT_VIDEO = 'short_video',
};

type TAttachmentsType = {
    type: VKAttachmentType | string;
    photo?: {
        orig_photo: {
            url: string;
            height: number;
            width: number;
        };
        title: string;
    };
    video?: {
        first_frame?: [
            {
                url: string;
                height: number;
                width: number;
            }
        ];

        image: [
             {
                url: string;
                height: number;
                width: number;
            }
        ];
        title: string;
        description: string;
        id: number;
        type: VKAttachmentType;
        owner_id?: number;
        processing?: number;
    };
};

//https://dev.vk.com/ru/reference/objects/post
export type TVKPost = {
    id: number;
    text: string;
    hash: string;
    date: number;
    is_pinned?: number;
    copy_history?: [{
        owner_id: number;
        text: string;
        attachments: TAttachmentsType[];
    }];
    attachments: TAttachmentsType[];
    owner_id: number;
};

export type TVKWallResponse = {
    response: {
        count: number;
        items: TVKPost[];
    };
};
