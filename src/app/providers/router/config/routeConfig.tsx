import { MainPage } from '@/pages/MainPage';
import { TodosPage } from '@/pages/TodosPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import {
    AppRoutes,
    getRouteForbidden,
    getRouteTodos,
    getRouteMain,
} from '@/shared/const/router';
import { AppRoutesProps } from '@/shared/types/router';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
    },
    [AppRoutes.TODOS]: {
        path: getRouteTodos(),
        element: <TodosPage />,
        authOnly: true,
    },
    [AppRoutes.FORBIDDEN]: {
        path: getRouteForbidden(),
        element: <ForbiddenPage />,
    },
    // last
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />,
    },
};
