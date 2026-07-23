'use client';

import { useState } from 'react';

import Alert from '@bdt/shared/ui/Alert';
import Button from '@bdt/shared/ui/Button';
import Table from '@bdt/shared/ui/Table';

import { useGetUsersQuery } from '@bdt/entities/User';

import { getUserColumns } from '../config/TableSettings';

import ModalDeleteUser from './ModalDeleteUser';

import type { TUser } from '@bdt/shared/api/User';

interface IUsersListProps {
    onSelectForEditing: (user: TUser) => void;
    onAddUser: () => void;
};

function UsersList({ onSelectForEditing, onAddUser }: IUsersListProps) {
    const { data: users, isLoading, error } = useGetUsersQuery();

    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
    const [selectUserForDelete, setSelectUserForDelete] = useState<TUser | undefined>();

    const handleSelectForDelete = (user: TUser) => {
        setSelectUserForDelete(user);
        setIsOpenModalDelete(true);
    };

    const handleCloseModalForDelete = () => {
        setSelectUserForDelete(undefined);
        setIsOpenModalDelete(false);
    };

    const columns = getUserColumns(onSelectForEditing, handleSelectForDelete);

    return (
        <>
            { error && <Alert className="mb-4" error={error} type="error" /> }

            <Button className="md:ml-auto mb-4" variant="primary" onClick={onAddUser}>Создать</Button>

            <Table data={users} columns={columns} loading={isLoading} />

            { selectUserForDelete && <ModalDeleteUser isOpen={isOpenModalDelete} user={selectUserForDelete} onClose={handleCloseModalForDelete} /> }
        </>
    );
}

export default UsersList;
