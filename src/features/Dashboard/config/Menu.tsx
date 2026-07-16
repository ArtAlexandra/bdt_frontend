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
        path: ROUTES.admin.dashboard.createPost.path,
        icon: <Icon name="plusCircle" />,
        tooltip: 'Новый пост',
    },
    {
        id: 'posts',
        path: ROUTES.admin.dashboard.posts.path,
        icon: <Icon name="unorderingList" />,
        tooltip: 'Посты',
    },
];
