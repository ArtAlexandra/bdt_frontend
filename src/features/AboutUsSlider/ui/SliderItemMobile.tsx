'use client';

import Image from 'next/image';

import style from './SliderItemMobile.module.scss';

import type { TSliderData } from '../config/SliderData';

interface ISliderItemMobileProps {
    data: TSliderData;

    onClick: () => void;
};

function SliderItemMobile({ data, onClick }: ISliderItemMobileProps) {
    const { title, imageSrc } = data;
    return (
        <div onClick={onClick} className={style.sliderItemMobile}>
            <div className={style.sliderItemMobile__imageWrapper}>
                <Image src={imageSrc} alt={title} fill className={style.sliderItemMobile__image} priority />
            </div>
            <div className={style.sliderItemMobile__content}>
                <div className={style.sliderItemMobile__title}>{ title }</div>
            </div>
        </div>
    );
}

export default SliderItemMobile;
