import { RouteAccessType, ROUTES, type TNestedRoutes, type TRoute } from '@bdt/shared/config/Routes';

const isRoute = (route: TNestedRoutes | TRoute) => 'path' in route;

/**
 * Recursively search for a route in the configuration
 * @param routes - Route configuration
 * @param searchPath - Path to search for
 * @returns Found route or undefined
 */
export const findRouteConfig = (routes: TNestedRoutes | TRoute, searchPath: string): TRoute | undefined => {
    for (const route of Object.values(routes)) {
        if (!route || typeof route !== 'object') continue;

        if (isRoute(route) && route.path === searchPath) return route as TRoute;

        const nestedRoute = findRouteConfig(route, searchPath);

        if (nestedRoute) return nestedRoute;
    }

    return undefined;
};

export const isProtectedAdminRoute = (path: string | null): boolean => {
    if (!path) return false;

    const routeConfig = findRouteConfig(ROUTES, path);

    return routeConfig?.access === RouteAccessType.PROTECTED_ADMIN;
};
