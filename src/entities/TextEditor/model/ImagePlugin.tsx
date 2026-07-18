import React, { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $wrapNodeInElement, mergeRegister } from '@lexical/utils';
import { $createParagraphNode, $insertNodes, $isRootOrShadowRoot, COMMAND_PRIORITY_EDITOR, createCommand, LexicalCommand } from 'lexical';

import { $createImageNode, type IImagePayload, ImageNode } from './ImageNode';

export type TInsertImagePayload = Readonly<IImagePayload>;

export const INSERT_IMAGE_COMMAND: LexicalCommand<TInsertImagePayload> = createCommand('INSERT_IMAGE_COMMAND');

interface IImagesPluginProps {
    captionsEnabled?: boolean;
};

const ImagesPlugin = ({ captionsEnabled }: IImagesPluginProps): React.JSX.Element | null => {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if (!editor.hasNodes([ImageNode])) throw new Error('ImagesPlugin: ImageNode not registered on editor');

        return mergeRegister(
            editor.registerCommand<TInsertImagePayload>(
                INSERT_IMAGE_COMMAND, (payload) => {
                    editor.update(() => {
                        const imageNode = $createImageNode(payload);

                        $insertNodes([imageNode]);

                        if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
                            $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
                        }
                    });
                    return true;
                }, COMMAND_PRIORITY_EDITOR
            )
        );
    }, [captionsEnabled, editor]);

    return null;
};

export default ImagesPlugin;
