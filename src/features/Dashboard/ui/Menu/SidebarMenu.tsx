import { useIsActivePath } from '@bdt/shared/hooks/useIsActivePath';

import { useGetUserQuery } from '@bdt/entities/User';

import { MENU } from '../../config/Menu';

import SidebarMenuItem from './SidebarMenuItem';

function SidebarMenu() {
    const isActivePath = useIsActivePath();
    const { data: user } = useGetUserQuery();

    return (
        <div>
            { MENU.map((item) => {
                const disabled = item.isAdmin ? !user?.isAdmin : false;
                return (
                    <SidebarMenuItem
                        key={`menu-item-${item.id}`}
                        icon={item.icon}
                        tooltip={item.tooltip}
                        path={item.path}
                        isActive={isActivePath(item.activePaths ?? item.path)}
                        disabled={disabled}
                    />
                );
            }) }
        </div>
    );
}

export default SidebarMenu;
