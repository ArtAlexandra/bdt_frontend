'use client';

import Icon from '@bdt/shared/ui/Icon';

import { useGetUserQuery } from '@bdt/entities/User';

interface IUserInfoProps {
    className?: string;
};

function UserInfo({ className }: IUserInfoProps) {
    const { data: user } = useGetUserQuery();

    if (!user) return;

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
