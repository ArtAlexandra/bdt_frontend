import { useEffect, useRef } from 'react';

export function useKeepVideoPlaying() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const video = containerRef.current?.querySelector('video');
        if (!video) return;

        const play = () => video.play().catch(() => { });

        video.addEventListener('pause', play);
        video.addEventListener('ended', play);

        play();

        return () => {
            video.removeEventListener('pause', play);
            video.removeEventListener('ended', play);
        };
    }, []);

    return containerRef;
}
