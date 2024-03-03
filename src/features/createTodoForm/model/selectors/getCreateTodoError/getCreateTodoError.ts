import { StateSchema } from '@/app/providers/StoreProvider';

export const getCreateTodoError = (state: StateSchema) =>
    state?.createTodo?.error;
