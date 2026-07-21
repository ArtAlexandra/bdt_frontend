'use client';

import { useState } from 'react';

import Button from '@bdt/shared/ui/Button';
import Modal from '@bdt/shared/ui/Modal';

import EditUserForm from '@bdt/widgets/EditUserForm';

import type { TUser } from '@bdt/shared/api/User';

interface IEditUserProps {
    user: TUser;
    className?: string;
};

function EditUser({ user, className }: IEditUserProps) {
    const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);

    const handleCloseEditModal = () => setIsOpenEditModal(false);

    return (
        <>
            <Modal title="Изменение личных данных" isOpen={isOpenEditModal} onCancel={handleCloseEditModal} onClose={handleCloseEditModal}>
                <EditUserForm user={user} onCancel={handleCloseEditModal} />
            </Modal>
            <Button variant="secondary" size="medium" className={className} onClick={() => setIsOpenEditModal(true)}>Изменить личные данные</Button>
        </>
    );
}

export default EditUser;
