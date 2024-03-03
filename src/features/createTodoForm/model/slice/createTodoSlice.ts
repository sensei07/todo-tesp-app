import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateTodoSchema } from '../types/createTodoSchema';
import { createTodo } from '../services/createTodo/createTodo';

const initialState: CreateTodoSchema = {
    isLoading: false,
    title: '',
    description: ''
};

export const createTodoSlice = createSlice({
    name: 'createTodo',
    initialState,
    reducers: {
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        setDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTodo.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(createTodo.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(createTodo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: createTodoActions } = createTodoSlice;
export const { reducer: createTodoReducer } = createTodoSlice;
