import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

import { initCounter, setMainCounter, type TMetrikaOptions } from '../api/YandexMetrikaApi';
import { YM_MAIN_COUNTER_ID } from '../config/Config';

const MAIN_COUNTER_OPTIONS: TMetrikaOptions = {
    defer: true,
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
};

export function useMainMetrikaCounter() {
    const counterRef = useRef<IYandexMetrikaCounter | null>(null);
    const [ready, setReady] = useState(false);
    const pathname = usePathname();
    const isFirstHit = useRef(true);

    useEffect(() => {
        if (process.env.NODE_ENV !== 'production') return;

        let mounted = true;
        const { cancel, init } = initCounter(YM_MAIN_COUNTER_ID, MAIN_COUNTER_OPTIONS);

        init.then((counter) => {
            if (!mounted) return;
            counterRef.current = counter;
            setMainCounter(counter);
            setReady(true);
        });

        return () => {
            mounted = false;
            cancel();
        };
    }, []);

    useEffect(() => {
        if (!ready || !pathname) return;

        // Ya.Metrika2 constructor fires an auto-hit on init, skip the first manual one
        if (isFirstHit.current) {
            isFirstHit.current = false;
            return;
        }

        counterRef.current?.hit(pathname);
    }, [pathname, ready]);
}
