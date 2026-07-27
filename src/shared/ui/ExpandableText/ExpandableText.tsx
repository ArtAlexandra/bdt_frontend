'use client';

import { useState } from 'react';
import clsx from 'clsx';

import { useLineCount } from '@bdt/shared/helpers/ResponsiveHelpers';

import Button from '@bdt/shared/ui/Button';

import style from './ExpandableText.module.scss';

interface IExpandableTextProps {
    children: React.ReactNode;
    maxHeight?: number;
    isShowButton?: boolean;
    className?: string;
};

function ExpandableText({ children, maxHeight = 100, isShowButton = true, className }: IExpandableTextProps) {
    const { ref, contentHeight } = useLineCount();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={className}>
            <div ref={ref} className={clsx(style.expandableText, { [style['expandableText-full']]: isExpanded })} style={{ '--max-height': `${maxHeight}px` } as React.CSSProperties}>
                { children }
            </div>
            { contentHeight >= maxHeight && isShowButton && <Button onClick={() => setIsExpanded(!isExpanded)} variant="link" size="small" className="mt-1">{ isExpanded ? 'Свернуть' : 'Показать ещё' }</Button> }
        </div>
    );
};

export default ExpandableText;
