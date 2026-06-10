'use client';

import clsx from 'clsx';

import { useBodyScrollLock } from '@bdt/shared/hooks/useBodyScrollLock';
import { useClickButton } from '@bdt/shared/hooks/useClickButton';

import Button from '@bdt/shared/ui/Button';
import Icon from '@bdt/shared/ui/Icon';

import { MENU } from '../config/Menu';

import style from './Drawer.module.scss';

interface IDrawerProps {
    isOpen: boolean;

    onClose: () => void;
};

function Drawer({ isOpen, onClose }: IDrawerProps) {
    useClickButton({ isEnabled: isOpen, type: 'Escape', onClick: onClose });
    useBodyScrollLock({ isEnabled: isOpen });

    return (
        <div className={clsx(style.drawer, { [style['drawer-open']]: isOpen })}>
            <div className={style.drawer__overlay} onClick={onClose} />

            <div className={style.drawer__panel}>
                <div className={style.drawer__header}>
                    <Button onClick={onClose} variant="transparent" aria-label="Close menu">
                        <Icon name="close" className={style.drawer__closeIcon} />
                    </Button>
                </div>

                <div className={style.drawer__nav}>
                    { MENU.map(((item, index) => (
                        <div key={`menu_item_${index}`} className={style.drawer__navItem} onClick={onClose}>
                            { item.name }
                        </div>
                    ))) }
                </div>
            </div>
        </div>
    );
}

export default Drawer;
