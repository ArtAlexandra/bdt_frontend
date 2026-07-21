'use client';

import { useGetUserQuery } from '@bdt/entities/User';

import { DashboardHead, DashboardSection } from '@bdt/features/Dashboard';

import EditUser from './EditUser';
import Logout from './Logout';
import UserInfo from './UserInfo';

function DashboardPage() {
    const { data: user } = useGetUserQuery();

    return (
        <>
            <DashboardHead title="Панель управления" />

            <DashboardSection>
                { user &&
                    <>
                        <UserInfo className="mb-4" user={user} />
                        <div className="flex gap-3">
                            <EditUser className="w-fit" user={user} />
                            <Logout className="w-fit" />
                        </div>
                    </>
                }

            </DashboardSection>
        </>
    );
}

export default DashboardPage;
