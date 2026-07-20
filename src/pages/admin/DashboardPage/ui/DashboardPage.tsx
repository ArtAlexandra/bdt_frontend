'use client';

import { DashboardHead, DashboardSection } from '@bdt/features/Dashboard';

import Logout from './Logout';
import UserInfo from './UserInfo';

function DashboardPage() {
    return (
        <>
            <DashboardHead title="Панель управления" />

            <DashboardSection>
                <UserInfo className="mb-4" />
                <Logout />
            </DashboardSection>
        </>
    );
}

export default DashboardPage;
