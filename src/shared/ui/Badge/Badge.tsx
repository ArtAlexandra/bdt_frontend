'use client';

import Icon, { ICON_LIST } from '@bdt/shared/ui/Icon';

import style from './Badge.module.scss';

interface IBadgeProps {
    iconName: keyof typeof ICON_LIST;
};

function Badge({ iconName }: IBadgeProps) {
    return (
        <div className={style.badge}>
            <Icon name={iconName} />
        </div>
    );
}

export default Badge;
