'use client';

import Image from 'next/image';
import BackgroundVideo from 'next-video/background-video';
import heroVideo from '@bdt/videos/bdt_hero.mp4';

import { LOGO_TRANSPARENT_URL, POSTER_HERO_URL } from '@bdt/shared/config/AppEnvironment';

import Button from '@bdt/shared/ui/Button';
import Icon from '@bdt/shared/ui/Icon';

import { ABOUT_US_ID } from '../config/Config';
import { useKeepVideoPlaying } from '../model/useKeepVideoPlaying';

import style from './HeroSection.module.scss';

function HeroSection() {
    const containerRef = useKeepVideoPlaying();

    const handleScrollToNextSection = () => {
        const pricingSection = document.getElementById(ABOUT_US_ID);
        if (pricingSection) {
            pricingSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className={style.heroSection}>
            <div className={style.heroSection__videoContainer} ref={containerRef}>
                <BackgroundVideo src={heroVideo} className={style.heroSection__videoBg} blurDataURL={POSTER_HERO_URL} autoPlay loop muted playsInline />
            </div>

            <div className={style.heroSection__container}>
                <div className={style.heroSection__glass}>
                    <div className={style.heroSection__content}>
                        <div className={style.heroSection__textBlock}>
                            <h1 className={style.heroSection__title}>Аквариумные рыбки оптом</h1>
                            <div className={style.heroSection__desc}>Доставка по планете Земля и её окресностям</div>
                        </div>
                        <Image src={LOGO_TRANSPARENT_URL} alt="logo" width={100} height={100} loading="eager" priority className={style.heroSection__logo} />
                    </div>
                </div>
            </div>

            <Button variant="secondaryOutlineLight" className={style.heroSection__scrollButton} onClick={handleScrollToNextSection}><Icon name="arrowDown" /></Button>
        </div>
    );
}

export default HeroSection;
