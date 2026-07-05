'use client';

import { ChangeEvent } from 'react';
import { Input as AntInput } from 'antd';

import Label from '@bdt/shared/ui/Label';

import style from './Input.module.scss';

type TInputStatus = 'warning' | 'error' | 'success' | 'validating';

const INPUT_TYPE = {
    PASSWORD: 'password',
    TEXT: 'text',
    EMAIL: 'email',
} as const;

type TInputType = typeof INPUT_TYPE[keyof typeof INPUT_TYPE];

interface IInputProps {
    value?: string;
    type?: TInputType;
    status?: TInputStatus;
    label?: string;
    className?: string;

    onChange: (value: string) => void;
};

function Input({ value, status, type, label, className, onChange }: IInputProps) {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    if (type === INPUT_TYPE.PASSWORD) {
        return <div className={className}>
            { label && <Label text={label} /> }
            <AntInput.Password status={status} type={type} value={value} onChange={handleChange} className={style.input} />
        </div>;
    }

    return <div className={className}>
        { label && <Label text={label} /> }
        <AntInput status={status} type={type} value={value} onChange={handleChange} className={style.input} />
    </div>;
}

export default Input;
