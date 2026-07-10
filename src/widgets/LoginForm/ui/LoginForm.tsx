'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';

import { AuthStorage } from '@bdt/shared/lib/AuthStorage';
import { notifyPromise } from '@bdt/shared/lib/Notifications';
import { loginSchema, type TLoginSchema } from '@bdt/shared/schemas/Auth';

import Button from '@bdt/shared/ui/Button';
import Input from '@bdt/shared/ui/Input';

import { useLoginMutation } from '@bdt/entities/Auth';

import style from './LoginForm.module.scss';

const DEFAULT_VALUES: TLoginSchema = {
    email: '',
    password: '',
};

interface ILoginFormProps {
    buttonTitle?: string;
    isPageVariant?: boolean;
    className?: string;

    onSubmit?: () => void;
};

function LoginForm({ buttonTitle = 'Войти', isPageVariant, className, onSubmit }: ILoginFormProps) {
    const [login, { isLoading }] = useLoginMutation();
    const { handleSubmit, formState: { errors }, setValue, reset, watch } = useForm<TLoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: DEFAULT_VALUES
    });

    const email = watch('email');
    const password = watch('password');

    const handleSubmitForm = async (data: TLoginSchema) => {
        const response = await notifyPromise(login(data).unwrap(), {
            loading: 'Вход в систему...',
            success: 'Добро пожаловать! Вы успешно вошли в систему',
        });

        AuthStorage.setToken(response.accessToken);
        AuthStorage.setRefreshToken(response.refreshToken);

        reset(DEFAULT_VALUES);
        onSubmit?.();
    };

    return (
        <form className={clsx(style.loginForm, className, { [style['loginForm--page']]: isPageVariant })} onSubmit={handleSubmit(handleSubmitForm)}>
            <Input label="Email" type="email" placeholder="Введите email" onChange={(e) => setValue('email', e)} value={email} error={errors.email?.message} />
            <Input label="Пароль" type="password" placeholder="Введите пароль" onChange={(e) => setValue('password', e)} value={password} error={errors.password?.message} />
            <Button fullWidth variant="primary" type="submit" isLoading={isLoading}>{ buttonTitle }</Button>
        </form>
    );
}

export default LoginForm;
