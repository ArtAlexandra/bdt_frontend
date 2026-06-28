'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export const useLineCount = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [lineCount, setLineCount] = useState(1);

    const calculateLineCount = useCallback(() => {
        if (!ref.current) return;

        const element = ref.current;
        const computedStyle = getComputedStyle(element);
        const lineHeight = parseFloat(computedStyle.lineHeight);

        if (lineHeight <= 0) {
            setLineCount(1);
            return;
        }

        const elementHeight = element.scrollHeight;
        const paddingTop = parseFloat(computedStyle.paddingTop);
        const paddingBottom = parseFloat(computedStyle.paddingBottom);
        const contentHeight = elementHeight - paddingTop - paddingBottom;
        const calculatedLineCount = Math.round(contentHeight / lineHeight);

        setLineCount(calculatedLineCount > 0 ? calculatedLineCount : 1);
    }, []);

    useEffect(() => {
        calculateLineCount();

        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(calculateLineCount, 300);
        };

        window.addEventListener('resize', handleResize);

        const resizeObserver = new ResizeObserver(() => {
            calculateLineCount();
        });

        if (ref.current) resizeObserver.observe(ref.current);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimeout);
            resizeObserver.disconnect();
        };
    }, [calculateLineCount]);

    useEffect(() => {
        const timeout = setTimeout(calculateLineCount, 500);
        return () => clearTimeout(timeout);
    });

    return { ref, lineCount };
};
