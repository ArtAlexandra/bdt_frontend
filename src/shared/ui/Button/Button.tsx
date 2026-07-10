'use client';

import Link from 'next/link';
import clsx from 'clsx';

import { useLoadingDelay } from './useLoadingDelay';

import style from './Button.module.scss';

export enum BUTTON_VARIANT {
    light = 'light',
    transparent = 'transparent',
    secondaryOutline = 'secondaryOutline',
    link = 'link',
    primary = 'primary',
};

export enum BUTTON_SIZE {
    default = 'default',
    small = 'small',
    medium = 'medium',
    large = 'large'
};

export type TButtonType = 'submit' | 'button' | 'reset';

interface IButtonProps {
    children: React.ReactNode;
    variant?: keyof typeof BUTTON_VARIANT;
    className?: string;
    type?: TButtonType;
    disabled?: boolean;
    size?: keyof typeof BUTTON_SIZE;
    href?: string;
    target?: string;
    rel?: string;
    isLoading?: boolean;
    fullWidth?: boolean;
    inline?: boolean;
    ariaLabel?: string;
    title?: string;

    onClick?: () => void;
}

function Button({
    children,
    onClick,
    variant,
    className,
    type = 'button',
    disabled,
    size = BUTTON_SIZE.default,
    href,
    target,
    rel,
    isLoading = false,
    fullWidth = false,
    inline = false,
    ariaLabel,
    title,
}: IButtonProps) {
    const displayLoading = useLoadingDelay(isLoading, 300);

    const cssClassName = clsx(className, style.button, {
        [style.button_primary]: variant === BUTTON_VARIANT.primary,
        [style.button_light]: variant === BUTTON_VARIANT.light,
        [style.button_transparent]: variant === BUTTON_VARIANT.transparent,
        [style.button_secondaryOutline]: variant === BUTTON_VARIANT.secondaryOutline,
        [style.button_link]: variant === BUTTON_VARIANT.link,
        [style.button_small]: size === BUTTON_SIZE.small,
        [style.button_medium]: size === BUTTON_SIZE.medium,
        [style.button_large]: size === BUTTON_SIZE.large,
        [style.button_disabled]: disabled,
        [style.button_loading]: displayLoading,
        [style.button_fullWidth]: fullWidth,
        [style.button_inline]: inline,
    });

    if (href) {
        return (
            <Link href={href} className={cssClassName} target={target} rel={rel} aria-label={ariaLabel} title={title}>
                { isLoading && <span className={style.spinner}></span> }
                { children }
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={cssClassName} type={type} disabled={disabled || displayLoading} aria-label={ariaLabel} title={title}>
            { isLoading && <span className={style.spinner}></span> }
            { children }
        </button>
    );
}

export default Button;
