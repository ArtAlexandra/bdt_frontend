'use client';

import { PublicSection } from '@bdt/shared/ui/Section';

import AboutUsSlider from '@bdt/features/AboutUsSlider';

import style from './AboutUsSection.module.scss';

function AboutUsSection() {
    return (
        <PublicSection className={style.aboutUsSection}>
            <h2 className={style.aboutUsSection__title}>О нас</h2>
            <AboutUsSlider />
        </PublicSection>
    );
}

export default AboutUsSection;
