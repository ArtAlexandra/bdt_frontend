'use client';

import { ColorPicker as AntdColorPicker } from 'antd';
import clsx from 'clsx';

import Label from '@bdt/shared/ui/Label';

import style from './ColorPickerDetailsSelectColor.module.scss';

interface IColorPickerDetailsSelectColorProps {
    defaultColor?: string;
    value?: string;
    isDisabledAlpha?: boolean;
    rootClassName?: string;
    isDisabledInput?: boolean;
    label?: string;
    className?: string;
    trigger?: 'hover' | 'click';
    children?: React.ReactNode;

    onChange: (color: string) => void;
};

function ColorPickerDetailsSelectColor({ defaultColor, value, isDisabledAlpha, isDisabledInput, label, className, children, trigger = 'hover', onChange }: IColorPickerDetailsSelectColorProps) {
    return (
        <div className={className}>
            { label && <Label text={label} /> }
            <AntdColorPicker
                rootClassName={clsx(style.colorPickerDetailsSelectColor, { [style.colorPickerDetailsSelectColor__input_disabled]: isDisabledInput })}
                disabledAlpha={isDisabledAlpha}
                defaultValue={defaultColor}
                onChange={(color) => onChange(color.toHexString())}
                size="middle"
                trigger={trigger}
                value={value}
                disabledFormat
            >
                { children }
            </AntdColorPicker>
        </div>
    );
}

export default ColorPickerDetailsSelectColor;
