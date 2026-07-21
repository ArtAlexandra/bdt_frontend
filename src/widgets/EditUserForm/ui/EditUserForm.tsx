'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import isEqual from 'lodash/isEqual';

import { notifyPromise } from '@bdt/shared/lib/Notifications';
import { editUserSchema, type TEditUserSchema } from '@bdt/shared/schemas/User';

import { ADMIN_VERIFICATION_KEY } from '@bdt/shared/config/AppEnvironment';

import Button from '@bdt/shared/ui/Button';
import Checkbox from '@bdt/shared/ui/Checkbox';
import Input, { InputPassword } from '@bdt/shared/ui/Input';

import { useEditUserMutation, useGetUserQuery } from '@bdt/entities/User';

import style from './EditUserForm.module.scss';

import type { TUser } from '@bdt/shared/api/User';

interface IEditUserFormProps {
    user: TUser;
    className?: string;

    onCancel: () => void;
};

function EditUserForm({ user, className, onCancel }: IEditUserFormProps) {
    const formDefaultValues: TEditUserSchema = useMemo(() => ({
        ...user,
        password: undefined,
        confirmPassword: undefined,
    }), [user]);

    const [edit, { isLoading }] = useEditUserMutation();
    const { refetch } = useGetUserQuery();
    const { handleSubmit, formState: { errors }, setValue, watch, register, reset } = useForm<TEditUserSchema>({
        resolver: zodResolver(editUserSchema),
        defaultValues: formDefaultValues
    });
    const password = watch('password');
    const isAdmin = watch('isAdmin');
    const formValues = watch();

    const [isAdminToggled, setIsAdminToggled] = useState<boolean>(user.isAdmin);
    const [adminKey, setAdminKey] = useState<string | undefined>();
    const [adminKeyError, setAdminKeyError] = useState<string | undefined>();

    const handleVerifyKey = () => {
        if (adminKey === ADMIN_VERIFICATION_KEY) {
            setValue('isAdmin', true);
            setAdminKeyError(undefined);
        } else { setAdminKeyError('Неверный секретный код'); }
    };

    const handleChangeIsAdmin = (value: boolean) => {
        setIsAdminToggled(value);
        if (!value) {
            setValue('isAdmin', false);
            setAdminKeyError(undefined);
            setAdminKey(undefined);
        }
        if (value && user.isAdmin) setValue('isAdmin', true);
    };

    const formChanged = useMemo(() => {
        return !isEqual(formValues, formDefaultValues);
    }, [formValues, formDefaultValues]);

    const handleChangePassword = (value: string) => {
        setValue('password', value.length ? value : undefined);
    };

    const handleChangeConfirmPassword = (value: string) => {
        setValue('confirmPassword', value.length ? value : undefined);
    };

    const handleSubmitForm = async (data: TEditUserSchema) => {
        if (!formChanged) return;

        const response = await notifyPromise(edit({ id: user.id, data }).unwrap(), {
            loading: 'Изменение данных...',
            success: 'Данные успешно обновлены!',
        });

        await refetch();

        reset({ ...response, password: undefined, confirmPassword: undefined });
        setIsAdminToggled(response.isAdmin);
        setAdminKey(undefined);
        setAdminKeyError(undefined);

        onCancel();
    };

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)} className={clsx(style.editUserForm, className)}>
            <Input label="Новый email" placeholder="Введите новый email" register={register('email')} error={errors.email} />
            <Input label="Новое имя" placeholder="Введите новое имя" register={register('name')} error={errors.name} />
            <InputPassword label="Новый пароль" placeholder="Введите новый пароль" value={password} onChange={handleChangePassword} error={errors.password?.message} />
            { password && password.length > 0 && <InputPassword label="Повторите новый пароль" placeholder="Повторите пароль" onChange={handleChangeConfirmPassword} error={errors.confirmPassword?.message} /> }

            <Checkbox checked={isAdminToggled} onChange={handleChangeIsAdmin}>Админ</Checkbox>

            { isAdminToggled && !user.isAdmin &&
                <div>
                    <Input label="Секретный код" placeholder="Введите секретный код" onChange={(e) => setAdminKey(e.target.value)} error={adminKeyError} />
                    <Button variant="primary" size="small" onClick={handleVerifyKey} className="mt-2 ml-auto">Подтвердить</Button>
                </div> }

            { isAdmin && !user.isAdmin && <div>После сохранения у Вас будет роль <strong>Администратор</strong></div> }

            <div className="flex justify-end gap-2">
                <Button variant="secondary" onClick={onCancel}>Отмена</Button>
                <Button variant="primary" type="submit" isLoading={isLoading}>Сохранить</Button>
            </div>
        </form>
    );
}

export default EditUserForm;
