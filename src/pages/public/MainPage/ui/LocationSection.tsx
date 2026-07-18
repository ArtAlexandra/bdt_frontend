'use client';

import Image from 'next/image';
import Link from 'next/link';

import useCopyToClipboard from '@bdt/shared/hooks/useCopyToClipboard';

import { BDT_EMAIL, BDT_PHONE, BDT_VK_URL, VK_LOGO_URL } from '@bdt/shared/config/AppEnvironment';

import Icon from '@bdt/shared/ui/Icon';

import style from './LocationSection.module.scss';

function LocationSection() {
    const { copy: handleCopy } = useCopyToClipboard();
    return (
        <div className={style.locationSection}>
            <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A422dc4a5e7fde86619d0887ac52e94c6bfa76e477f1ad9e42811289fa185bcfa&amp;source=constructor"
                title="Карта расположения офиса"
                aria-label="Карта с адресом: Московская область, деревня Коробово, 56/2"
                className={style.locationSection__map}
            />

            <div className={style.locationSection__container}>
                <div className={style.locationSection__info}>
                    <div className={style.locationSection__subtitle}>Расположение</div>
                    <div>Московская область</div>
                    <div>Факт. Адрес: 142715, МО, Ленинский район,</div>
                    <div>деревня Коробово, 56/2</div>
                    <div className={style.locationSection__contacts}>
                        <div className={style.locationSection__contact} aria-label={`Copy email ${BDT_EMAIL}`} onDoubleClick={() => handleCopy(BDT_EMAIL)}>
                            <Icon name="email" className={style['locationSection__contact-icon']} />
                            { BDT_EMAIL }
                        </div>
                        <div className={style.locationSection__contact} aria-label={`Copy phone ${BDT_PHONE}`} onDoubleClick={() => handleCopy(BDT_PHONE)}>
                            <Icon name="phone" className={style['locationSection__contact-icon']} />
                            { BDT_PHONE }
                        </div>
                    </div>

                    <Link href={BDT_VK_URL} aria-label="Перейти в группу ВКонтакте" target="_blank" rel="noopener noreferrer"><Image src={VK_LOGO_URL} alt="Логотип ВКонтакте" width={25} height={25} /></Link>
                </div>

                <div className={style.locationSection__info}>
                    <div className={style.locationSection__subtitle}>Реквизиты</div>
                    <div>ИНН  771819434038</div>
                    <div>Р/С 40802810638060067695</div>
                    <div>в ОАО «Сбербанк России», г. Москва</div>
                    <div>БИК 044525225</div>
                    <div>К/С 30101810400000000225</div>
                </div>
            </div>
        </div>
    );
}

export default LocationSection;
