'use client';

import { ChangeEvent } from 'react';
import { Input as AntInput } from 'antd';

import Error from '@bdt/shared/ui/Error';
import Label from '@bdt/shared/ui/Label';

import style from './InputPassword.module.scss';

type TInputStatus = 'warning' | 'error' | 'success' | 'validating';

interface IInputProps {
    value?: string;
    status?: TInputStatus;
    label?: string;
    placeholder?: string;
    error?: string;
    autoComplete?: string;
    required?: boolean;
    className?: string;

    onChange: (value: string) => void;
};

function InputPassword({ value, status, label, placeholder, error, autoComplete, required, className, onChange }: IInputProps) {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return <div className={className}>
        { label && <Label text={label} /> }
        <AntInput.Password status={error ? 'error' : status} value={value} placeholder={placeholder} onChange={handleChange} className={style.input} autoComplete={autoComplete} required={required} />
        { error && <Error error={error} className="mt-[5px]" /> }
    </div>;
}

export default InputPassword;
