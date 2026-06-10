import { useEffect } from 'react';

interface IUseBodyScrollLockProps {
    isEnabled: boolean;
};

export function useBodyScrollLock({ isEnabled }: IUseBodyScrollLockProps) {
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;

        if (isEnabled) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = originalOverflow;
        }

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [isEnabled]);
};
