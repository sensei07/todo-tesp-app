import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { fetchTodosList } from '@/pages/TodosPage/model/services/fetchTodosList/fetchTodosList';

interface DeleteTodoProps {
    id: string;
}

export const deleteTodo = createAsyncThunk<
    {},
    DeleteTodoProps,
    ThunkConfig<string>
>('todo/deleteTodo', async ({ id }, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.delete(`/todos/${id}`);

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
