'use client';

import { useEffect } from 'react';

import ErrorPage from '@bdt/pages/service/ErrorPage';

interface IErrorProps {
    error: Error & { digest?: string };

    reset: () => void;
}

export default function Error({ error, reset }: IErrorProps) {
    useEffect(() => {
        // Логирование ошибки в сервис аналитики
        console.error('Error:', error);
    }, [error]);

    return (
        <ErrorPage
            title="Произошла ошибка"
            message="На сервере произошла непредвиденная ошибка. Пожалуйста, попробуйте еще раз позже."
            code={500}
            onBack={reset}
        />
    );
}
