'use client';

import { Checkbox as AntdCheckbox, CheckboxChangeEvent } from 'antd';
import clsx from 'clsx';

import style from './Checkbox.module.scss';

interface ICheckboxProps {
    checked?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    className?: string;
    children?: React.ReactNode;
    testId?: string;

    onChange?: (checked: boolean) => void;
};

function Checkbox({ checked, disabled, readOnly, className, children, onChange, testId }: ICheckboxProps) {
    const handleChange = (e: CheckboxChangeEvent) => {
        onChange?.(e.target.checked);
    };

    return (
        <div className={clsx(style.checkbox, { [style.checkbox_readonly]: readOnly }, className)} data-testid={testId}>
            <AntdCheckbox checked={checked} disabled={disabled} onChange={handleChange}>
                { children }
            </AntdCheckbox>
        </div>
    );
}

export default Checkbox;
