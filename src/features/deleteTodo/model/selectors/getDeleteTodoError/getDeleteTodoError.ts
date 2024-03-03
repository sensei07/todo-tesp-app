import { StateSchema } from '@/app/providers/StoreProvider';

export const getDeleteTodoError = (state: StateSchema) =>
    state?.deleteTodo?.error;
