'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { AuthStorage } from '@bdt/shared/lib/AuthStorage';

import { ROUTES } from '@bdt/shared/config/Routes';

import Button from '@bdt/shared/ui/Button';
import Modal from '@bdt/shared/ui/Modal';

import { useLogoutUserMutation } from '@bdt/entities/Auth';

interface ILogoutProps {
    className?: string;
};

function Logout({ className }: ILogoutProps) {
    const [isOpenLogoutModal, setIsOpenLogoutModal] = useState<boolean>(false);
    const [logout] = useLogoutUserMutation();
    const router = useRouter();

    const handleCloseLogoutModal = () => setIsOpenLogoutModal(false);

    const handleLogout = async () => {
        await logout();
        AuthStorage.clear();
        router.push(ROUTES.public.home.path);
    };

    return (
        <div className={className}>
            <Modal title="Выход из аккаунта" isOpen={isOpenLogoutModal} onCancel={handleCloseLogoutModal} onClose={handleCloseLogoutModal}>
                <p className="mb-4">Вы уверены, что хотите выйти из аккаунта?</p>
                <div className="flex justify-end gap-3">
                    <Button variant="secondary" onClick={handleCloseLogoutModal}>Отмена</Button>
                    <Button variant="danger" onClick={handleLogout}>Выйти</Button>
                </div>
            </Modal>
            <Button variant="danger" size="medium" onClick={() => setIsOpenLogoutModal(true)}>Выйти из аккаунта</Button>
        </div>
    );
}

export default Logout;
