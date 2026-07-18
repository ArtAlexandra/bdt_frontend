'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';

import { notifyPromise } from '@bdt/shared/lib/Notifications';
import { registrationSchema, type TRegistrationSchema } from '@bdt/shared/schemas/Auth';

import Button from '@bdt/shared/ui/Button';
import Checkbox from '@bdt/shared/ui/Checkbox';
import Input, { InputPassword } from '@bdt/shared/ui/Input';
import Label from '@bdt/shared/ui/Label';

import { useRegisterMutation } from '@bdt/entities/Auth';

import { DEFAULT_VALUES } from '../config/DefaultValues';

import style from './RegistrationForm.module.scss';

import type { TAuthResponse } from '@bdt/shared/api/Auth';

interface IRegistrationFormProps {
    buttonTitle?: string;
    isPageVariant?: boolean;
    className?: string;

    onClose: () => void;
    onSubmit: (response: TAuthResponse) => void;
};

function RegistrationForm({ buttonTitle = 'Зарегистрироваться', isPageVariant = false, className, onClose, onSubmit }: IRegistrationFormProps) {
    const [registerUser, { isLoading }] = useRegisterMutation();
    const { handleSubmit, formState: { errors }, setValue, watch, reset, register } = useForm<TRegistrationSchema>({
        resolver: zodResolver(registrationSchema),
        defaultValues: DEFAULT_VALUES
    });

    const name = watch('name');
    const email = watch('email');
    const password = watch('password');
    const confirmPassword = watch('confirmPassword');

    const handleSubmitForm = async (data: TRegistrationSchema) => {
        const response = await notifyPromise(registerUser(data).unwrap(), {
            loading: 'Создание аккаунта...',
            success: 'Аккаунт успешно создан!',
        });

        reset(DEFAULT_VALUES);
        onSubmit?.(response);
    };

    return (
        <form className={clsx(style.registrationForm, className, { [style['registrationForm--page']]: isPageVariant })} onSubmit={handleSubmit(handleSubmitForm)}>
            <Input label="Имя" placeholder="Введите имя" register={register('name')} value={name} error={errors.name} />
            <Input label="Email" type="email" placeholder="Введите email" register={register('email')} value={email} error={errors.email} />
            <InputPassword label="Пароль" placeholder="Введите пароль" onChange={(e) => setValue('password', e)} value={password} error={errors.password?.message} />
            <InputPassword label="Повторите пароль" placeholder="Введите пароль" onChange={(e) => setValue('confirmPassword', e)} value={confirmPassword} error={errors.confirmPassword?.message} />
            <Checkbox onChange={(e) => setValue('isAdmin', e)}><Label text="Сделать пользователя админом?" /></Checkbox>
            <div className="flex justify-end gap-2">
                <Button variant="secondary" onClick={onClose}>Отмена</Button>
                <Button fullWidth variant="primary" type="submit" isLoading={isLoading}>{ buttonTitle }</Button>
            </div>
        </form>
    );
}

export default RegistrationForm;
