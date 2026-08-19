import { ROUTES } from '@bdt/shared/config/Routes';

export type TFooterItem = {
    title: string;
    url: string;
};

export const FooterItems: TFooterItem[] = [
    {
        title: 'Главная',
        url: ROUTES.public.home.path,
    },
    {
        title: 'О нас',
        url: `${ROUTES.public.home.path}#about_us-section`,
    },
    {
        title: 'Новости',
        url: ROUTES.public.news.path,
    },
    {
        title: 'Статьи',
        url: ROUTES.public.articles.index.path,
    },
    {
        title: 'Как мы работаем',
        url: ROUTES.public.howWeWork.path,
    },
];
