'use client';

import { useRouter } from 'next/navigation';
import clsx from 'clsx';

import { ROUTES } from '@bdt/shared/config/Routes';

import Button from '@bdt/shared/ui/Button';
import Icon from '@bdt/shared/ui/Icon';

import style from './ErrorPage.module.scss';

interface IErrorPageProps {
    title?: string;
    message?: string;
    code?: number;
    className?: string;
    showBackButton?: boolean;
    showHomeButton?: boolean;

    onBack?: () => void;
    onHome?: () => void;
}

const DEFAULT_TITLE = 'Что-то пошло не так';
const DEFAULT_MESSAGE = 'Произошла ошибка при обработке вашего запроса. Пожалуйста, попробуйте еще раз или вернитесь на главную страницу.';
const DEFAULT_CODE = 500;

function ErrorPage({ title = DEFAULT_TITLE, message = DEFAULT_MESSAGE, code = DEFAULT_CODE, className, showBackButton = true, showHomeButton = true, onBack, onHome }: IErrorPageProps) {
    const router = useRouter();

    const handleBack = () => {
        if (onBack) return onBack();

        router.back();
    };

    const handleHome = () => {
        if (onHome) return onHome();

        router.push(ROUTES.public.home.path);
    };

    return (
        <div className={clsx(style.errorPage, className)}>
            <div className={style.errorPage__content}>
                <div className={style.errorPage__icon}>
                    <Icon name="error" />
                </div>
                <h1 className={style.errorPage__title}>{ title }</h1>
                <p className={style.errorPage__message}>{ message }</p>
                <div className={style.errorPage__code}>Код ошибки: { code }</div>
                <div className={style.errorPage__actions}>
                    { showBackButton && <Button variant="secondary" onClick={handleBack} className={style.errorPage__button}><Icon name="arrowLeft" />Назад</Button> }
                    { showHomeButton && <Button variant="primary" onClick={handleHome} className={style.errorPage__button}><Icon name="home" />На главную</Button> }
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
