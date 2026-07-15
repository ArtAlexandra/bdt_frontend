import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Upload as UploadAnt } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import clsx from 'clsx';

import Button from '@bdt/shared/ui/Button';
import Error from '@bdt/shared/ui/Error';
import Icon from '@bdt/shared/ui/Icon';
import Label from '@bdt/shared/ui/Label';

import type { TError } from '@bdt/shared/helpers/ErrorHelpers';

const DEFAULT_ACCEPT = '.jpeg,.jpg,.png';

interface IUploadProps {
    text?: string;
    accept?: string;
    label?: string;
    required?: boolean;
    className?: string;
    defaultValue?: null | string;
    error?: TError | unknown;
    value?: File | File[] | null;
    showPreview?: boolean;

    onChange: (file: File | null, fileList?: File[]) => void;
};

function Upload({ text, onChange, accept = DEFAULT_ACCEPT, label, required, className, defaultValue = null, error, value, showPreview = true }: IUploadProps) {
    const textInButton = text || 'Выбрать';
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(defaultValue);

    useEffect(() => {
        if (value === null) {
            setFile(null);
            setPreviewUrl(defaultValue);
        } else if (value instanceof File) {
            setFile(value);
        }
    }, [defaultValue, value]);

    useEffect(() => {
        if (!file) return;

        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [file]);

    const handleChange = (info: UploadChangeParam<UploadFile<File>>) => {
        if (info.file.status === 'removed') {
            setFile(null);
            onChange(null, []);
            return;
        }

        const currentFile = info.file.originFileObj;

        if (!currentFile) return;
        if (file && currentFile.name === file.name && currentFile.size === file.size) return;

        setFile(currentFile);
        onChange(currentFile, info.fileList.map(f => f.originFileObj as File));
    };

    const handleRemove = () => {
        setFile(null);
        setPreviewUrl(null);
        onChange(null, []);
    };

    return (
        <div className={clsx('relative', className)}>
            { label && <Label text={label} required={required} /> }
            { !!error && <Error error={error} /> }

            <UploadAnt onChange={handleChange} onRemove={handleRemove} accept={accept} maxCount={1} customRequest={({ onSuccess }) => onSuccess?.('ok')} showUploadList={!!file && showPreview}>
                <Button variant="primary" size="medium" type="button" className="mb-2"><Icon name="upload" />{ textInButton }</Button>
            </UploadAnt>

            { previewUrl && showPreview && <Image src={previewUrl} width={300} height={300} alt="upload file" /> }
        </div>
    );
};

export default Upload;
