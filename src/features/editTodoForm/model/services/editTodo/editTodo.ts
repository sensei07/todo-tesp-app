import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { fetchTodosList } from '@/pages/TodosPage/model/services/fetchTodosList/fetchTodosList';
import { Todo } from '@/entities/Todo';

interface EditTodoProps {
    id: string;
    data: Partial<Todo>;
}

export const editTodo = createAsyncThunk<
    Todo,
    EditTodoProps,
    ThunkConfig<string>
>('todo/editTodo', async ({ id, data }, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.patch(`/todos/${id}`, data);

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
