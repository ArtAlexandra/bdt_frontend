'use client';

import { useCallback, useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelectionStyleValueForProperty, $patchStyleText } from '@lexical/selection';
import { $getSelection, $isRangeSelection } from 'lexical';

import Button from '@bdt/shared/ui/Button';
import { ColorPickerDetailsSelectColor } from '@bdt/shared/ui/ColorPicker';

import style from './TextColorButton.module.scss';

const DEFAULT_COLOR = '#000000';

interface ITextColorButtonProps {
    className?: string;
};

function TextColorButton({ className }: ITextColorButtonProps) {
    const [editor] = useLexicalComposerContext();
    const [currentColor, setCurrentColor] = useState(DEFAULT_COLOR);

    useEffect(() => {
        const updateCurrentColor = () => {
            editor.getEditorState().read(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    const color = $getSelectionStyleValueForProperty(selection, 'color');
                    setCurrentColor(color);
                }
            });
        };

        updateCurrentColor();

        return editor.registerUpdateListener(() => {
            updateCurrentColor();
        });
    }, [editor]);

    const handleColorChange = useCallback((newColor: string) => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $patchStyleText(selection, { color: newColor });
            }
        });
        editor.focus();
    }, [editor]);

    return (
        <Button size="medium" variant="light" className={className}>
            <ColorPickerDetailsSelectColor value={currentColor} onChange={handleColorChange} trigger="click">
                <div className={style.colorButton} style={{ '--text-color': currentColor } as React.CSSProperties}>
                    <span>A</span>
                    <div className={style.colorButton__line} />
                </div>
            </ColorPickerDetailsSelectColor>
        </Button>
    );
}

export default TextColorButton;
