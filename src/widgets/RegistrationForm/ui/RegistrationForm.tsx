'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';

import { AuthStorage } from '@bdt/shared/lib/AuthStorage';
import { notifyPromise } from '@bdt/shared/lib/Notifications';
import { registrationSchema, type TRegistrationSchema } from '@bdt/shared/schemas/Auth';

import Button from '@bdt/shared/ui/Button';
import Input from '@bdt/shared/ui/Input';

import { useRegisterMutation } from '@bdt/entities/Auth';

import AdminVerification from './AdminVerification';

import style from './RegistrationForm.module.scss';

const DEFAULT_VALUES: TRegistrationSchema = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAdmin: false
};

interface IRegistrationFormProps {
    buttonTitle?: string;
    isPageVariant?: boolean;
    className?: string;

    onSubmit?: () => void;
};

function RegistrationForm({ buttonTitle = 'Зарегистрироваться', isPageVariant = false, className, onSubmit }: IRegistrationFormProps) {
    const [registerUser, { isLoading }] = useRegisterMutation();
    const { handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<TRegistrationSchema>({
        resolver: zodResolver(registrationSchema),
        defaultValues: DEFAULT_VALUES
    });

    const name = watch('name');
    const email = watch('email');
    const password = watch('password');
    const confirmPassword = watch('confirmPassword');
    const isAdminVerified = watch('isAdmin');

    const handleSubmitForm = async (data: TRegistrationSchema) => {
        const response = await notifyPromise(registerUser(data).unwrap(), {
            loading: 'Создание аккаунта...',
            success: 'Аккаунт успешно создан!',
        });

        AuthStorage.setToken(response.accessToken);
        AuthStorage.setRefreshToken(response.refreshToken);

        reset(DEFAULT_VALUES);
        onSubmit?.();
    };

    return (
        <form className={clsx(style.registrationForm, className, { [style['registrationForm--page']]: isPageVariant })} onSubmit={handleSubmit(handleSubmitForm)}>
            <Input label="Имя" placeholder="Введите имя" onChange={(e) => setValue('name', e)} value={name} error={errors.name?.message} />
            <Input label="Email" type="email" placeholder="Введите email" onChange={(e) => setValue('email', e)} value={email} error={errors.email?.message} />
            <Input label="Пароль" type="password" placeholder="Введите пароль" onChange={(e) => setValue('password', e)} value={password} error={errors.password?.message} />
            <Input label="Повторите пароль" type="password" placeholder="Введите пароль" onChange={(e) => setValue('confirmPassword', e)} value={confirmPassword} error={errors.confirmPassword?.message} />
            <AdminVerification isAdminVerified={isAdminVerified} onChangeAdmin={(e) => setValue('isAdmin', e)} />
            <Button fullWidth variant="primary" type="submit" isLoading={isLoading}>{ buttonTitle }</Button>
        </form>
    );
}

export default RegistrationForm;
