'use client';

import clsx from 'clsx';

import style from './Dots.module.scss';

import type { TContent } from '@bdt/entities/VK';

interface IDotsProps {
    currentIndex: number;
    media: TContent[];
    className?: string;

    onSetCuttentIndex: (index: number) => void;
};

function Dots({ currentIndex, media, className, onSetCuttentIndex }: IDotsProps) {
    return (
        <div className={clsx(style.dots, className)}>
            { media.map((_, index) => (
                <button
                    key={index}
                    className={clsx(style.dots__dot, {
                        [style['dots__dot--active']]: index === currentIndex
                    })}
                    onClick={() => onSetCuttentIndex(index)}
                    aria-label={`Перейти к слайду ${index + 1}`}
                />
            )) }
        </div>
    );
}

export default Dots;
