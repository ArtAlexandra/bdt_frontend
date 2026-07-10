import clsx from 'clsx';

import style from './Error.module.scss';

interface IErrorProps {
    error?: string;
    className?: string;
}

function Error({ className, error }: IErrorProps) {
    return error ? <div className={clsx(style.error, className)}>{ error }</div> : null;
}

export default Error;
