import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { TodoStatus } from '@/entities/Todo';
import { getTodosPageInited } from '../../selectors/todosPageSelectors';
import { todosPageActions } from '../../slices/todosPageSlice';
import { fetchTodosList } from '../fetchTodosList/fetchTodosList';

export const initTodosPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>('todosPage/initTodosPage', async (searchParams, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const inited = getTodosPageInited(getState());

    if (!inited) {
        const statusFromUrl = searchParams.get('status') as TodoStatus;

        if (statusFromUrl) {
            dispatch(todosPageActions.setStatus(statusFromUrl));
        }

        dispatch(todosPageActions.initState());
        dispatch(fetchTodosList({}));
    }
});
