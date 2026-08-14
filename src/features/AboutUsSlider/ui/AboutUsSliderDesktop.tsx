'use client';

import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

import { SliderData } from '../config/SliderData';

import SliderItem from './SliderItem';

import style from './AboutUsSliderDesktop.module.scss';

interface IAboutUsSliderDesktopProps {
    className?: string;
};

function AboutUsSliderDesktop({ className }: IAboutUsSliderDesktopProps) {
    const [currentBackgroundImage, setCurrentBackgroundImage] = useState<string>(SliderData[0].imageSrc);
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

    const handleChangeBackgroundImage = (index: number) => {
        if (isTransitioning) return;

        setIsTransitioning(true);
        setCurrentBackgroundImage(SliderData[index].imageSrc);

        setTimeout(() => {
            setIsTransitioning(false);
        }, 50);
    };

    return (
        <div className={clsx(style.aboutUsSliderDesktop, className)}>
            <div className={style.aboutUsSliderDesktop__imageWrapper}>
                <Image src={currentBackgroundImage} alt="О нас" fill className={clsx(style.aboutUsSliderDesktop__image, { [style.aboutUsSliderDesktop__image_transitioning]: isTransitioning })} priority />
            </div>
            { SliderData.map((item, index) => {
                return <SliderItem data={item} key={item.id} onClick={() => { }} onHover={() => handleChangeBackgroundImage(index)} />;
            }) }
        </div>
    );
}

export default AboutUsSliderDesktop;
