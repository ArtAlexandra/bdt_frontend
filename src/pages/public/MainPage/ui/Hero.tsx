'use client';

import Image from 'next/image';

import styles from './Hero.module.scss';

function Hero() {
    return (
        <div className={styles.hero}>
            <div className={styles.hero__videoContainer}>
                <video className={styles.hero__videoBg} autoPlay loop muted playsInline preload="metadata">
                    <source src="/video/bdt_hero.mp4" type="video/mp4" />
                </video>
            </div>

            <div className={styles.hero__container}>
                <div className={styles.hero__glass}>
                    <div className={styles.hero__content}>
                        <div className={styles.hero__textBlock}>
                            <h1 className={styles.hero__title}>Аквариумные рыбки оптом</h1>
                            <div className={styles.hero__desc}>Доставка по планете Земля и её окресностям</div>
                        </div>
                        <Image src="/image/logo.svg" alt="logo" width={100} height={100} loading="eager" priority className={styles.hero__logo} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
