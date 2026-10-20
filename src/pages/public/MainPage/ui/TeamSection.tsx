'use client';

import Image from 'next/image';

import { TEAM_PHOTO_1, TEAM_PHOTO_2, TEAM_PHOTO_3, TEAM_PHOTO_4, TEAM_PHOTO_5, TEAM_PHOTO_6, TEAM_PHOTO_7, TEAM_PHOTO_8 } from '@bdt/shared/config/AppEnvironment';

import Carousel from '@bdt/shared/ui/Carousel';
import { PublicSection } from '@bdt/shared/ui/Section';

import style from './TeamSection.module.scss';

const TEAM_PHOTOS = [TEAM_PHOTO_1, TEAM_PHOTO_2, TEAM_PHOTO_3, TEAM_PHOTO_4, TEAM_PHOTO_5, TEAM_PHOTO_6, TEAM_PHOTO_7, TEAM_PHOTO_8];

function TeamSection() {
    return (
        <PublicSection className={style.teamSection}>
            <div className={style.teamSection__container}>
                <h2 className={style.teamSection__title}>Наша команда</h2>
                <div className={style.teamSection__description}>Наши <b>стандарты</b> акклиматизации, строгий карантинный <b>контроль</b> и <b>отлаженная логистика</b> «от океана до ритейлера» — это фундамент <b>здорового ассортимента</b> для наших партнеров и стабильно <b>высокая приживаемость</b> рыб для вас.</div>

                <Carousel autoplay className={style.teamSection__slider}>
                    { TEAM_PHOTOS.map((image_url, index) => {
                        return (
                            <Image
                                src={image_url}
                                alt={`Наша команда. Фото ${index}`}
                                height={500}
                                width={800}
                                className={style.teamSection__image}
                                key={`image-url-${index}`}
                                unoptimized
                            />
                        );
                    }) }
                </Carousel>

            </div>
        </PublicSection>
    );
}

export default TeamSection;
