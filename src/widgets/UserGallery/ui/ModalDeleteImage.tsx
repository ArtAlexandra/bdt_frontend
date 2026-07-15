'use client';

import Button from '@bdt/shared/ui/Button';
import Modal from '@bdt/shared/ui/Modal';

interface IModalDeleteImageProps {
    isOpen: boolean;

    onConfirm: () => void;
    onClose: () => void;
};

function ModalDeleteImage({ isOpen, onConfirm, onClose }: IModalDeleteImageProps) {
    return (
        <Modal isOpen={isOpen} onCancel={onClose} onClose={onClose} title="Вы уверены, что хотите удалить это изображение?">
            <p className="mb-2">Изображение будет удалено из галереи и перестанет отображаться везде, где использовалось.</p>

            <div className="flex justify-end gap-2">
                <Button variant="secondary" onClick={onClose} type="button">Отмена</Button>
                <Button variant="danger" onClick={onConfirm} type="button">Удалить</Button>
            </div>
        </Modal>
    );
}

export default ModalDeleteImage;
