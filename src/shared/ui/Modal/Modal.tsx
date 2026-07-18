'use client';

import { Modal as AntModal } from 'antd';
import clsx from 'clsx';

import style from './Modal.module.scss';

type TSize = 'small' | 'big' | 'fullscreen';

const MODAL_SIZES = {
    small: 'small',
    big: 'big',
    fullscreen: 'fullscreen'
};

interface IModalProps {
    children?: React.ReactNode;
    isOpen: boolean;
    title?: string;
    className?: string;
    size?: TSize;

    onClose?: () => void;
    onCancel?: () => void;
    onOk?: () => void;
};

function Modal({ children, isOpen, title, className, size, onOk, onCancel, onClose }: IModalProps) {
    const cssClassName = clsx(style.modal, className, {
        [style.modal_small]: size === MODAL_SIZES.small,
        [style.modal_big]: size === MODAL_SIZES.big,
        [style.modal_fullscreen]: size === MODAL_SIZES.fullscreen,
    });

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        } else if (onClose) {
            onClose();
        }
    };

    return (
        <AntModal wrapClassName={cssClassName} className={cssClassName} title={title} open={isOpen} onCancel={handleCancel} onOk={onOk} footer={!!onOk}>
            { children }
        </AntModal>
    );
}

export default Modal;
