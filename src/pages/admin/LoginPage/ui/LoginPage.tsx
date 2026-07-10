'use client';

import { useRouter } from 'next/navigation';

import { ROUTES } from '@bdt/shared/config/Routes';

import LoginForm from '@bdt/widgets/LoginForm';

import style from './LoginPage.module.scss';

function LoginPage() {
    const router = useRouter();

    const handleSubmitForm = () => {
        router.push(ROUTES.admin.dashboard.index.path);
    };

    return (
        <div className={style.loginPage}>
            <div className={style.loginPage__content}>
                <h1 className={style.loginPage__title}>Авторизация</h1>
                <LoginForm onSubmit={handleSubmitForm} isPageVariant />
            </div>
        </div>
    );
}

export default LoginPage;
