'use client';

import Image from 'next/image';

import style from './SliderItemMobile.module.scss';

import type { TSliderData } from '../config/SliderData';

interface ISliderItemMobileProps {
    data: TSliderData;

    onClick: () => void;
};

function SliderItemMobile({ data, onClick }: ISliderItemMobileProps) {
    const { title, iconSrc, imageSrc } = data;
    return (
        <div onClick={onClick} className={style.sliderItemMobile}>
            <div className={style.sliderItemMobile__imageWrapper}>
                <Image src={imageSrc} alt={title} fill className={style.sliderItemMobile_image} priority />
            </div>
            <div className={style.sliderItemMobile__content}>
                <Image src={iconSrc} alt={title} width={64} height={64} priority className={style.sliderItemMobile__icon} />
                <div className={style.sliderItemMobile__title}>{ title }</div>
            </div>
        </div>
    );
}

export default SliderItemMobile;
