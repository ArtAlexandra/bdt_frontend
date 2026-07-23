import clsx from 'clsx';

import style from './MobileMenuItem.module.scss';

interface IItemProps {
    icon: React.ReactNode;
    tooltip: string;
    isActive: boolean;
    disabled?: boolean;

    onClick: () => void;
};

function Item({ icon, tooltip, isActive, disabled = false, onClick }: IItemProps) {
    const cssClassName = clsx(style.item, {
        [style.item_active]: isActive,
        [style.item_disabled]: disabled,
    });

    const handleClick = () => {
        if (!disabled) {
            onClick();
        }
    };

    return (
        <div className={cssClassName} onClick={handleClick}>
            <span className={style.item__icon}>
                { icon }
            </span>
            <span className={style.item__tooltip}>{ tooltip }</span>
        </div>
    );
}

export default Item;
