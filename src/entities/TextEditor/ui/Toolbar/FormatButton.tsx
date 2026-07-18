import { REMOVE_LIST_COMMAND } from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createHeadingNode, $createQuoteNode, HeadingTagType } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { $createParagraphNode, $getSelection, $isRangeSelection, FORMAT_ELEMENT_COMMAND, LexicalCommand } from 'lexical';

import Button from '@bdt/shared/ui/Button';

import { useSpecificFormat } from '../../model/useSpecificFormat';

interface IFormatButtonProps {
    format: HeadingTagType | string;
    command: LexicalCommand<unknown>;
    commandPayload: string;
    className?: string;
    children: React.ReactNode;
}

const isHeadingTag = (format: HeadingTagType | string): format is HeadingTagType => {
    return ['h1', 'h2', 'h3'].includes(format as HeadingTagType);
};

const isQuoteTag = (f: string): boolean => f === 'quote';

const isListTag = (f: string): boolean => f === 'ol' || f === 'ul';

const isAlignTag = (f: string): boolean => { return ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify'].includes(f); };

export const FormatButton = ({ format, command, commandPayload, className, children }: IFormatButtonProps) => {
    const [editor] = useLexicalComposerContext();
    const isActive = useSpecificFormat(format);

    const handleClick = () => {
        if (isListTag(format) && isActive) {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
            return;
        }

        if (isAlignTag(format) && isActive) {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, '');
            return;
        }

        if (isHeadingTag(format) || isQuoteTag(format)) {
            handleBlockToggle();
            return;
        }

        editor.dispatchCommand(command, commandPayload);
    };

    const handleBlockToggle = () => {
        editor.update(() => {
            const selection = $getSelection();
            if (!$isRangeSelection(selection)) return;

            if (isActive) {
                $setBlocksType(selection, () => $createParagraphNode());
                return;
            }

            if (isHeadingTag(format)) {
                $setBlocksType(selection, () => $createHeadingNode(format));
            }

            if (isQuoteTag(format)) {
                $setBlocksType(selection, () =>
                    isActive ? $createParagraphNode() : $createQuoteNode()
                );
            }
        });
    };

    return (
        <Button className={className} size="medium" onClick={handleClick} variant={isActive ? 'primary' : 'light'}>
            { children }
        </Button>
    );
};
