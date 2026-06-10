'use client';

import Image from 'next/image';

import style from './HeroSection.module.scss';

function HeroSection() {
    return (
        <div className={style.heroSection}>
            <div className={style.heroSection__videoContainer}>
                <video className={style.heroSection__videoBg} autoPlay loop muted playsInline preload="metadata">
                    <source src="/video/bdt_hero.mp4" type="video/mp4" />
                </video>
            </div>

            <div className={style.heroSection__container}>
                <div className={style.heroSection__glass}>
                    <div className={style.heroSection__content}>
                        <div className={style.heroSection__textBlock}>
                            <h1 className={style.heroSection__title}>Аквариумные рыбки оптом</h1>
                            <div className={style.heroSection__desc}>Доставка по планете Земля и её окресностям</div>
                        </div>
                        <Image src="/image/logo.svg" alt="logo" width={100} height={100} loading="eager" priority className={style.heroSection__logo} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
