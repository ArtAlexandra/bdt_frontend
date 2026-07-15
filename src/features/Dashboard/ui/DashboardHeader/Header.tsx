'use client';

import { useState } from 'react';

import Icon from '@bdt/shared/ui/Icon';

import MobileMenu from '../Menu/MobileMenu';

import style from './Header.module.scss';

function Header() {
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

    const handleOpenSidebar = () => {
        setIsOpenMenu(!isOpenMenu);
    };

    return (
        <>
            { isOpenMenu && <MobileMenu onClose={handleOpenSidebar} /> }

            <header className={style.header}>
                <div className={style.header__right}>
                    <Icon name="burgerMenu" className={style.header__burger} onClick={handleOpenSidebar} />
                </div>
            </header>
        </>
    );
}

export default Header;
