import { StateSchema } from '@/app/providers/StoreProvider';

export const getCreateTodoDescription = (state: StateSchema) =>
    state?.createTodo?.description || '';
