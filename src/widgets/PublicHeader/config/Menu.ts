import { ROUTES } from '@bdt/shared/config/Routes';

export const MENU = [
    {
        id: 'home',
        path: ROUTES.public.home,
        name: 'Главная'
    },
    {
        id: 'aboutUs',
        path: ROUTES.public.aboutUs,
        name: 'О нас'
    },
    {
        id: 'news',
        path: ROUTES.public.news,
        name: 'Новости'
    },
    {
        id: 'articles',
        path: ROUTES.public.articles.index,
        name: 'Статьи'
    },
    {
        id: 'howWeWork',
        path: ROUTES.public.howWeWork,
        name: 'Как мы работаем'
    },
];
