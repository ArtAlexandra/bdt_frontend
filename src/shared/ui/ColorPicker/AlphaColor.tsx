'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Alpha } from '@uiw/react-color';
import Color from 'color';

import { debounce } from '@bdt/shared/helpers/DataHelpers';

interface IAlphaColorProps {
    color: string;

    onChange: (color: string) => void;
};

function AlphaColor({ onChange, color: colorHex }: IAlphaColorProps) {
    const [colorHsva, setColorHsva] = useState({ h: 0, s: 0, v: 0, a: 0 });

    useEffect(() => {
        const color = Color(colorHex);
        const [h, s, v] = color.hsv().array();

        setColorHsva({ h, s, v, a: color.alpha() });
    }, [colorHex]);

    const debouncedOnChange = useRef(debounce({ callback: (hex: string) => onChange(hex), time: 10 })).current;

    const handleChangeColor = useCallback((value: { a: number }) => {
        const hsva = { ...colorHsva, a: value.a };

        setColorHsva(hsva);

        const hex = Color({
            h: hsva.h,
            s: hsva.s,
            v: hsva.v,
            alpha: value.a
        }).hexa();

        debouncedOnChange(hex);
    }, [debouncedOnChange, colorHsva]);

    useEffect(() => {
        return () => debouncedOnChange.cancel();
    }, [debouncedOnChange]);

    return <Alpha hsva={colorHsva} onChange={handleChangeColor} />;
}

export default AlphaColor;
