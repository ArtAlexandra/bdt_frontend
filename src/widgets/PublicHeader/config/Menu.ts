import { ROUTES } from '@bdt/shared/config/Routes';

export const MENU = [
    {
        id: 'home',
        path: ROUTES.public.home.path,
        name: 'Главная'
    },
    {
        id: 'about-us',
        path: `${ROUTES.public.home.path}#about_us-section`,
        name: 'О нас'
    },
    // {
    //     id: 'aboutUs',
    //     path: ROUTES.public.aboutUs,
    //     name: 'О нас'
    // },
    {
        id: 'news',
        path: ROUTES.public.news.path,
        name: 'Новости'
    },
    {
        id: 'articles',
        path: ROUTES.public.articles.index.path,
        name: 'Статьи'
    },
    // {
    //     id: 'howWeWork',
    //     path: ROUTES.public.howWeWork,
    //     name: 'Как мы работаем'
    // },
];
