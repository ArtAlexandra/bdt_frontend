'use client';

import Image from 'next/image';

import { NOT_FOUND_IMAGE } from '@bdt/shared/config/AppEnvironment';
import { ROUTES } from '@bdt/shared/config/Routes';

import Button from '@bdt/shared/ui/Button';

import style from './NotFoundPage.module.scss';

function NotFoundPage() {
    return (
        <div className={style.notFoundPage}>
            <div className={style.notFoundPage__container}>
                <div className={style.notFoundPage__content}>
                    <h1 className={style.notFoundPage__code}>404</h1>
                    <p className={style.notFoundPage__message}>
                        Страница, которую вы ищете, уплыла в неизвестном направлении
                    </p>
                    <div className={style.notFoundPage__imageWrapper}>
                        <Image
                            src={NOT_FOUND_IMAGE}
                            alt="404 not found"
                            priority
                            width={500}
                            height={500}
                        />
                    </div>
                </div>
                <Button variant="secondaryOutline" href={ROUTES.public.home.path}>Вернуться на главную</Button>
            </div>
        </div>
    );
}

export default NotFoundPage;
