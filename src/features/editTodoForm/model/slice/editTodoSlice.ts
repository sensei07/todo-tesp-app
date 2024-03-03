import { createSlice } from '@reduxjs/toolkit';
import { EditTodoSchema } from '../types/editTodoSchema';
import { editTodo } from '../services/editTodo/editTodo';

const initialState: EditTodoSchema = {
    isLoading: false,
    id: '',
};

export const editTodoSlice = createSlice({
    name: 'editTodo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(editTodo.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(editTodo.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(editTodo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: editTodoActions } = editTodoSlice;
export const { reducer: editTodoReducer } = editTodoSlice;
