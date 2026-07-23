import { usePathname, useRouter } from 'next/navigation';

import Icon from '@bdt/shared/ui/Icon';

import { useGetUserQuery } from '@bdt/entities/User';

import { MENU } from '../../config/Menu';

import MobileMenuItem from './MobileMenuItem';

import style from './MobileMenu.module.scss';

interface IMobileMenuProps {
    onClose: () => void;
};

function MobileMenu({ onClose }: IMobileMenuProps) {
    const router = useRouter();
    const currentPath = usePathname();
    const { data: user } = useGetUserQuery();

    const isActivePath = (path: string) => currentPath === path;

    const handleChoosingItem = (url: string) => {
        router.push(url);
        onClose();
    };

    return (
        <div className={style.mobileMenu}>
            <div className={style.container}>
                <Icon name="close" onClick={onClose} className={style.content__close} />

                <div className={style.content__items}>
                    { MENU.map((item) => {
                        const disabled = item.isAdmin ? !user?.isAdmin : false;
                        return (
                            <MobileMenuItem
                                key={`mobile-menu-item-${item.id}`}
                                icon={item.icon}
                                tooltip={item.tooltip}
                                onClick={() => handleChoosingItem(item.path)}
                                isActive={isActivePath(item.path)}
                                disabled={disabled}
                            />
                        );
                    }) }
                </div>
            </div>
        </div>
    );
}

export default MobileMenu;
