'use client';

import { useEffect, useRef, useState } from 'react';

import { useIsSafari } from '@bdt/shared/helpers/DeviceHelpers';

import Button from '@bdt/shared/ui/Button';
import Popover from '@bdt/shared/ui/Popover';
import Slider from '@bdt/shared/ui/Slider';

import style from './SliderPopoverBtn.module.scss';

interface ISliderPopoverBtnProps {
    icon: React.ReactNode;
    label: string;
    value: number | null;
    defaultValue: number;
    min: number;
    max: number;
    step: number;
    className?: string;

    format?: (v: number) => string;
    onChange: (value: number) => void;
}

function SliderPopoverBtn({ icon, label, value, defaultValue, min, max, step, className, format, onChange }: ISliderPopoverBtnProps) {
    const isSafari = useIsSafari();
    const [open, setOpen] = useState(false);
    const [dragValue, setDragValue] = useState<number | null>(null);

    const displayValue = value ?? defaultValue;
    const effectiveValue = dragValue ?? displayValue;
    const toDisplay = (v: number) => format ? format(v) : String(v);
    const effectiveText = toDisplay(effectiveValue);

    const [inputValue, setInputValue] = useState(effectiveText);
    const isEditing = useRef(false);

    useEffect(() => {
        if (!isEditing.current) {
            setInputValue(effectiveText);
        }
    }, [effectiveText]);

    const handleOpenChange = (nextOpen: boolean) => {
        if (!nextOpen) setDragValue(null);
        setOpen(nextOpen);
    };

    // Safari loses pointer capture on drag when the editor DOM mutates — defer onChange to onChangeComplete
    const handleSliderChange = (v: number) => {
        setDragValue(v);

        if (!isSafari) onChange(v);
    };

    const handleSliderChangeComplete = (v: number) => {
        setDragValue(null);

        if (isSafari) onChange(v);
    };

    const commit = (raw: string) => {
        isEditing.current = false;
        const parsed = parseFloat(raw);

        if (!isNaN(parsed)) {
            const rounded = Math.round(parsed / step) * step;
            const clamped = Math.min(max, Math.max(min, rounded));
            onChange(clamped);
            setInputValue(toDisplay(clamped));
        } else {
            setInputValue(effectiveText);
        }
    };

    const handleFocus = () => {
        isEditing.current = true;
        setInputValue(toDisplay(effectiveValue));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        commit(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            isEditing.current = false;
            setInputValue(effectiveText);
            e.currentTarget.blur();
        }
    };

    const content = (
        <div className={style.popoverContent}>
            <div className={style.popoverLabel}>
                { label }:
                <input
                    className={style.popoverInput}
                    inputMode="decimal"
                    value={inputValue}
                    onFocus={handleFocus}
                    onChange={(e) => setInputValue(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <Slider
                min={min}
                max={max}
                step={step}
                value={effectiveValue}
                onChange={handleSliderChange}
                onChangeComplete={handleSliderChangeComplete}
                showButtons={false}
            />
        </div>
    );

    return (
        <Popover content={content} placement="bottom" trigger="click" open={open} onOpenChange={handleOpenChange}>
            <div>
                <Button type="button" size="medium" variant="light" className={className}>
                    { icon }<span className={style.value}>{ value !== null ? effectiveText : '~' }</span>
                </Button>
            </div>
        </Popover>
    );
}

export default SliderPopoverBtn;
