import { useEffect, useRef, useState } from 'react';

export function useLoadingDelay(isLoading: boolean, minDelay: number = 300) {
    const [displayLoading, setDisplayLoading] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isLoading) {
            setDisplayLoading(true);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        } else {
            timeoutRef.current = setTimeout(() => {
                setDisplayLoading(false);
            }, minDelay);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [isLoading, minDelay]);

    return displayLoading;
}
