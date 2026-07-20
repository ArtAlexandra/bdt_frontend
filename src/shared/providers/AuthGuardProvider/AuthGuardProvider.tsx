'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { AuthStorage, isProtectedAdminRoute } from '@bdt/shared/lib/AuthStorage';
import { storage } from '@bdt/shared/lib/SessionStorage';

import { ROUTES } from '@bdt/shared/config/Routes';

interface IAuthGuardProviderProps {
    children: React.ReactNode;
}

function AuthGuardProvider({ children }: IAuthGuardProviderProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const isProtected = isProtectedAdminRoute(pathname);

            // Если маршрут не защищен
            if (!isProtected) {
                setIsAuthorized(true);
                setIsLoading(false);
                return;
            }

            const token = AuthStorage.getToken();

            if (!token) {
                setIsAuthorized(false);
                setIsLoading(false);

                const currentUrl = `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ''}`;

                // Сохраняем текущий URL для редиректа на страницу после входа
                storage.setItem('returnUrl', currentUrl);
                router.replace(ROUTES.public.home.path);
                return;
            }

            setIsAuthorized(true);
            setIsLoading(false);

            const returnUrl = storage.getItem('returnUrl');

            // Если есть сохраненный returnUrl, делаем редирект
            if (returnUrl) {
                storage.removeItem('returnUrl');
                router.push(returnUrl as string);
            }
        };

        checkAuth();
    }, [pathname, router, searchParams]);

    // Показываем загрузку только на клиенте
    if (isLoading) {
        return null;
    }

    if (!isAuthorized) {
        return null;
    }

    return <>{ children }</>;
}

export default AuthGuardProvider;
