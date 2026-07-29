'use client';

import { ROUTES } from '@bdt/shared/config/Routes';

import Icon from '@bdt/shared/ui/Icon';

export const MENU = [
    {
        id: 'home',
        path: ROUTES.admin.dashboard.index.path,
        icon: <Icon name="home" />,
        tooltip: 'Главная',
    },
    {
        id: 'create',
        path: ROUTES.admin.dashboard.posts.create.path,
        icon: <Icon name="plusCircle" />,
        tooltip: 'Новый пост',
    },
    {
        id: 'posts',
        path: ROUTES.admin.dashboard.posts.index.path,
        activePaths: [
            ROUTES.admin.dashboard.posts.index.path,
            ROUTES.admin.dashboard.posts.edit.path,
        ],
        icon: <Icon name="unorderingList" />,
        tooltip: 'Посты',
    },
    {
        id: 'users',
        path: ROUTES.admin.dashboard.users.path,
        icon: <Icon name="user" />,
        tooltip: 'Пользователи',
        isAdmin: true,
    },
    {
        id: 'create-article',
        path: ROUTES.admin.dashboard.articles.create.path,
        icon: <Icon name="magicWand" />,
        tooltip: 'Новая статья',
    },
    {
        id: 'articles',
        path: ROUTES.admin.dashboard.articles.index.path,
        activePaths: [
            ROUTES.admin.dashboard.articles.index.path,
            ROUTES.admin.dashboard.articles.edit.path,
        ],
        icon: <Icon name="emptyBox" />,
        tooltip: 'Статьи',
    },
];
