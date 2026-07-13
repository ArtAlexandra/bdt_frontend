export const isMobileDevice = () => {
    if (typeof navigator === 'undefined') return false;
    return /android|iphone|ipad|ipod|mobile|windows phone/i.test(navigator.userAgent);
};
