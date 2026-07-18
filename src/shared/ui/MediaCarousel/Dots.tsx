'use client';

import clsx from 'clsx';

import style from './Dots.module.scss';

interface IDotsProps {
    currentIndex: number;
    mediaSize: number;
    className?: string;

    onClick: (index: number) => void;
};

function Dots({ currentIndex, mediaSize, className, onClick }: IDotsProps) {
    return (
        <div className={clsx(style.dots, className)}>
            { Array.from({ length: mediaSize }).map((_, index) => (
                <button
                    key={index}
                    className={clsx(style.dots__dot, {
                        [style['dots__dot--active']]: index === currentIndex
                    })}
                    onClick={() => onClick(index)}
                    aria-label={`Перейти к слайду ${index + 1}`}
                />
            )) }
        </div>
    );
}

export default Dots;
