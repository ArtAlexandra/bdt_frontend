'use client';

import { PublicSection } from '@bdt/shared/ui/Section';

import AboutUsSlider from '@bdt/features/AboutUsSlider';

import { ABOUT_US_ID } from '../config/Config';

import style from './AboutUsSection.module.scss';

function AboutUsSection() {
    return (
        <PublicSection className={style.aboutUsSection} id={ABOUT_US_ID}>
            <h2 className={style.aboutUsSection__title}>О нас</h2>
            <AboutUsSlider className={style.aboutUsSection__slider} />
        </PublicSection>
    );
}

export default AboutUsSection;
