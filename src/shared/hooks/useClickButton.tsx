import { useEffect } from 'react';

interface IUseClickButtonProps {
    isEnabled: boolean;
    type: 'Escape';

    onClick: () => void;
};

export function useClickButton({ isEnabled, type, onClick }: IUseClickButtonProps) {
    useEffect(() => {
        if (!isEnabled) return;

        const handleClick = (event: KeyboardEvent) => {
            if (event.key === type) {
                onClick();
            }
        };

        document.addEventListener('keydown', handleClick);

        return () => {
            document.removeEventListener('keydown', handleClick);
        };
    }, [isEnabled, type, onClick]);
};
