const ImageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico', 'tiff', 'avif'];

export const isImageUrl = (url: string) => {
    const extension = url.split('.').pop()?.toLowerCase() || '';
    const isImage = ImageExtensions.includes(extension);
    return isImage;
};
