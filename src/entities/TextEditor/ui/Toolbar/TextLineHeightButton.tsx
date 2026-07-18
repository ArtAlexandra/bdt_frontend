'use client';

import { useCallback, useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelectionStyleValueForProperty, $patchStyleText } from '@lexical/selection';
import { $getSelection, $isRangeSelection } from 'lexical';

import Icon from '@bdt/shared/ui/Icon';

import SliderPopoverBtn from './SliderPopoverBtn';

const DEFAULT_LINE_HEIGHT = 1;
const MIN_LINE_HEIGHT = 0.5;
const MAX_LINE_HEIGHT = 3;
const STEP = 0.05;

interface ITextLineHeightButtonProps {
    className?: string;
}

function TextLineHeightButton({ className }: ITextLineHeightButtonProps) {
    const [editor] = useLexicalComposerContext();
    const [lineHeight, setLineHeight] = useState<number | null>(DEFAULT_LINE_HEIGHT);

    useEffect(() => {
        const updateLineHeight = () => {
            editor.getEditorState().read(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    const raw = $getSelectionStyleValueForProperty(selection, 'line-height', String(DEFAULT_LINE_HEIGHT));
                    setLineHeight(raw === '' ? null : Number(raw));
                }
            });
        };

        updateLineHeight();
        return editor.registerUpdateListener(updateLineHeight);
    }, [editor]);

    const handleChange = useCallback((value: number) => {
        setLineHeight(value);
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $patchStyleText(selection, { 'line-height': String(value) });
            }
        });
    }, [editor]);

    return (
        <SliderPopoverBtn
            icon={<Icon name="lineHeight" />}
            label="Межстрочный"
            value={lineHeight}
            defaultValue={DEFAULT_LINE_HEIGHT}
            min={MIN_LINE_HEIGHT}
            max={MAX_LINE_HEIGHT}
            step={STEP}
            className={className}
            format={(v) => v.toFixed(2)}
            onChange={handleChange}
        />
    );
}

export default TextLineHeightButton;
