import { memo, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from '@/widgets/Page';
import { TodoInfiniteList } from '../TodoInfiniteList/TodoInfiniteList';
import { fetchNextTodosPage } from '../../model/services/fetchNextTodosPage/fetchNextTodosPage';
import { initTodosPage } from '../../model/services/initTodosPage/initTodosPage';
import { todosPageReducer } from '../../model/slices/todosPageSlice';
import cls from './TodosPage.module.scss';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';

interface TodosPageProps {
    className?: string;
}

const reducers: ReducersList = {
    todosPage: todosPageReducer,
};

const TodosPage = (props: TodosPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextTodosPage());
    }, [dispatch]);

    useEffect(() => {
        dispatch(initTodosPage(searchParams));
    }, [dispatch, searchParams]);

    const content = (
        <StickyContentLayout
            right={<FiltersContainer />}
            content={
                <Page
                    onScrollEnd={onLoadNextPart}
                    className={classNames(cls.TodosPageRedesigned, {}, [
                        className,
                    ])}
                >
                    <TodoInfiniteList className={cls.list} />
                </Page>
            }
        />
    );

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            {content}
        </DynamicModuleLoader>
    );
};

export default memo(TodosPage);
