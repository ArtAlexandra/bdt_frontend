'use client';

import Button from '@bdt/shared/ui/Button';
import { PublicSection } from '@bdt/shared/ui/Section';

import style from './HowWeWorkSection.module.scss';

function HowWeWorkSection() {
    return (
        <div className={style.howWeWorkSection}>
            <div className={style.howWeWorkSection__videoContainer}>
                <video className={style.howWeWorkSection__videoBg} autoPlay loop muted playsInline preload="metadata">
                    <source src="https://s3.firstvds.ru/bdt/fish_how_we_work.mp4" type="video/mp4" />
                </video>
            </div>

            <PublicSection className={style.howWeWorkSection__section}>
                <h2 className={style.howWeWorkSection__title}>Как мы работаем</h2>

                <div className={style.howWeWorkSection__center}>
                    <div className={style.howWeWorkSection__glass}>
                        <p className={style.howWeWorkSection__description}>
                            Мы специализируемся на оптовых поставках экзотических морских рыбок
                            из-за рубежа в Россию. Наша компания обеспечивает профессиональную
                            логистику и доставку здоровых гидробионтов от проверенных поставщиков
                            до вашего магазина.
                        </p>
                    </div>

                    <Button variant="secondaryOutlineLight" size="large">Подробнее</Button>
                </div>
            </PublicSection>
        </div>
    );
}

export default HowWeWorkSection;
