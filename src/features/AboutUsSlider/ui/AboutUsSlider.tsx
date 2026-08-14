'use client';

import { useResponsive } from '@bdt/shared/helpers/ResponsiveHelpers';

import AboutUsSliderDesktop from './AboutUsSliderDesktop';
import AboutUsSliderMobile from './AboutUsSliderMobile';

interface IAboutUsSliderProps {
    className?: string;
};

function AboutUsSlider({ className }: IAboutUsSliderProps) {
    const { isDesktop } = useResponsive();
    return isDesktop ? <AboutUsSliderDesktop className={className} /> : <AboutUsSliderMobile className={className} />;
}

export default AboutUsSlider;
