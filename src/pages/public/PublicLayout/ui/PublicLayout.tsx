'use client';

import Image from 'next/image';

import { PublicSection } from '@bdt/shared/ui/Section';

import PublicFooter from '@bdt/widgets/PublicFooter';
import PublicHeader from '@bdt/widgets/PublicHeader';

import style from './PublicLayout.module.scss';

interface IPublicLayoutProps {
    children: React.ReactNode;
};

function PublicLayout({ children }: IPublicLayoutProps) {
    return (
        <div className={style.layout}>
            <PublicHeader variant="black" />

            <PublicSection className={style.layout__content}>
                { children }
            </PublicSection>

            <div className={style.layout__imageContainer}>
                <Image className={style.layout__image} src="/image/background_top.png" alt="background_image" fill quality={100} priority />
            </div>

            <PublicFooter />
        </div>
    );
}

export default PublicLayout;
