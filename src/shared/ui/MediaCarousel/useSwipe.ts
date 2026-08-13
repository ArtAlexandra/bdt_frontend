import { useCallback, useRef } from 'react';

interface IUseSwipeProps {
    enabled?: boolean;
    threshold?: number;

    onSwipeLeft: () => void;
    onSwipeRight: () => void;
}

export function useSwipe({ enabled = true, threshold = 50, onSwipeLeft, onSwipeRight }: IUseSwipeProps) {
    const touchStartX = useRef<number | null>(null);
    const touchStartY = useRef<number | null>(null);

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        if (!enabled) return;

        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    }, [enabled]);

    const handleTouchEnd = useCallback((e: React.TouchEvent) => {
        if (!enabled || touchStartX.current === null || touchStartY.current === null) {
            return;
        }

        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;

        const deltaX = touchEndX - touchStartX.current;
        const deltaY = touchEndY - touchStartY.current;

        // Игнорируем вертикальный свайп
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
            touchStartX.current = null;
            touchStartY.current = null;
            return;
        }

        if (deltaX > threshold) {
            onSwipeRight();
        } else if (deltaX < -threshold) {
            onSwipeLeft();
        }

        touchStartX.current = null;
        touchStartY.current = null;
    }, [enabled, threshold, onSwipeLeft, onSwipeRight]);

    return {
        onTouchStart: handleTouchStart,
        onTouchEnd: handleTouchEnd,
    };
}
