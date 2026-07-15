'use client';

import { ROUTES } from '@bdt/shared/config/Routes';

import Icon from '@bdt/shared/ui/Icon';

export const MENU = [
    {
        id: 'home',
        path: ROUTES.admin.dashboard.index.path,
        icon: <Icon name="home" />,
        tooltip: 'Главная',
        isAvailableForMember: true,
    },
    {
        id: 'create',
        path: ROUTES.admin.dashboard.createPost.path,
        icon: <Icon name="plusCircle" />,
        tooltip: 'Новый пост',
        isAvailableForMember: true,
    },
];
