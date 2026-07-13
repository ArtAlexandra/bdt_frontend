import { useEffect, useState } from 'react';

export const useIsSafari = () => {
    const [isSafari, setIsSafari] = useState(false);

    useEffect(() => {
        const userAgent = window.navigator.userAgent;
        setIsSafari(/^((?!chrome|android).)*safari/i.test(userAgent));
    }, []);

    return isSafari;
};
