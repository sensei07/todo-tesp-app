import { StateSchema } from '@/app/providers/StoreProvider';

export const getCreateTodoTitle = (state: StateSchema) =>
    state?.createTodo?.title || '';
