import { useCallback, useEffect, useState } from 'react';
import { $isLinkNode } from '@lexical/link';
import { $isListNode, ListNode } from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $isHeadingNode, $isQuoteNode } from '@lexical/rich-text';
import { $getNearestNodeOfType } from '@lexical/utils';
import { $getSelection, $isRangeSelection } from 'lexical';

export const useSpecificFormat = (format: string) => {
    const [editor] = useLexicalComposerContext();
    const [isActive, setIsActive] = useState(false);

    const updateFormat = useCallback(() => {
        editor.getEditorState().read(() => {
            const selection = $getSelection();

            if (!$isRangeSelection(selection)) {
                setIsActive(false);
                return;
            }

            const anchorNode = selection.anchor.getNode();
            const element = anchorNode.getTopLevelElement();

            if (!element) {
                setIsActive(false);
                return;
            }

            switch (format) {
                case 'bold':
                case 'italic':
                case 'underline':
                case 'strikethrough':
                case 'capitalize':
                case 'uppercase':
                case 'lowercase':
                    setIsActive(selection.hasFormat(format));
                    break;
                case 'h1':
                case 'h2':
                case 'h3':
                    setIsActive($isHeadingNode(element) && element.getTag() === format);
                    break;
                case 'quote':
                    setIsActive($isQuoteNode(element));
                    break;
                case 'ol': {
                    const listNode = $getNearestNodeOfType(anchorNode, ListNode);
                    setIsActive($isListNode(listNode) && listNode.getListType() === 'number');
                    break;
                }
                case 'ul': {
                    const listNode = $getNearestNodeOfType(anchorNode, ListNode);
                    setIsActive($isListNode(listNode) && listNode.getListType() === 'bullet');
                    break;
                }
                case 'alignLeft':
                    setIsActive(element.getFormatType() === 'left');
                    break;
                case 'alignCenter':
                    setIsActive(element.getFormatType() === 'center');
                    break;
                case 'alignRight':
                    setIsActive(element.getFormatType() === 'right');
                    break;
                case 'alignJustify':
                    setIsActive(element.getFormatType() === 'justify');
                    break;
                case 'link': {
                    const parent = anchorNode.getParent();
                    setIsActive($isLinkNode(parent));
                    break;
                }
                default:
                    setIsActive(false);
            }
        });
    }, [editor, format]);

    useEffect(() => {
        const unregisterUpdate = editor.registerUpdateListener(() => {
            updateFormat();
        });

        return () => {
            unregisterUpdate();
        };
    }, [editor, updateFormat]);

    return isActive;
};
