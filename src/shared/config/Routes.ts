export enum RouteAccessType {
    PUBLIC = 'public',
    PROTECTED_ADMIN = 'protected_admin',
};

export type TRouteAccess = RouteAccessType | readonly RouteAccessType[];

export type TRoute = {
    path: string;
    access: TRouteAccess;
    generatePath?: (id: string | number) => string;
};

// Тип для вложенных маршрутов
export type TNestedRoutes = {
    [key: string]: TRoute | TNestedRoutes;
};

export const ROUTES = {
    /**
     * Публичные маршруты (доступны всем пользователям)
     */
    public: {
        home: {
            path: '/',
            access: RouteAccessType.PUBLIC,
        },
        news: {
            path: '/news',
            access: RouteAccessType.PUBLIC,
        },
        howWeWork: {
            path: '/how-we-work',
            access: RouteAccessType.PUBLIC,
        },
        aboutUs: {
            path: '/about-us',
            access: RouteAccessType.PUBLIC,
        },
    },
    /**
     * Закрытые маршруты
     */
    admin: {
        login: {
            path: '/login',
            access: RouteAccessType.PROTECTED_ADMIN,
        },
        registration: {
            path: '/registration',
            access: RouteAccessType.PROTECTED_ADMIN,
        },
        dashboard: {
            index: {
                path: '/dashboard',
                access: RouteAccessType.PROTECTED_ADMIN,
            }
        }
    },
    /**
     * Служебные маршруты
     */
    service: {
        not_found: {
            path: '*',
            access: RouteAccessType.PUBLIC,
        },
        uiKit: {
            path: '/ui-kit',
            access: RouteAccessType.PUBLIC,
        },
    }
} as const;
