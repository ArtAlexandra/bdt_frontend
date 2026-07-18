'use client';

import { useCallback, useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelectionStyleValueForProperty, $patchStyleText } from '@lexical/selection';
import { $getSelection, $isRangeSelection } from 'lexical';

import Icon from '@bdt/shared/ui/Icon';

import SliderPopoverBtn from './SliderPopoverBtn';

const DEFAULT_CHAR_SPACING = 0;
const MIN_CHAR_SPACING = -5;
const MAX_CHAR_SPACING = 20;
const STEP = 0.5;

interface ITextCharSpacingButtonProps {
    className?: string;
}

function TextCharSpacingButton({ className }: ITextCharSpacingButtonProps) {
    const [editor] = useLexicalComposerContext();
    const [charSpacing, setCharSpacing] = useState<number | null>(DEFAULT_CHAR_SPACING);

    useEffect(() => {
        const updateCharSpacing = () => {
            editor.getEditorState().read(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    const raw = $getSelectionStyleValueForProperty(selection, 'letter-spacing', `${DEFAULT_CHAR_SPACING}px`);
                    setCharSpacing(raw === '' ? null : Number(raw.replace('px', '')));
                }
            });
        };

        updateCharSpacing();
        return editor.registerUpdateListener(updateCharSpacing);
    }, [editor]);

    const handleChange = useCallback((value: number) => {
        setCharSpacing(value);
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $patchStyleText(selection, { 'letter-spacing': `${value}px` });
            }
        });
    }, [editor]);

    return (
        <SliderPopoverBtn
            icon={<Icon name="charSpacing" />}
            label="Интервал"
            value={charSpacing}
            defaultValue={DEFAULT_CHAR_SPACING}
            min={MIN_CHAR_SPACING}
            max={MAX_CHAR_SPACING}
            step={STEP}
            className={className}
            format={(value) => value.toFixed(1)}
            onChange={handleChange}
        />
    );
}

export default TextCharSpacingButton;
