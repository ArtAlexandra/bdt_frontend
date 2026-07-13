import { $convertFromMarkdownString, TRANSFORMERS } from '@lexical/markdown';
import { $createParagraphNode, $createTextNode, $getRoot } from 'lexical';

import { isJsonString } from '@bdt/shared/helpers/DataHelpers';

/**
 * Проверяет, является ли строка Markdown
 */
const isMarkdown = (text: string): boolean => {
    // Проверяем наличие Markdown синтаксиса
    const markdownPatterns = [
        /\*\*[^*]+\*\*/, // **жирный**
        /\*[^*]+\*/, // *курсив*
        /__[^_]+__/, // __жирный__
        /_[^_]+_/, // _курсив_
        /^#{1,6}\s+.+$/m, // Заголовки
        /^[-*+]\s+.+$/m, // Неупорядоченные списки
        /^\d+\.\s+.+$/m, // Упорядоченные списки
    ];

    return markdownPatterns.some(pattern => pattern.test(text));
};

const createInitialState = (text: string) => {
    return () => {
        const root = $getRoot();
        if (root.getTextContentSize() === 0) {
            const paragraph = $createParagraphNode();
            paragraph.append($createTextNode(text));
            root.append(paragraph);
        }
    };
};

const createMarkdownInitialState = (markdown: string) => {
    return () => $convertFromMarkdownString(markdown, TRANSFORMERS);
};

export const getInitialState = (data: string | undefined) => {
    if (!data) return undefined;

    if (isJsonString(data)) return data;

    // Если это Markdown, преобразуем в Lexical формат
    if (isMarkdown(data)) return createMarkdownInitialState(data);

    // Если это не JSON и не Markdown, значит это обычный текст
    return createInitialState(data);
};
