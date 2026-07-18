import { memo, RefObject, useEffect, useRef } from 'react';
import { RefCallBack, UseFormRegisterReturn } from 'react-hook-form';
import clsx from 'clsx';

import Error from '@bdt/shared/ui/Error';
import Label from '@bdt/shared/ui/Label';

import style from './Textarea.module.scss';

interface ITextareaProps {
    placeholder: string;
    value?: string | undefined;
    required?: boolean;
    label?: string;
    className?: string;
    error?: string | { message?: string };
    name?: string;
    ref?: RefCallBack | RefObject<HTMLTextAreaElement | null>;
    disabled?: boolean;
    register?: Partial<UseFormRegisterReturn>;

    onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    onChangeInput?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

function Textarea({ placeholder, onBlur, onChangeInput, value, required, label, className, error, name, ref, disabled, register }: ITextareaProps) {
    const textareaFieldClassName = clsx(style.textarea__field, {
        [style.textarea__field_error]: error,
        [style.textarea__field_disabled]: disabled,
    });

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = (textarea: HTMLTextAreaElement) => {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    useEffect(() => {
        if (textareaRef.current && value) adjustHeight(textareaRef.current);
    }, [value]);

    const handleChangeInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        adjustHeight(event.target);
        if (onChangeInput) onChangeInput(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        if (onBlur) onBlur(event);
    };

    const combinedRef = (node: HTMLTextAreaElement | null) => {
        if (typeof ref === 'function') {
            ref(node);
        } else if (ref) {
            (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
        }

        textareaRef.current = node;
    };

    return (
        <div className={clsx(style.textarea, className)}>
            { label && <Label text={label} required={required} /> }

            <textarea
                className={textareaFieldClassName}
                onInput={(e) => adjustHeight(e.currentTarget)}
                ref={combinedRef}
                onBlur={handleBlur}
                name={name}
                disabled={disabled}
                placeholder={placeholder}
                onChange={handleChangeInput}
                required={required}
                value={value}
                {...register}
            />

            { error && <Error error={error} /> }
        </div>
    );
}

export default memo(Textarea);
