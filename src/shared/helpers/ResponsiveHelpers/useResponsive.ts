'use client';

import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { BREAKPOINTS } from '@bdt/shared/config/Breakponts';

export const useResponsive = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    const isMobileQuery = useMediaQuery({ query: `(max-width: ${BREAKPOINTS['md']})` });
    const isTabletQuery = useMediaQuery({ query: `(max-width: ${BREAKPOINTS['xl']})` });
    const isDesktopQuery = useMediaQuery({ query: `(min-width: ${BREAKPOINTS['xl']})` });

    useEffect(() => {
        setIsMobile(isMobileQuery);
        setIsTablet(isTabletQuery);
        setIsDesktop(isDesktopQuery);
    }, [isMobileQuery, isTabletQuery, isDesktopQuery]);

    return { isMobile, isTablet, isDesktop };
};
