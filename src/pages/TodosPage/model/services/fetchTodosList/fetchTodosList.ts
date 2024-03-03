import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Todo, TodoStatus } from '@/entities/Todo';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';
import {
    getTodosPageLimit,
    getTodosPageNum,
    getTodosPageStatus,
} from '../../selectors/todosPageSelectors';

interface FetchTodosListProps {
    replace?: boolean;
}

export const fetchTodosList = createAsyncThunk<
    Todo[],
    FetchTodosListProps,
    ThunkConfig<string>
>('todosPage/fetchTodosList', async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const limit = getTodosPageLimit(getState());
    const page = getTodosPageNum(getState());
    const status = getTodosPageStatus(getState());

    try {
        addQueryParams({
            status,
        });
        const response = await extra.api.get<Todo[]>('/todos', {
            params: {
                _limit: limit,
                _page: page,
                status: status === TodoStatus.ALL ? undefined : status,
            },
        });

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
