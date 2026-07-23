import Button from '@bdt/shared/ui/Button';
import Icon from '@bdt/shared/ui/Icon';

import type { TUser } from '@bdt/shared/api/User';
import type { TTableColumnType } from '@bdt/shared/ui/Table';

export const getUserColumns = (onSelectForEditing: (user: TUser) => void, onSelectForDelete: (user: TUser) => void): TTableColumnType<TUser>[] => {
    return [
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
            render: (value: string, record: TUser) => <Button variant="link" onClick={() => onSelectForEditing(record)}>{ value }</Button>
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Роль',
            dataIndex: 'isAdmin',
            key: 'isAdmin',
            render: (value: boolean) => value ? 'Админ' : ''
        },
        {
            dataIndex: 'id',
            key: 'id',
            render: (_, record: TUser) => <Button variant="danger" size="small" onClick={() => onSelectForDelete(record)}><Icon name="delete" />Удалить</Button>
        }
    ];
};
