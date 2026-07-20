import React from 'react';
import { Comfortaa, Open_Sans, Playfair_Display, Righteous } from 'next/font/google';
import clsx from 'clsx';

import AuthGuardProvider from '@bdt/shared/providers/AuthGuardProvider';

import Toaster from '@bdt/shared/ui/Toaster';

import StoreProvider from '@bdt/app/StoreProvider';

import '../src/shared/styles/globals.scss';

const openSans = Open_Sans({
    variable: '--font-open-sans',
    subsets: ['latin', 'cyrillic'],
    weight: ['300', '400', '600', '800'],
});

const righteous = Righteous({
    variable: '--font-righteous',
    subsets: ['latin'],
    weight: '400',
});

const comfortaa = Comfortaa({
    variable: '--font-comfortaa',
    subsets: ['latin'],
    weight: ['300', '400', '700'],
});

const playfairDisplay = Playfair_Display({
    variable: '--font-playfair-display',
    subsets: ['latin'],
    weight: '400',
});

interface IRootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: IRootLayoutProps) {
    return <html lang="ru">
        <body className={clsx(openSans.variable, righteous.variable, comfortaa.variable, playfairDisplay.variable)}>
            <React.Suspense>
                <StoreProvider>
                    <AuthGuardProvider>
                        { children }
                        <Toaster />
                    </AuthGuardProvider>
                </StoreProvider>
            </React.Suspense>
        </body>
    </html>;
}
