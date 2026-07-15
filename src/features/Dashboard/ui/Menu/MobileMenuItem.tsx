import clsx from 'clsx';

import style from './MobileMenuItem.module.scss';

interface IItemProps {
    icon: React.ReactNode;
    tooltip: string;
    isActive: boolean;

    onClick: () => void;
};

function Item({ icon, tooltip, isActive, onClick }: IItemProps) {
    const cssClassName = clsx(style.item, {
        [style.item_active]: isActive,
    });

    return (
        <div className={cssClassName} onClick={onClick}>
            <span className={style.item__icon}>
                { icon }
            </span>
            <span className={style.item__tooltip}>{ tooltip }</span>
        </div>
    );
}

export default Item;
