'use client';

import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import clsx from 'clsx';

import Label from '@bdt/shared/ui/Label';

import { getInitialState } from '../model/getInitialState';
import { ImageNode } from '../model/ImageNode';

import { ToolbarTheme } from './Toolbar/ToolbarTheme';

import style from './TextPreview.module.scss';

interface ITextPreviewProps {
    data: string;
    label?: string;
    className?: string;
};

function TextPreview({ data, label, className }: ITextPreviewProps) {
    const onError = (error: unknown) => {
        console.error(error);
    };

    return (
        <div className={style.textPreview}>
            <Label text={label} />
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
                editorState: getInitialState(data),
                editable: false,
            }}>
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable
                            className={clsx(className, style.textPreview__contentEditable, ToolbarTheme.colors.primary)}
                            aria-placeholder=""
                            placeholder={<div></div>}
                        />
                    }
                    placeholder={<div></div>}
                    ErrorBoundary={LexicalErrorBoundary}
                />
            </LexicalComposer>
        </div>
    );
}

export default TextPreview;
