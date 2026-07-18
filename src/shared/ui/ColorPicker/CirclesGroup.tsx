'use client';

import { CirclePicker, ColorResult } from 'react-color';

import { COLOR_PALETTE } from './ColorPalette';

interface ICirclesGroupProps {
    className?: string;
    color: string;

    onChange: (color: string) => void;
};

function CirclesGroup({ className, onChange, color }: ICirclesGroupProps) {
    const handleChangeColor = (value: ColorResult) => {
        onChange(value.hex.toUpperCase());
    };

    return <CirclePicker className={className} circleSpacing={18} circleSize={24} colors={COLOR_PALETTE} onChange={handleChangeColor} color={color} />;
}

export default CirclesGroup;
