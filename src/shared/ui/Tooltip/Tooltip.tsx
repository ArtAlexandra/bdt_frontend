'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { Tooltip as TooltipAnt } from 'antd';

export type TPlacementType = 'right' | 'left' | 'top' | 'bottom';

interface ITooltipProps {
    title: ReactNode;
    placement?: TPlacementType;
    pointAtCenter?: boolean;
    children: React.ReactNode;
};

function Tooltip({ title, placement = 'top', pointAtCenter = true, children }: ITooltipProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <>{ children }</>;
    }

    return (
        <TooltipAnt title={title} placement={placement} arrow={{ pointAtCenter }}>
            { children }
        </TooltipAnt>
    );
};

export default Tooltip;
