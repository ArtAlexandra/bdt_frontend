'use client';

import { SliderData } from '../config/SliderData';

import SliderItemMobile from './SliderItemMobile';

import style from './AboutUsSliderMobile.module.scss';

function AboutUsSliderMobile() {
    return (
        <div className={style.aboutUsSliderMobile}>
            <div className={style.aboutUsSliderMobile__track}>
                { SliderData.map((item) => {
                    return <SliderItemMobile data={item} key={item.id} onClick={() => { }} />;
                }) }
            </div>
        </div>
    );
}

export default AboutUsSliderMobile;
