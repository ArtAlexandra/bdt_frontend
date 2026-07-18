import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import clsx from 'clsx';
import { $getRoot } from 'lexical';

import style from './Placeholder.module.scss';

interface IPlaceholderProps {
    placeholder: string;
    className?: string;
}

function Placeholder({ placeholder, className }: IPlaceholderProps) {
    const [editor] = useLexicalComposerContext();

    const handleClick = () => {
        editor.update(() => {
            const root = $getRoot();
            const firstChild = root.getFirstChild();
            if (firstChild) {
                firstChild.selectStart();
            }
        });
    };

    return (
        <div
            onClick={handleClick}
            className={clsx(style.placeholder, className)}
        >
            { placeholder }
        </div>
    );
}

export default Placeholder;
