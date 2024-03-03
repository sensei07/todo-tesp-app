import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
    getTodosPageHasMore,
    getTodosPageIsLoading,
    getTodosPageNum,
} from '../../selectors/todosPageSelectors';
import { todosPageActions } from '../../slices/todosPageSlice';
import { fetchTodosList } from '../fetchTodosList/fetchTodosList';

export const fetchNextTodosPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('todosPage/fetchNextTodosPage', async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const hasMore = getTodosPageHasMore(getState());
    const page = getTodosPageNum(getState());
    const isLoading = getTodosPageIsLoading(getState());

    if (hasMore && !isLoading) {
        dispatch(todosPageActions.setPage(page + 1));
        dispatch(fetchTodosList({}));
    }
});
