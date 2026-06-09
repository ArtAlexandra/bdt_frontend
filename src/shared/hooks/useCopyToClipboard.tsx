import { useCallback, useState } from 'react';

function useCopyToClipboard(resetDelay: number = 2000) {
    const [copied, setCopied] = useState(false);

    const copy = useCallback(async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);

            setCopied(true);

            setTimeout(() => setCopied(false), resetDelay);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }, [resetDelay]);

    return { copied, copy };
}

export default useCopyToClipboard;
