'use client';

import { useResponsive } from '@bdt/shared/helpers/ResponsiveHelpers';

import AboutUsSliderDesktop from './AboutUsSliderDesktop';
import AboutUsSliderMobile from './AboutUsSliderMobile';

function AboutUsSlider() {
    const { isDesktop } = useResponsive();
    return isDesktop ? <AboutUsSliderDesktop /> : <AboutUsSliderMobile />;
}

export default AboutUsSlider;
