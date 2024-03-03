import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import MainIcon from '@/shared/assets/icons/home.svg';
import TodoIcon from '@/shared/assets/icons/todo.svg';

import { SidebarItemType } from '../types/sidebar';
import { getRouteTodos, getRouteMain } from '@/shared/const/router';

export const useSidebarItems = () => {
    const userData = useSelector(getUserAuthData);
    const sidebarItemsList: SidebarItemType[] = [
        {
            path: getRouteMain(),
            Icon: MainIcon,
            text: 'Main',
        },
    ];

    if (userData) {
        sidebarItemsList.push({
            path: getRouteTodos(),
            Icon: TodoIcon,
            text: 'Todos',
            authOnly: true,
        });
    }

    return sidebarItemsList;
};
