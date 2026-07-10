'use client';

import clsx from 'clsx';

import style from './Label.module.scss';

interface ILabelProps {
    text?: string;
    children?: React.ReactNode;
    required?: boolean;
    className?: string;
    htmlFor?: string;
};

function Label({ text, children, required, className, htmlFor }: ILabelProps) {
    if (htmlFor) {
        return (
            <label className={clsx(style.label, className)} htmlFor={htmlFor}>
                { text && <span className={style.label__text}>{ text } { required && <span className={style.label__required}>*</span> }</span> }
                { children }
            </label>
        );
    }
    return (
        <span className={clsx(style.label, className)}>
            { text && <span className={style.label__text}>{ text } { required && <span className={style.label__required}>*</span> }</span> }
            { children }
        </span>
    );
}

export default Label;