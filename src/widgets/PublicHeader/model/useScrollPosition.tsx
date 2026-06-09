import { useEffect, useState } from 'react';

const THRESHOLD = 50;
const THROTTLE_MS = 100;

function useScrollPosition() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout | undefined;

        const handleScroll = () => {
            if (timeoutId) return;

            timeoutId = setTimeout(() => {
                setIsScrolled(window.scrollY > THRESHOLD);
                timeoutId = undefined;
            }, THROTTLE_MS);
        };

        setIsScrolled(window.scrollY > THRESHOLD);

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return isScrolled;
}

export default useScrollPosition;
