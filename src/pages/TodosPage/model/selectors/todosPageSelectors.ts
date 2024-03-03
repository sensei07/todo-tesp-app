import { StateSchema } from '@/app/providers/StoreProvider';
import { TodoStatus } from '@/entities/Todo';

export const getTodosPageIsLoading = (state: StateSchema) =>
    state.todosPage?.isLoading || false;
export const getTodosPageError = (state: StateSchema) => state.todosPage?.error;
export const getTodosPageNum = (state: StateSchema) =>
    state.todosPage?.page || 1;
export const getTodosPageLimit = (state: StateSchema) =>
    state.todosPage?.limit || 9;
export const getTodosPageHasMore = (state: StateSchema) =>
    state.todosPage?.hasMore;
export const getTodosPageInited = (state: StateSchema) =>
    state.todosPage?._inited;
export const getTodosPageStatus = (state: StateSchema) =>
    state.todosPage?.status ?? TodoStatus.ALL;
