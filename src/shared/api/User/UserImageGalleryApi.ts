import api, { type TMessage } from '@bdt/shared/helpers/FetchHelpers';

import type { TFile } from '@bdt/shared/config/FileType';

export const getImagesGallery = (): Promise<TFile[]> => {
    return api.get('/user/gallery');
};

export const addImageGallery = (data: FormData): Promise<TFile> => {
    return api.post('/user/gallery', data);
};

export const removeImageGallery = (imageId: string): Promise<TMessage> => {
    return api.delete(`/user/gallery/${imageId}`);
};
