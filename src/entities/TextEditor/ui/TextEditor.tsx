'use client';

import { useRef } from 'react';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import clsx from 'clsx';
import { EditorState } from 'lexical';

import { notifyError } from '@bdt/shared/lib/Notifications';

import Error from '@bdt/shared/ui/Error';
import Label from '@bdt/shared/ui/Label';

import { getInitialState } from '../model/getInitialState';
import { ImageNode } from '../model/ImageNode';
import ImagesPlugin from '../model/ImagePlugin';

import Toolbar from './Toolbar/Toolbar';
import { ToolbarTheme } from './Toolbar/ToolbarTheme';
import EventPlugin from './EventPlugin';
import Placeholder from './Placeholder';

import style from './TextEditor.module.scss';

import type { TError } from '@bdt/shared/helpers/ErrorHelpers';
import type { TGalleryComponent } from './TextEditorTypes';

interface IEditorProps {
    placeholder?: string;
    data?: string;
    error?: TError;
    label?: string;
    className?: string;
    required?: boolean;
    GalleryComponent?: TGalleryComponent;

    onChange: (value: string) => void;
};

function TextEditor({ placeholder = 'Начните писать...', data, error, label, className, required, GalleryComponent, onChange }: IEditorProps) {
    const onError = (error: unknown) => {
        console.error(error);
        notifyError(error);
    };

    const lastJsonRef = useRef<string | null>(null);
    const contentEditableRef = useRef<HTMLDivElement>(null);

    const handleChangeData = (editorState: EditorState) => {
        const jsonString = JSON.stringify(editorState.toJSON());

        // Сравниваем с предыдущим
        if (jsonString !== lastJsonRef.current) {
            lastJsonRef.current = jsonString;
            onChange(jsonString);
        }
    };

    return (
        <div className={style.textEditor}>
            { label && <Label text={label} required={required} /> }
            { error && <Error error={error} /> }
            <LexicalComposer initialConfig={{
                namespace: 'TextEditor',
                theme: ToolbarTheme,
                onError,
                nodes: [
                    HeadingNode,
                    ListNode,
                    ListItemNode,
                    AutoLinkNode,
                    LinkNode,
                    ImageNode,
                    QuoteNode,
                ],
                editorState: getInitialState(data)
            }}>
                <Toolbar GalleryComponent={GalleryComponent} />
                <div className={style.textEditor__content}>
                    <RichTextPlugin
                        contentEditable={
                            <ContentEditable
                                ref={contentEditableRef}
                                className={clsx(className, style.textEditor__contentEditable, ToolbarTheme.colors.primary)}
                            />
                        }
                        placeholder={<Placeholder placeholder={placeholder} />}
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    <OnChangePlugin ignoreSelectionChange onChange={handleChangeData} />
                    <ListPlugin />
                    <TabIndentationPlugin />
                    <HistoryPlugin />
                    <ImagesPlugin />
                    <LinkPlugin />
                    <EventPlugin />
                </div>
            </LexicalComposer>
        </div>
    );
}

export default TextEditor;
