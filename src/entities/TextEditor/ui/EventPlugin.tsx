import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { COMMAND_PRIORITY_CRITICAL, CONTROLLED_TEXT_INSERTION_COMMAND } from 'lexical';

import { isAndroid } from '@bdt/shared/helpers/DeviceHelpers';

function EventPlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        const removeTextInsertionListener = editor.registerCommand(
            CONTROLLED_TEXT_INSERTION_COMMAND, (text: string) => {
                // Проверяем на Zero Width Space (код 8203) на Android
                if (isAndroid() && text.length === 1 && text.charCodeAt(0) === 8203) {
                    return true;
                }

                return false;
            }, COMMAND_PRIORITY_CRITICAL
        );

        return () => {
            removeTextInsertionListener();
        };
    }, [editor]);

    return null;
}

export default EventPlugin;
