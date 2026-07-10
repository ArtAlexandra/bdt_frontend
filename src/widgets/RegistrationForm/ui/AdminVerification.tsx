'use client';

import { useEffect, useState } from 'react';

import { ADMIN_VERIFICATION_KEY } from '@bdt/shared/config/AppEnvironment';

import Button from '@bdt/shared/ui/Button';
import Checkbox from '@bdt/shared/ui/Checkbox';
import Input from '@bdt/shared/ui/Input';
import Label from '@bdt/shared/ui/Label';

interface IAdminVerificationProps {
    isAdminVerified: boolean;

    onChangeAdmin: (isAdmin: boolean) => void;
};

function AdminVerification({ isAdminVerified, onChangeAdmin }: IAdminVerificationProps) {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [adminKey, setAdminKey] = useState<string | undefined>();
    const [adminKeyError, setAdminKeyError] = useState<string | undefined>();

    useEffect(() => {
        if (isAdminVerified) return;

        setIsAdmin(false);
        setAdminKey(undefined);
        setAdminKeyError(undefined);
    }, [isAdminVerified]);

    const handleAdminCheckboxChange = (checked: boolean) => {
        setIsAdmin(checked);
        if (!checked) onChangeAdmin(false);
    };

    const handleVerifyKey = () => {
        if (adminKey === ADMIN_VERIFICATION_KEY) {
            onChangeAdmin(true);
            setAdminKeyError(undefined);
        } else { setAdminKeyError('Неверный секретный код'); }
    };

    return (
        <>
            <Checkbox onChange={handleAdminCheckboxChange} checked={isAdmin}><Label text="Вы админ?" /></Checkbox>

            { isAdmin &&
                <div>
                    <Input label="Секретный код" placeholder="Введите секретный код" onChange={setAdminKey} error={adminKeyError} />
                    <Button variant="primary" size="small" onClick={handleVerifyKey} className="mt-2 ml-auto">Подтвердить</Button>
                </div>
            }

            { isAdminVerified && (<div>Вы будете зарегистрированы как <strong>администратор</strong></div>) }
        </>
    );
}

export default AdminVerification;
