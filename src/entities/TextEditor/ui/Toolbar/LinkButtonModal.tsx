'use client';

import { useEffect, useState } from 'react';

import Button from '@bdt/shared/ui/Button';
import Input from '@bdt/shared/ui/Input';
import Modal from '@bdt/shared/ui/Modal';

interface ILinkButtonModalProps {
    isOpen: boolean;
    title: string;
    buttonText: string;
    error?: string;
    initialUrl?: string;
    initialTargetBlank?: boolean;

    onSubmit: (url: string, targetBlank: boolean) => void;
    onClose: () => void;
}

function LinkButtonModal({ isOpen, title, buttonText, onSubmit, onClose, error, initialUrl = '', initialTargetBlank = true }: ILinkButtonModalProps) {
    const [url, setUrl] = useState<string>(initialUrl);
    const [targetBlank, setTargetBlank] = useState<boolean>(initialTargetBlank);

    useEffect(() => {
        if (isOpen) {
            setUrl(initialUrl);
            setTargetBlank(initialTargetBlank);
        }
    }, [isOpen, initialUrl, initialTargetBlank]);

    const handleSubmit = () => {
        onSubmit(url, targetBlank);
    };

    return (
        <Modal isOpen={isOpen} onCancel={onClose} onClose={onClose} title={title}>
            <div className="mb-4">
                <Input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Введите URL"
                    error={error}
                />
            </div>
            <div className="mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={targetBlank}
                        onChange={(e) => setTargetBlank(e.target.checked)}
                        className="w-4 h-4"
                    />
                    <span>Открывать в новой вкладке</span>
                </label>
            </div>
            <div className="flex justify-end gap-2">
                <Button size="medium" variant="light" onClick={onClose} type="button">Отмена</Button>
                <Button size="medium" variant="primary" onClick={handleSubmit} type="button" disabled={!url}>{ buttonText }</Button>
            </div>
        </Modal>
    );
}

export default LinkButtonModal;
