export enum AppRoutes {
    MAIN = 'main',
    TODOS = 'todos',
    FORBIDDEN = 'forbidden',
    // last
    NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteTodos = () => '/todos';
export const getRouteForbidden = () => '/forbidden';

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
    [getRouteMain()]: AppRoutes.MAIN,
    [getRouteTodos()]: AppRoutes.TODOS,
    [getRouteForbidden()]: AppRoutes.FORBIDDEN,
};
