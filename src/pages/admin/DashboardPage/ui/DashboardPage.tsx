'use client';

import { useGetUserQuery } from '@bdt/entities/User';

import { DashboardHead, DashboardSection } from '@bdt/features/Dashboard';

import DraftPostList from './DraftPostList';
import EditUser from './EditUser';
import Logout from './Logout';
import UserInfo from './UserInfo';

import style from './DashboardPage.module.scss';

function DashboardPage() {
    const { data: user } = useGetUserQuery();

    return (
        <div className={style.dashboardPage}>
            <DashboardHead title="Панель управления" />

            <DashboardSection>
                { user &&
                    <div className={style.dashboardPage__userBlock}>
                        <UserInfo user={user} />
                        <div className={style.dashboardPage__buttons}>
                            <EditUser className="w-fit" user={user} />
                            <Logout className="w-fit" />
                        </div>
                    </div>
                }
                <DraftPostList />
            </DashboardSection>
        </div>
    );
}

export default DashboardPage;
