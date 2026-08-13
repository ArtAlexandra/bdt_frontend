'use client';

import Image from 'next/image';

import { TEAM_PHOTO } from '@bdt/shared/config/AppEnvironment';

import { PublicSection } from '@bdt/shared/ui/Section';

import style from './TeamSection.module.scss';

function TeamSection() {
    return (
        <PublicSection className={style.teamSection}>
            <div className={style.teamSection__container}>
                <h2 className={style.teamSection__title}>Наша команда</h2>
                <div className={style.teamSection__description}>Наши <b>стандарты</b> акклиматизации, строгий карантинный <b>контроль</b> и <b>отлаженная логистика</b> «от океана до ритейлера» — это фундамент <b>здорового ассортимента</b> для наших партнеров и стабильно <b>высокая приживаемость</b> рыб для вас.</div>
                <Image src={TEAM_PHOTO} className={style.teamSection__image} alt="Наша команда" width={800} height={600} priority />
            </div>
        </PublicSection>
    );
}

export default TeamSection;
