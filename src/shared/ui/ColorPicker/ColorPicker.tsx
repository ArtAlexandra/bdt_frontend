'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';

import Label from '@bdt/shared/ui/Label';
import Popover from '@bdt/shared/ui/Popover';

import AlphaColor from './AlphaColor';
import CirclesGroup from './CirclesGroup';
import { COLOR_PALETTE } from './ColorPalette';
import SliderColor from './SliderColor';

import style from './ColorPicker.module.scss';

interface IColorPickerProps {
    defaultColor?: string;
    isEmpty?: boolean;
    showAlpha?: boolean;
    label?: string;
    className?: string;

    onChange: (color: string) => void;
};

function ColorPicker({ defaultColor, isEmpty, showAlpha, label, className, onChange }: IColorPickerProps) {
    const [color, setColor] = useState<string>(defaultColor || COLOR_PALETTE[0]);
    const [colorCircle, setColorCircle] = useState<string>(defaultColor || COLOR_PALETTE[0]);
    const [colorSlider, setColorSlider] = useState<string>(defaultColor || COLOR_PALETTE[0]);
    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        if (!defaultColor) return;

        setColorCircle(defaultColor);
        setColorSlider(defaultColor);
        setColor(defaultColor);
    }, [defaultColor]);

    const handleChangeColorCircle = useCallback((color: string) => {
        setColorCircle(color);
        setColorSlider(color);
        setColor(color);
    }, []);

    const handleChangeColorSlider = useCallback((color: string) => {
        setColorSlider(color);
        setColor(color);
    }, []);

    const handleChangeColorAlpha = useCallback((color: string) => {
        setColor(color);
    }, []);


    const handleOpenChange = useCallback((isOpen: boolean) => {
        if (!isOpen && color !== (defaultColor ?? COLOR_PALETTE[0])) onChange(color);
        setIsActive(isOpen);
    }, [color, defaultColor, onChange]);

    const renderColorPicker = useMemo(() => {
        return (
            <div className={style.colorPickerPopover}>
                <CirclesGroup className={style.colorPickerPopover__circles} onChange={handleChangeColorCircle} color={colorCircle} />
                <SliderColor onChange={handleChangeColorSlider} color={colorCircle} />
                { showAlpha && <AlphaColor onChange={handleChangeColorAlpha} color={colorSlider} /> }
            </div>
        );
    }, [handleChangeColorCircle, colorCircle, handleChangeColorSlider, showAlpha, handleChangeColorAlpha, colorSlider]);

    return (
        <div className={className}>
            { label && <Label text={label} /> }
            <Popover content={renderColorPicker} placement="top" open={isActive} onOpenChange={handleOpenChange}>
                <div className={clsx(style.colorPicker, { [style.colorPicker_active]: isActive, [style.colorPicker_empty]: isEmpty })} style={{ backgroundColor: isEmpty ? undefined : color }}></div>
            </Popover>
        </div>
    );
}

export default ColorPicker;