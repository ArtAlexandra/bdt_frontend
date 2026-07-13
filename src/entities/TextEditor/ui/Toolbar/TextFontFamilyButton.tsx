'use client';

import { useCallback, useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelectionStyleValueForProperty, $patchStyleText } from '@lexical/selection';
import { $getSelection, $isRangeSelection } from 'lexical';

import { FONT_FAMILIES } from '@bdt/shared/config/FontFamilies';

import { SELECT_SIZE, SimpleSelect } from '@bdt/shared/ui/Select';

const DEFAULT_FONT_FAMILY = FONT_FAMILIES[0].value;

function TextFontFamilyButton() {
    const [editor] = useLexicalComposerContext();
    const [fontFamily, setFontFamily] = useState<string | null>(DEFAULT_FONT_FAMILY);

    useEffect(() => {
        const updateCurrentFontFamily = () => {
            editor.getEditorState().read(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    const currentFontFamily = $getSelectionStyleValueForProperty(
                        selection,
                        'font-family',
                        DEFAULT_FONT_FAMILY
                    );
                    setFontFamily(currentFontFamily || null);
                }
            });
        };

        updateCurrentFontFamily();
        return editor.registerUpdateListener(updateCurrentFontFamily);
    }, [editor]);

    const handleFontFamilyChange = useCallback((newFontFamily: string) => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $patchStyleText(selection, { 'font-family': newFontFamily });
            }
        });
    }, [editor]);

    return (
        <SimpleSelect
            options={FONT_FAMILIES}
            value={fontFamily ?? ''}
            placeholder="~"
            size={SELECT_SIZE.small}
            onChange={handleFontFamilyChange}
            popupMatchSelectWidth={false}
            optionRender={(option) => (
                <span style={{ fontFamily: option.value }}>
                    { option.label }
                </span>
            )}
        />
    );
}

export default TextFontFamilyButton;
