import { clsx } from 'clsx';

import style from './Loader.module.scss';

interface ILoaderProps {
    fullscreen?: boolean;
    fullHeight?: boolean;
    text?: string;
    className?: string;
};

function Loader({ fullscreen, text, className, fullHeight }: ILoaderProps) {
    const cssClassName = clsx(className, {
        [style.loader_fullscreen]: fullscreen,
        [style.loader_fullHeight]: fullHeight,
    });

    return <div className={cssClassName}>
        { text
            ? <div className={style.loader__text}><div className={style.loader} />{ text }</div>
            : <div className={style.loader} />
        }
    </div>;
}

export default Loader;
