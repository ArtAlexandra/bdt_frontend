'use client';

import { ChangeEvent } from 'react';
import { Input as AntInput } from 'antd';

import Error from '@bdt/shared/ui/Error';
import Label from '@bdt/shared/ui/Label';

import style from './Input.module.scss';

type TInputStatus = 'warning' | 'error' | 'success' | 'validating';

const INPUT_TYPE = {
    PASSWORD: 'password',
    TEXT: 'text',
    EMAIL: 'email',
    NUMBER: 'number'
} as const;

type TInputType = typeof INPUT_TYPE[keyof typeof INPUT_TYPE];

interface IInputProps {
    value?: string;
    type?: TInputType;
    status?: TInputStatus;
    label?: string;
    placeholder?: string;
    error?: string;
    autoComplete?: string;
    className?: string;

    onChange: (value: string) => void;
};

function Input({ value, status, type, label, placeholder, error, autoComplete, className, onChange }: IInputProps) {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    if (type === INPUT_TYPE.PASSWORD) {
        return <div className={className}>
            { label && <Label text={label} /> }
            <AntInput.Password status={error ? 'error' : status} type={type} value={value} placeholder={placeholder} onChange={handleChange} className={style.input} autoComplete={autoComplete} />
            { error && <Error error={error} className="mt-[5px]" /> }
        </div>;
    }

    return <div className={className}>
        { label && <Label text={label} /> }
        <AntInput status={error ? 'error' : status} type={type} value={value} placeholder={placeholder} onChange={handleChange} className={style.input} autoComplete={autoComplete} />
        { error && <Error error={error} className="mt-[5px]" /> }
    </div>;
}

export default Input;
