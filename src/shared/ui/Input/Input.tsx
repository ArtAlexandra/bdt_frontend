import { RefObject, useId } from 'react';
import { RefCallBack, UseFormRegisterReturn } from 'react-hook-form';
import clsx from 'clsx';

import Error from '@bdt/shared/ui/Error';
import Icon, { ICON_LIST } from '@bdt/shared/ui/Icon';
import Label from '@bdt/shared/ui/Label';

import style from './Input.module.scss';

import type { TError } from '@bdt/shared/helpers/ErrorHelpers';

type TInputType = 'text' | 'number' | 'email';
type TInputSize = 'default' | 'small';

interface IInputProps {
    placeholder?: string;
    type?: TInputType;
    className?: string;
    classNameSuffix?: string;
    disabled?: boolean;
    value?: string | number | undefined;
    label?: string;
    required?: boolean;
    error?: TError;
    name?: string;
    defaultValue?: string | number;
    register?: Partial<UseFormRegisterReturn>;
    iconDisabledIfEmpty?: boolean;
    iconName?: keyof typeof ICON_LIST;
    prefix?: keyof typeof ICON_LIST;
    prefixText?: string;
    caption?: string;
    ref?: RefCallBack | RefObject<HTMLInputElement>;
    autoComplete?: string;
    readOnly?: boolean;
    maxLength?: number;
    max?: string | number;
    inputMode?: 'text' | 'numeric' | 'email' | 'tel' | 'url';
    size?: TInputSize;
    autoFocus?: boolean;
    testId?: string;

    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClickIcon?: () => void;
};

function Input({ type = 'text', className, classNameSuffix, placeholder, autoComplete, disabled, value, label, required, error, name, defaultValue, register, iconName, iconDisabledIfEmpty = false, prefixText, prefix, caption, readOnly, ref, onChange, onBlur, maxLength, max, inputMode, onClickIcon, size = 'default', autoFocus = false, testId }: IInputProps) {
    const autoCapitalize = type === 'email' ? 'off' : 'none';
    const inputId = useId();
    const inputFieldClassName = clsx(style.input__field, {
        [style.input__field_error]: error,
        [style.input__field_disabled]: disabled,
        [style.input__field_withIcon]: iconName,
        [style.input__field_readOnly]: readOnly,
        [style.input__field_withPrefix]: prefix,
        [style.input__field_withPrefixText]: prefixText,
        [style.input__field_small]: size === 'small',
        [style.input__field_focus]: autoFocus,
    });

    const iconSuffixClassName = clsx(style.input__suffix, classNameSuffix, {
        [style['input__suffix-clickable']]: onClickIcon,
        [style['input__suffix-disabled']]: iconDisabledIfEmpty && (value === undefined || value === ''),
    });

    const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
        e.currentTarget.blur();
    };

    return (
        <div className={clsx(style.input, className)}>
            { label && <Label text={label} htmlFor={inputId} required={required} /> }

            <div className={style.input__fieldContainer}>
                { prefixText
                    ? <span className={style.input__prefix}>{ prefixText }</span>
                    : prefix ? <Icon name={prefix} className={style.input__prefix} /> : null
                }
                <input
                    id={inputId}
                    className={inputFieldClassName}
                    placeholder={placeholder}
                    data-testid={testId}
                    disabled={disabled}
                    type={type}
                    name={name}
                    ref={ref}
                    onBlur={onBlur}
                    onChange={onChange}
                    defaultValue={defaultValue}
                    value={value}
                    autoCapitalize={autoCapitalize}
                    autoComplete={autoComplete}
                    readOnly={readOnly}
                    onWheel={handleWheel}
                    maxLength={maxLength}
                    max={max}
                    inputMode={inputMode}
                    autoFocus={autoFocus}
                    {...register}
                />

                { iconName && <Icon name={iconName} className={iconSuffixClassName} onClick={onClickIcon} /> }
            </div>
            { caption && <span className={style.input__caption}>{ caption }</span> }

            { error && <Error error={error} /> }
        </div>
    );
}

export default Input;
