import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { fetchTodosList } from '@/pages/TodosPage/model/services/fetchTodosList/fetchTodosList';
import { Todo } from '@/entities/Todo';

interface CreateTodoProps {
    title: string;
    description: string;
}

export const createTodo = createAsyncThunk<
    Todo,
    CreateTodoProps,
    ThunkConfig<string>
>('todo/createTodo', async (todoData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post('/todos', {
            ...todoData,
            status: 'NEW',
        });

        if (!response.data) {
            throw new Error();
        }
        dispatch(fetchTodosList({ replace: true }));
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
