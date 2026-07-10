'use client';

import { useRouter } from 'next/navigation';

import { ROUTES } from '@bdt/shared/config/Routes';

import RegistrationForm from '@bdt/widgets/RegistrationForm';

import style from './RegistrationPage.module.scss';

function RegistrationPage() {
    const router = useRouter();

    const handleSubmitForm = () => {
        router.push(ROUTES.admin.dashboard.index.path);
    };

    return (
        <div className={style.registrationPage}>
            <div className={style.registrationPage__content}>
                <h1 className={style.registrationPage__title}>Регистрация</h1>
                <RegistrationForm onSubmit={handleSubmitForm} isPageVariant />
            </div>
        </div>
    );
}

export default RegistrationPage;
