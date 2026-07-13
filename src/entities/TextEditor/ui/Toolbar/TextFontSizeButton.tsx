'use client';

import { useCallback, useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelectionStyleValueForProperty, $patchStyleText } from '@lexical/selection';
import { $getSelection, $isRangeSelection } from 'lexical';

import SliderPopoverBtn from './SliderPopoverBtn';

import style from './TextFontSizeButton.module.scss';

const DEFAULT_FONT_SIZE = 14;
const MIN_FONT_SIZE = 6;
const MAX_FONT_SIZE = 96;
const STEP = 1;

interface ITextFontSizeButtonProps {
    className?: string;
}

function TextFontSizeButton({ className }: ITextFontSizeButtonProps) {
    const [editor] = useLexicalComposerContext();
    const [fontSize, setFontSize] = useState<number | null>(DEFAULT_FONT_SIZE);

    useEffect(() => {
        const updateFontSize = () => {
            editor.getEditorState().read(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    const raw = $getSelectionStyleValueForProperty(selection, 'font-size', `${DEFAULT_FONT_SIZE}px`);
                    setFontSize(raw === '' ? null : Number(raw.replace('px', '')));
                }
            });
        };

        updateFontSize();
        return editor.registerUpdateListener(updateFontSize);
    }, [editor]);

    const handleChange = useCallback((value: number) => {
        setFontSize(value);
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $patchStyleText(selection, { 'font-size': `${value}px` });
            }
        });
    }, [editor]);

    return (
        <SliderPopoverBtn
            icon={<span className={style.icon}>Aa</span>}
            label="Размер шрифта"
            value={fontSize}
            defaultValue={DEFAULT_FONT_SIZE}
            min={MIN_FONT_SIZE}
            max={MAX_FONT_SIZE}
            step={STEP}
            className={className}
            onChange={handleChange}
        />
    );
}

export default TextFontSizeButton;
