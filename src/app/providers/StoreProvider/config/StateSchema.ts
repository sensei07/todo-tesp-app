import {
    AnyAction,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { CombinedState } from 'redux';
import { AxiosInstance } from 'axios';
import { LoginSchema } from '@/features/AuthByUsername';
import { UserSchema } from '@/entities/User';
import { TodosPageSchema } from '@/pages/TodosPage';
import { UISchema } from '@/features/UI';
import { rtkApi } from '@/shared/api/rtkApi';
import { DeleteTodoSchema } from '@/features/deleteTodo';
import { EditTodoSchema } from '@/features/editTodoForm';
import { CreateTodoSchema } from '@/features/createTodoForm';

export interface StateSchema {
    user: UserSchema;
    ui: UISchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

    // async reducers
    loginForm?: LoginSchema;
    todosPage?: TodosPageSchema;
    deleteTodo?: DeleteTodoSchema;
    editTodo?: EditTodoSchema;
    createTodo?: CreateTodoSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (
        state: StateSchema,
        action: AnyAction,
    ) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
    getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
