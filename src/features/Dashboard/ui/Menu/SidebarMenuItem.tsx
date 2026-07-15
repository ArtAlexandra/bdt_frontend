import Link from 'next/link';
import clsx from 'clsx';

import Tooltip from '@bdt/shared/ui/Tooltip';

import style from './SidebarMenuItem.module.scss';

interface ISidebarMenuItemProps {
    icon: React.ReactNode;
    tooltip: React.ReactNode;
    isActive?: boolean;
    path?: string;
};

function SidebarMenuItem({ icon, tooltip, path = '#', isActive }: ISidebarMenuItemProps) {
    return (
        <Tooltip title={tooltip} placement="right" pointAtCenter>
            <Link className={clsx(style.item, { [style.active]: isActive })} href={path} >
                { icon }
            </Link>
        </Tooltip>
    );
}

export default SidebarMenuItem;
