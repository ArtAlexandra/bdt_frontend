import { isJsonString } from '@bdt/shared/helpers/DataHelpers';

interface ILexicalNode {
    type: string;
    children?: ILexicalNode[];
}

export const isEmptyText = (text: string) => {
    try {
        if (!isJsonString(text)) return !text;

        const json = JSON.parse(text);

        // Если нет children или массив пустой
        if (!json.root.children || json.root.children.length === 0) {
            return true;
        }

        // Проверяем каждый child
        return json.root.children.every((child: ILexicalNode) => {
            // Если это параграф, проверяем его children
            if (child.type === 'paragraph') {
                return !child.children || child.children.length === 0;
            }
            // Для других типов узлов считаем их непустыми
            return false;
        });
    } catch (error) {
        console.error(error);
        return true;
    }
};
