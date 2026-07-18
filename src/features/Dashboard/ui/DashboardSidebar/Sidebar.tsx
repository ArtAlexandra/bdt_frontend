'use client';

import SidebarMenu from '../Menu/SidebarMenu';

import style from './Sidebar.module.scss';

function Sidebar() {
    return (
        <div className={style.sidebar}>
            <SidebarMenu />
        </div>
    );
}

export default Sidebar;
