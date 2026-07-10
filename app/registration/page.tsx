import { redirect } from 'next/navigation';

import { ADMIN_SECRET_KEY } from '@bdt/shared/config/AppEnvironment';
import { ROUTES } from '@bdt/shared/config/Routes';

import RegistrationPage from '@bdt/pages/admin/RegistrationPage';

interface IPageProps {
    searchParams: {
        key?: string;
    };
};

export default async function Page({ searchParams }: IPageProps) {
    const { key } = await searchParams;

    const isValidKey = key === ADMIN_SECRET_KEY;

    if (!isValidKey) redirect(ROUTES.public.home.path);

    return <RegistrationPage />;
}
