'use client';

import { useState } from 'react';

import Modal from '@bdt/shared/ui/Modal';

import { DashboardHead, DashboardSection } from '@bdt/features/Dashboard';

import EditUserForm from '@bdt/widgets/EditUserForm';
import RegistrationForm from '@bdt/widgets/RegistrationForm';
import UsersList from '@bdt/widgets/UsersList';

import type { TUser } from '@bdt/shared/api/User';

function DashboardUsersPage() {
    const [selectedUser, setSelecteUser] = useState<TUser | undefined>();
    const [isOpenModalEditUser, setIsOpenModalEditUser] = useState(false);
    const [isOpenModalAddUser, setIsOpenModalAddUser] = useState(false);

    const handleOpenModalEditUser = (user: TUser) => {
        setSelecteUser(user);
        setIsOpenModalEditUser(true);
    };

    const handleCloseModalEditUser = () => {
        setSelecteUser(undefined);
        setIsOpenModalEditUser(false);
    };

    const handleCloseModalAddUser = () => setIsOpenModalAddUser(false);

    return (
        <>
            <DashboardHead title="Пользователи" />

            <DashboardSection>
                <UsersList onSelectForEditing={handleOpenModalEditUser} onAddUser={() => setIsOpenModalAddUser(true)} />
            </DashboardSection>

            { selectedUser &&
                <Modal title="Изменение данных о пользователе" isOpen={isOpenModalEditUser} onCancel={handleCloseModalEditUser} onClose={handleCloseModalEditUser}>
                    <EditUserForm user={selectedUser} onCancel={handleCloseModalEditUser} />
                </Modal> }

            <Modal title="Добавление нового пользователя" isOpen={isOpenModalAddUser} onCancel={handleCloseModalAddUser} onClose={handleCloseModalAddUser}>
                <RegistrationForm onClose={handleCloseModalAddUser} />
            </Modal>
        </>
    );
}

export default DashboardUsersPage;
