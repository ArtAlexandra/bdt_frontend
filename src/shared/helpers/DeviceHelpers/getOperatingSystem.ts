export const getOperatingSystem = (): string | null => {
    const userAgent = navigator.userAgent;
    if (/windows phone/i.test(userAgent)) return 'Windows Phone';
    if (/win(dows|64|32)?/i.test(userAgent)) return 'Windows';
    if (/android/i.test(userAgent)) return 'Android';
    if (/ipad|iphone|ipod/i.test(userAgent)) return 'iOS';
    if (/macintosh|mac os x/i.test(userAgent)) return 'macOS';
    if (/linux/i.test(userAgent)) return 'Linux';
    return null;
};
