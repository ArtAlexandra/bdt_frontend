import type { TFile } from '@bdt/shared/config/FileType';

export type TUser = {
    id: string;
    email: string;
    isAdmin: boolean;
    logoId?: string;
    logo?: TFile;
    createdAt: string;
    updatedAt: string;
};
