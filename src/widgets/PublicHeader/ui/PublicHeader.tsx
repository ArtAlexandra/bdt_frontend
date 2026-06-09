'use client';

import { useState } from 'react';
import clsx from 'clsx';

import useCopyToClipboard from '@bdt/shared/hooks/useCopyToClipboard';

import { BDT_EMAIL, BDT_PHONE } from '@bdt/shared/config/AppEnvironment';

import Button from '@bdt/shared/ui/Button';
import Icon from '@bdt/shared/ui/Icon';

import useScrollPosition from '@bdt/widgets/PublicHeader/model/useScrollPosition';

import Drawer from './Drawer';

import style from './PublicHeader.module.scss';

function PublicHeader() {
    const isScrolled = useScrollPosition();
    const { copy: handleCopy } = useCopyToClipboard();
    const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

    const handleCloseDrawer = () => setIsOpenDrawer(false);

    return (
        <>
            <Drawer onClose={handleCloseDrawer} isOpen={isOpenDrawer} />
            <div className={clsx(style.publicHeader, { [style['publicHeader-scrolled']]: isScrolled })}>
                <div className={style.publicHeader__topRow}>
                    <Button className={style.publicHeader__burgerButton} onClick={() => setIsOpenDrawer(true)} variant="transparent" >
                        <Icon name="burger" className={style['publicHeader__burgerButton-icon']} />
                    </Button>

                    <div className={style.publicHeader__items}>
                        <Button className="!text-base" aria-label={`Copy email ${BDT_EMAIL}`} onClick={() => handleCopy(BDT_EMAIL)}>
                            <Icon name="email" />
                            { BDT_EMAIL }
                        </Button>
                        <Button className="!text-base" aria-label={`Copy phone ${BDT_PHONE}`} onClick={() => handleCopy(BDT_PHONE)}>
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
