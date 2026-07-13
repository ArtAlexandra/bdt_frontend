import { useCallback, useState } from 'react';
import { LinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $setBlocksType } from '@lexical/selection';
import { $createParagraphNode, $createTextNode, $getSelection, $isRangeSelection } from 'lexical';

import Button from '@bdt/shared/ui/Button';
import Icon from '@bdt/shared/ui/Icon';

import { useSpecificFormat } from '../../model/useSpecificFormat';

import LinkButtonModal from './LinkButtonModal';

interface ILinkButtonProps {
    format: string;
    className?: string;
};

function LinkButton({ format, className }: ILinkButtonProps) {
    const [editor] = useLexicalComposerContext();
    const isActive = useSpecificFormat(format);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [currentUrl, setCurrentUrl] = useState<string>('');
    const [currentTargetBlank, setCurrentTargetBlank] = useState<boolean>(true);
    const [buttonText, setButtonText] = useState<string>('Добавить');

    const getSelectedLink = useCallback(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) {
            return null;
        }

        const node = selection.getNodes()[0];
        if (node instanceof LinkNode) {
            return node;
        }

        const parent = node.getParent();
        if (parent instanceof LinkNode) {
            return parent;
        }

        return null;
    }, []);

    const insertLink = useCallback((url: string, targetBlank: boolean) => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                if (url === null) return;

                if (url === '') {
                    editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
                    return;
                }

                const selectedLink = getSelectedLink();
                if (selectedLink) {
                    // Обновляем существующую ссылку
                    selectedLink.setURL(url);
                    selectedLink.setTarget(targetBlank ? '_blank' : null);
                } else if (!selection.isCollapsed()) {
                    // Создаем новую ссылку для выделенного текста
                    editor.dispatchCommand(TOGGLE_LINK_COMMAND, {
                        url,
                        target: targetBlank ? '_blank' : null
                    });
                } else {
                    // Создаем новую ссылку с текстом "ссылка"
                    const textNode = $createTextNode('ссылка');
                    textNode.setFormat('underline');
                    const linkNode = new LinkNode(url);
                    if (targetBlank) {
                        linkNode.setTarget('_blank');
                    }
                    linkNode.append(textNode);

                    // Создаем параграф и добавляем в него ссылку
                    const paragraphNode = $createParagraphNode();
                    paragraphNode.append(linkNode);
                    $setBlocksType(selection, () => paragraphNode);
                }
                setIsOpen(false);
            }
        });
    }, [editor, getSelectedLink]);

    const handleOpenModal = () => {
        editor.update(() => {
            const selectedLink = getSelectedLink();

            if (selectedLink) {
                setCurrentUrl(selectedLink.getURL() || '');
                setCurrentTargetBlank(selectedLink.getTarget() === '_blank');
                setButtonText('Сохранить');
            } else {
                setCurrentUrl('');
                setCurrentTargetBlank(true);
                setButtonText('Добавить');
            }
        });

        setError('');
        setIsOpen(true);
    };

    return (
        <>
            <LinkButtonModal
                isOpen={isOpen}
                title="Ссылка"
                onSubmit={insertLink}
                buttonText={buttonText}
                onClose={() => setIsOpen(false)}
                error={error}
                initialUrl={currentUrl}
                initialTargetBlank={currentTargetBlank}
            />
            <Button className={className} size="medium" variant={isActive ? 'primary' : 'light'} onClick={handleOpenModal}>
                <Icon name="link" />
            </Button>
        </>
    );
};

export default LinkButton;
