import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { getTodosPageStatus } from '../../model/selectors/todosPageSelectors';
import { TodoStatus } from '@/entities/Todo';
import { todosPageActions } from '../../model/slices/todosPageSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchTodosList } from '../../model/services/fetchTodosList/fetchTodosList';

export function useTodoFilters() {
    const status = useSelector(getTodosPageStatus);

    const dispatch = useAppDispatch();

    const fetchData = useCallback(() => {
        dispatch(fetchTodosList({ replace: true }));
    }, [dispatch]);

    const onChangeStatus = useCallback(
        (value: TodoStatus) => {
            dispatch(todosPageActions.setStatus(value));
            dispatch(todosPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    return {
        status,
        onChangeStatus,
    };
}
