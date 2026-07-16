'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';

import { notifyError, notifyPromise } from '@bdt/shared/lib/Notifications';
import { registrationSchema, type TRegistrationSchema } from '@bdt/shared/schemas/Auth';

import { ADMIN_VERIFICATION_KEY } from '@bdt/shared/config/AppEnvironment';

import Button from '@bdt/shared/ui/Button';
import Input from '@bdt/shared/ui/Input';

import { useRegisterMutation } from '@bdt/entities/Auth';

import { DEFAULT_VALUES } from '../config/DefaultValues';

import style from './RegistrationForm.module.scss';

import type { TAuthResponse } from '@bdt/shared/api/Auth';

interface IRegistrationFormAdminProps {
    buttonTitle?: string;
    className?: string;

    onSubmit?: (response: TAuthResponse) => void;
};

function RegistrationFormAdmin({ buttonTitle = 'Зарегистрироваться', className, onSubmit }: IRegistrationFormAdminProps) {
    const [registerUser, { isLoading }] = useRegisterMutation();
    const { handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<TRegistrationSchema>({
        resolver: zodResolver(registrationSchema),
        defaultValues: DEFAULT_VALUES
    });

    const name = watch('name');
    const email = watch('email');
    const password = watch('password');
    const confirmPassword = watch('confirmPassword');
    const isAdmin = watch('isAdmin');

    const [adminKey, setAdminKey] = useState<string | undefined>();
    const [adminKeyError, setAdminKeyError] = useState<string | undefined>();

    const handleVerifyKey = () => {
        if (adminKey === ADMIN_VERIFICATION_KEY) {
            setValue('isAdmin', true);
            setAdminKeyError(undefined);
        } else { setAdminKeyError('Неверный секретный код'); }
    };

    const handleSubmitForm = async (data: TRegistrationSchema) => {
        if (!isAdmin) {
            notifyError('Подтвердите, что вы админ!');
            return;
        }

        const response = await notifyPromise(registerUser(data).unwrap(), {
            loading: 'Создание аккаунта...',
            success: 'Аккаунт успешно создан!',
        });

        reset(DEFAULT_VALUES);
        onSubmit?.(response);
    };

    return (
        <form className={clsx(style.registrationForm, style['registrationForm--page'], className)} onSubmit={handleSubmit(handleSubmitForm)}>
            <Input label="Имя" placeholder="Введите имя" onChange={(e) => setValue('name', e)} value={name} error={errors.name?.message} />
            <Input label="Email" type="email" placeholder="Введите email" onChange={(e) => setValue('email', e)} value={email} error={errors.email?.message} />
            <Input label="Пароль" type="password" placeholder="Введите пароль" onChange={(e) => setValue('password', e)} value={password} error={errors.password?.message} />
            <Input label="Повторите пароль" type="password" placeholder="Введите пароль" onChange={(e) => setValue('confirmPassword', e)} value={confirmPassword} error={errors.confirmPassword?.message} />
            <div>
                <Input label="Секретный код" placeholder="Введите секретный код" onChange={setAdminKey} error={adminKeyError} />
                <Button variant="primary" size="small" onClick={handleVerifyKey} className="mt-2 ml-auto">Подтвердить</Button>
            </div>
            <Button fullWidth variant="primary" type="submit" isLoading={isLoading}>{ buttonTitle }</Button>
        </form>
    );
}

export default RegistrationFormAdmin;
