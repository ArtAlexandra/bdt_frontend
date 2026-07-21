'use client';

import Icon from '@bdt/shared/ui/Icon';

import style from './UserInfo.module.scss';

import type { TUser } from '@bdt/shared/api/User';

interface IUserInfoProps {
    user: TUser;
};

function UserInfo({ user }: IUserInfoProps) {
    return (
        <div className={style.userInfo}>
            <h2 className={style.userInfo__title}>Информация о владельце аккаунта</h2>
            <div className="flex gap-2"><Icon name="user" />{ user.name }</div>
            <div className="flex gap-2"><Icon name="mailOutline" />{ user.email }</div>
            { user.isAdmin && <div className="flex gap-2"><Icon name="checkCircle" />Администратор</div> }
        </div>
    );
}

export default UserInfo;
