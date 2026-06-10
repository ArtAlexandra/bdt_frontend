import clsx from 'clsx';

import { ICON_LIST } from './IconList';

import styles from './Icon.module.scss';

interface IIconProps {
    className?: string;
    name: keyof typeof ICON_LIST;

    onClick?: () => void;
}

const Icon = ({ name, className, onClick }: IIconProps) => {
    const IconComponent = ICON_LIST[name];

    if (!IconComponent) {
        console.warn(`Icon "${name}" not found in react-icons`);
        return null;
    }

    return (
        <span className={clsx(styles.icon, className)}>
            <IconComponent className={styles.icon__svg} onClick={onClick} />
        </span>
    );
};

export default Icon;
