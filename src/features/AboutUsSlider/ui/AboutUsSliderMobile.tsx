'use client';

import clsx from 'clsx';

import { SliderData } from '../config/SliderData';

import SliderItemMobile from './SliderItemMobile';

import style from './AboutUsSliderMobile.module.scss';

interface IAboutUsSliderMobileProps {
    className?: string;
};

function AboutUsSliderMobile({ className }: IAboutUsSliderMobileProps) {
    return (
        <div className={clsx(style.aboutUsSliderMobile, className)}>
            <div className={style.aboutUsSliderMobile__track}>
                { SliderData.map((item) => {
                    return <SliderItemMobile data={item} key={item.id} onClick={() => { }} />;
                }) }
            </div>
        </div>
    );
}

export default AboutUsSliderMobile;
