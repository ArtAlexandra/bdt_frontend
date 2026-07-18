'use client';

import { memo, type ReactNode, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import Icon from '@bdt/shared/ui/Icon';

import { SELECT_SIZE, type TBasicOption } from './SelectTypes';

import style from './SimpleSelect.module.scss';


interface ISimpleSelectProps {
    options: TBasicOption[];
    value: string;
    defaultValue?: string;
    className?: string;
    placeholder?: string;
    popupMatchSelectWidth?: boolean;
    size?: SELECT_SIZE;
    optionRender?: (option: TBasicOption) => ReactNode;

    onChange: (value: string) => void;
};

function SimpleSelect({
    options,
    value,
    defaultValue,
    className,
    placeholder = '',
    popupMatchSelectWidth = false,
    size = SELECT_SIZE.default,
    optionRender,
    onChange,
}: ISimpleSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
    const currentValue = value || defaultValue || '';
    const selectedOption = options.find(item => item.value === currentValue);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (selectedValue: string) => {
        onChange(selectedValue);
        setIsOpen(false);
    };

    return (
        <div ref={selectRef} className={clsx(style.select, className)}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={clsx(style.select__trigger, {
                    [style.select__trigger_open]: isOpen,
                    [style.select__trigger_small]: size === SELECT_SIZE.small,
                })}
            >
                <span className={style.select__value}>
                    { selectedOption?.label || value || defaultValue || placeholder }
                </span>
                <Icon name="arrowDown" className={style.select__arrow} />
            </button>

            { isOpen && (
                <div
                    className={clsx(style.select__dropdown, {
                        [style.select__dropdown_fullWidth]: popupMatchSelectWidth,
                        [style.select__dropdown_autoWidth]: !popupMatchSelectWidth,
                    })}
                    role="listbox"
                >
                    { options.map((option) => (
                        <div
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            className={clsx(style.select__option, { [style.select__option_selected]: option.value === value })}
                            role="option"
                            aria-selected={option.value === value}
                        >
                            { optionRender ? optionRender(option) : option.label }
                        </div>
                    )) }
                </div>
            ) }
        </div>
    );
}

export default memo(SimpleSelect);
