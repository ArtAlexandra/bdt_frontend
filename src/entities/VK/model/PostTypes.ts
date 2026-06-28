import { VKAttachmentType } from '@bdt/shared/api/VKServer';

export type TContent = {
    link: string;
    width: number;
    height: number;
    type: VKAttachmentType;
};

export type TPost = {
    id: number;
    ownerId: number;
    title: string;
    description: string;
    date: number;
    content: TContent[];
    isPinned: boolean;
    isRepost: boolean;
    firstLink: string;
    firstType: VKAttachmentType;
    href: string;
};
