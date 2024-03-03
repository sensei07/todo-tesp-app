import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Todo, TodoStatus } from '@/entities/Todo';
import { TodosPageSchema } from '../types/todosPageSchema';
import { fetchTodosList } from '../../model/services/fetchTodosList/fetchTodosList';

const todosAdapter = createEntityAdapter<Todo>({
    selectId: (todo) => todo.id,
});

export const getTodos = todosAdapter.getSelectors<StateSchema>(
    (state) => state.todosPage || todosAdapter.getInitialState(),
);

const todosPageSlice = createSlice({
    name: 'todosPageSlice',
    initialState: todosAdapter.getInitialState<TodosPageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        page: 1,
        hasMore: true,
        _inited: false,
        limit: 9,
        status: TodoStatus.ALL,
    }),
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setStatus: (state, action: PayloadAction<TodoStatus>) => {
            state.status = action.payload;
        },
        initState: (state) => {
            state.limit = 9;
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodosList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;

                if (action.meta.arg.replace) {
                    todosAdapter.removeAll(state);
                }
            })
            .addCase(fetchTodosList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasMore = action.payload.length >= state.limit;

                if (action.meta.arg.replace) {
                    todosAdapter.setAll(state, action.payload);
                } else {
                    todosAdapter.addMany(state, action.payload);
                }
            })
            .addCase(fetchTodosList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: todosPageReducer, actions: todosPageActions } =
    todosPageSlice;
