'use client';

import { Slider as SliderAnt } from 'antd';

import Button from '@bdt/shared/ui/Button';
import Icon from '@bdt/shared/ui/Icon';
import Label from '@bdt/shared/ui/Label';

import style from './Slider.module.scss';

interface ISliderProps {
    min: number;
    max: number;
    defaultValue?: number;
    className?: string;
    step?: number;
    label?: string;
    value: number;
    showButtons?: boolean;

    onChange: (value: number) => void;
    onChangeComplete?: (value: number) => void;
};

function Slider({ min, max, defaultValue, className, step = 1, label, value, showButtons = true, onChange, onChangeComplete }: ISliderProps) {
    const handlePlusValue = () => {
        onChange(Math.min(value + step, max));
    };

    const handleMinesValue = () => {
        onChange(Math.max(value - step, min));
    };

    return (
        <div className={className}>
            { label && <Label text={label} /> }

            <div className={style.slider}>
                { showButtons && <Button variant="light" size="medium" onClick={handleMinesValue} disabled={value <= min}>
                    <Icon name="minus" />
                </Button> }
                <SliderAnt min={min} max={max} step={step} defaultValue={defaultValue} value={value} onChange={onChange} onChangeComplete={onChangeComplete} />
                { showButtons && <Button variant="light" size="medium" onClick={handlePlusValue} disabled={value >= max}>
                    <Icon name="plus" />
                </Button> }
            </div>
        </div>
    );
}

export default Slider;