'use client';

import { useState } from 'react';
import clsx from 'clsx';

import { useLineCount } from '@bdt/shared/helpers/ResponsiveHelpers';

import Button from '@bdt/shared/ui/Button';

import style from './ExpandableText.module.scss';

interface IExpandableTextProps {
    text: string;
    maxLines?: number;
    isShowButton?: boolean;
    className?: string;
};

function ExpandableText({ text, maxLines = 2, isShowButton = false, className }: IExpandableTextProps) {
    const { ref, lineCount } = useLineCount();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={className}>
            <div ref={ref} className={clsx(style.expandableText, { [style['expandableText-full']]: isExpanded })} style={{ '--max-lines': maxLines } as React.CSSProperties}>
                { text }
            </div>
            { lineCount > maxLines && isShowButton && <Button onClick={() => setIsExpanded(!isExpanded)} variant="link" size="small" className="mt-1"> { isExpanded ? 'Свернуть' : 'Раскрыть' }</Button> }
        </div>
    );
};

export default ExpandableText;
