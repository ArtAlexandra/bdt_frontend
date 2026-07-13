import { $applyNodeReplacement, DecoratorNode, type EditorConfig, type LexicalNode, type NodeKey, type SerializedLexicalNode, type Spread } from 'lexical';

import ImageComponent from './ImageComponent';

import type { JSX } from 'react';

export interface IImagePayload {
    altText: string;
    key?: NodeKey;
    src: string;
    width?: string;
    height?: string;
}

export type TSerializedImageNode = Spread<{ altText: string; src: string; width?: string | number; height?: string | number; }, SerializedLexicalNode>;

export class ImageNode extends DecoratorNode<JSX.Element> {
    __src: string;
    __altText: string;
    __width?: string;
    __height?: string;

    static getType(): string {
        return 'image';
    }

    static clone(node: ImageNode): ImageNode {
        return new ImageNode(node.__src, node.__altText, node.__key, node.__width, node.__height);
    }

    static importJSON(serializedNode: TSerializedImageNode): ImageNode {
        const { altText, src } = serializedNode;
        const width = typeof serializedNode.width === 'number' ? `${serializedNode.width}px` : serializedNode.width;
        const height = typeof serializedNode.height === 'number' ? `${serializedNode.height}px` : serializedNode.height;

        return $createImageNode({ altText, src, width, height });
    }

    constructor(src: string, altText: string, key?: NodeKey, width?: string, height?: string) {
        super(key);
        this.__src = src;
        this.__altText = altText;
        this.__width = width;
        this.__height = height;
    }

    exportJSON(): TSerializedImageNode {
        return {
            ...super.exportJSON(),
            altText: this.getAltText(),
            src: this.getSrc(),
            width: this.__width,
            height: this.__height
        };
    }

    createDOM(config: EditorConfig): HTMLElement {
        const span = document.createElement('span');
        const theme = config.theme;
        const className = theme.image;

        if (className !== undefined) {
            span.className = className;
        }

        return span;
    }

    updateDOM(): boolean {
        return false;
    }

    getSrc(): string {
        return this.__src;
    }

    getAltText(): string {
        return this.__altText;
    }

    decorate(): JSX.Element {
        return (
            <ImageComponent
                src={this.__src}
                altText={this.__altText}
                nodeKey={this.getKey()}
                width={this.__width}
                height={this.__height}
            />
        );
    }
}

export const $createImageNode = ({ altText, src, key, width, height }: IImagePayload): ImageNode => {
    return $applyNodeReplacement(
        new ImageNode(
            src, altText, key, width, height
        ),
    );
};

export const $isImageNode = (node: LexicalNode | null | undefined): node is ImageNode => {
    return node instanceof ImageNode;
};
