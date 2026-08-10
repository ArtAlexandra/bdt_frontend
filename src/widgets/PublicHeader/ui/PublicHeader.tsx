'use client';

import { useState } from 'react';
import clsx from 'clsx';

import useCopyToClipboard from '@bdt/shared/hooks/useCopyToClipboard';
import { notifySuccess } from '@bdt/shared/lib/Notifications';

import { BDT_EMAIL, BDT_PHONE } from '@bdt/shared/config/AppEnvironment';

import Button from '@bdt/shared/ui/Button';
import Icon from '@bdt/shared/ui/Icon';

import useScrollPosition from '@bdt/widgets/PublicHeader/model/useScrollPosition';

import Drawer from './Drawer';

import style from './PublicHeader.module.scss';

interface IPublicHeaderProps {
    variant?: 'white' | 'black';
};

function PublicHeader({ variant = 'white' }: IPublicHeaderProps) {
    const isScrolled = useScrollPosition();
    const { copy: handleCopy } = useCopyToClipboard();
    const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

    const handleCloseDrawer = () => setIsOpenDrawer(false);

    const handleCopyEmail = () => {
        notifySuccess(`Email ${BDT_EMAIL} скопирован`);
        handleCopy(BDT_EMAIL);
    };

    const handleCopyPhone = () => {
        notifySuccess(`Телефон ${BDT_PHONE} скопирован`);
        handleCopy(BDT_PHONE);
    };

    return (
        <>
            <Drawer onClose={handleCloseDrawer} isOpen={isOpenDrawer} />
            <div className={clsx(style.publicHeader, { [style['publicHeader-scrolled']]: isScrolled, [style['publicHeader-black']]: variant === 'black' })}>
                <div className={style.publicHeader__topRow}>
                    <Button className={style.publicHeader__burgerButton} onClick={() => setIsOpenDrawer(true)} variant="transparent" >
                        <Icon name="burger" className={style['publicHeader__burgerButton-icon']} />
                    </Button>

                    <div className={style.publicHeader__items}>
                        <Button className={style['publicHeader__items-button']} aria-label={`Copy email ${BDT_EMAIL}`} onClick={handleCopyEmail}>
                            <Icon name="email" />
                            { BDT_EMAIL }
                        </Button>
                        <Button className={style['publicHeader__items-button']} aria-label={`Copy phone ${BDT_PHONE}`} onClick={handleCopyPhone}>
                            <Icon name="phone" />
                            { BDT_PHONE }
                        </Button>
                    </div>
                </div>
                <div className={style.publicHeader__brand}>
                    Наташа <span className={style['publicHeader__brand-accent']}>&</span> Белов
                </div>
            </div>
        </>
    );
}

export default PublicHeader;
