'use client';

import { notifyPromise } from '@bdt/shared/lib/Notifications';

import Button from '@bdt/shared/ui/Button';
import Modal from '@bdt/shared/ui/Modal';

import { useDeleteUserMutation } from '@bdt/entities/User';

import type { TUser } from '@bdt/shared/api/User';

interface IModalDeleteUserProps {
    isOpen: boolean;
    user: TUser;

    onClose: () => void;
};

function ModalDeleteUser({ isOpen, user, onClose }: IModalDeleteUserProps) {
    const [deleteUser] = useDeleteUserMutation();

    const handleDelete = async () => {
        await notifyPromise(deleteUser({ id: user.id }).unwrap(), {
            loading: 'Удаление аккаунта...',
            success: 'Аккаунт успешно удален!',
        });

        onClose();
    };

    return (
        <Modal isOpen={isOpen} title="Удаление пользователя" onCancel={onClose} onClose={onClose}>
            <p className="mb-2">Вы уверены, что хотите удалить пользователя <strong>{ user.name }</strong>?</p>

            <div className="flex justify-end gap-2">
                <Button variant="secondary" onClick={onClose} type="button">Отмена</Button>
                <Button variant="danger" onClick={handleDelete} type="button">Удалить</Button>
            </div>
        </Modal>
    );
}

export default ModalDeleteUser;
