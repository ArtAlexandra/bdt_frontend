'use client';

import { useRouter } from 'next/navigation';

import { AuthStorage } from '@bdt/shared/lib/AuthStorage';

import { ROUTES } from '@bdt/shared/config/Routes';

import Alert from '@bdt/shared/ui/Alert';

import { RegistrationFormAdmin } from '@bdt/widgets/RegistrationForm';

import style from './RegistrationPage.module.scss';

import type { TAuthResponse } from '@bdt/shared/api/Auth';

function RegistrationPage() {
    const router = useRouter();

    const handleSubmitForm = (response: TAuthResponse) => {
        AuthStorage.setToken(response.accessToken);
        AuthStorage.setRefreshToken(response.refreshToken);

        router.push(ROUTES.admin.dashboard.index.path);
    };

    return (
        <div className={style.registrationPage}>
            <div className={style.registrationPage__content}>
                <h1 className={style.registrationPage__title}>Регистрация</h1>
                <Alert type="warning" message="Внимание! Только админ может самостоятельно зарегистрироваться!" />
                <RegistrationFormAdmin onSubmit={handleSubmitForm} />
            </div>
        </div>
    );
}

export default RegistrationPage;
