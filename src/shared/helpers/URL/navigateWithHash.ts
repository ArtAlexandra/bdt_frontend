import { useRouter } from 'next/navigation';

type TRouter = ReturnType<typeof useRouter>;

const normalizePath = (path: string) => {
    return path.replace(/\/$/, '') || '/';
};

export const navigateWithHash = (router: TRouter, url: string) => {
    const hashIndex = url.indexOf('#');

    if (hashIndex === -1) {
        router.push(url);
        return;
    }

    const pathname = url.slice(0, hashIndex) || '/';
    const hash = url.slice(hashIndex + 1);

    const isSamePage = normalizePath(window.location.pathname) === normalizePath(pathname);

    if (!isSamePage) {
        router.push(url);
        return;
    }

    const el = document.getElementById(hash);

    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.replaceState(null, '', `#${hash}`);
        return;
    }

    router.push(url);
};
