'use client';

import Icon from '@bdt/shared/ui/Icon';

import type { TUser } from '@bdt/shared/api/User';

interface IUserInfoProps {
    user: TUser;
    className?: string;
};

function UserInfo({ user, className }: IUserInfoProps) {
    return (
        <div className={className}>
            <h2 className="font-bold mb-3">Информация о владельце аккаунта</h2>
            <div className="flex gap-2"><Icon name="user" />{ user.name }</div>
            <div className="flex gap-2"><Icon name="mailOutline" />{ user.email }</div>
            { user.isAdmin && <div className="flex gap-2"><Icon name="checkCircle" />Администратор</div> }
        </div>
    );
}

export default UserInfo;
