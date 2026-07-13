'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import ShadeSlider from '@uiw/react-color-shade-slider';
import Color from 'color';

import { debounce } from '@bdt/shared/helpers/DataHelpers';

interface ISliderColorProps {
    color: string;

    onChange: (color: string) => void;
};

function SliderColor({ onChange, color: colorHex }: ISliderColorProps) {
    const [colorHsva, setColorHsva] = useState({ h: 0, s: 0, v: 0, a: 0 });

    useEffect(() => {
        const color = Color(colorHex);
        const [h, s, v] = color.hsv().array();

        setColorHsva({ h, s, v, a: color.alpha() });
    }, [colorHex]);

    const debouncedOnChange = useRef(debounce({ callback: (hex: string) => onChange(hex), time: 50 })).current;

    const handleChangeColor = useCallback((value: { v: number }) => {
        const hsva = { ...colorHsva, v: value.v };

        setColorHsva(hsva);

        const hex = Color({
            h: hsva.h,
            s: hsva.s,
            v: hsva.v,
            alpha: hsva.a
        }).hex();

        debouncedOnChange(hex);
    }, [debouncedOnChange, colorHsva]);

    useEffect(() => {
        return () => debouncedOnChange.cancel();
    }, [debouncedOnChange]);

    return <ShadeSlider hsva={colorHsva} onChange={handleChangeColor} />;
}

export default SliderColor;