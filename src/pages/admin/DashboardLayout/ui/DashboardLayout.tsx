'use client';

import { DashboardHeader, DashboardSidebar } from '@bdt/features/Dashboard';

import style from './DashboardLayout.module.scss';

interface IDashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: IDashboardLayoutProps) {
    return (
        <div className={style.container}>
            <div className={style.contentWrapper}>
                <DashboardHeader />
                <DashboardSidebar />
                <div className={style.content}>
                    { children }
                </div>
            </div>
        </div>
    );
}
