import React from 'react';
import { Open_Sans } from 'next/font/google';

import AuthGuardProvider from '@bdt/shared/providers/AuthGuardProvider';

import Toaster from '@bdt/shared/ui/Toaster';

import { YandexMetrika } from '@bdt/entities/Yandex';

import StoreProvider from '@bdt/app/StoreProvider';

import '../src/shared/styles/globals.scss';

const openSans = Open_Sans({
    variable: '--font-open-sans',
    subsets: ['latin', 'cyrillic'],
    weight: ['300', '400', '600', '700', '800'],
});

interface IRootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: IRootLayoutProps) {
    return <html lang="ru">
        <body className={openSans.variable}>
            <React.Suspense>
                <StoreProvider>
                    <AuthGuardProvider>
                        { children }
                        <Toaster />
                        <YandexMetrika />
                    </AuthGuardProvider>
                </StoreProvider>
            </React.Suspense>
        </body>
    </html>;
}
