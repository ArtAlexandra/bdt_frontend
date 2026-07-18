import { useIsActivePath } from '@bdt/shared/hooks/useIsActivePath';

import { MENU } from '../../config/Menu';

import SidebarMenuItem from './SidebarMenuItem';

function SidebarMenu() {
    const isActivePath = useIsActivePath();

    return (
        <div>
            { MENU.map((item) => {
                return (
                    <SidebarMenuItem
                        key={`menu-item-${item.id}`}
                        icon={item.icon}
                        tooltip={item.tooltip}
                        path={item.path}
                        isActive={isActivePath(item.activePaths ?? item.path)}
                    />
                );
            }) }
        </div>
    );
}

export default SidebarMenu;
