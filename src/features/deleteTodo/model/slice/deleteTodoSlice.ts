import { createSlice } from '@reduxjs/toolkit';
import { DeleteTodoSchema } from '../types/deleteTodoSchema';
import { deleteTodo } from '../services/deleteTodo/deleteTodo';

const initialState: DeleteTodoSchema = {
    isLoading: false,
    id: '',
};

export const deleteTodoSlice = createSlice({
    name: 'deleteTodo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteTodo.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(deleteTodo.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: deleteTodoActions } = deleteTodoSlice;
export const { reducer: deleteTodoReducer } = deleteTodoSlice;
