import { StateSchema } from '@/app/providers/StoreProvider';

export const getCreateTodoIIsLoading = (state: StateSchema) =>
    state?.createTodo?.isLoading || false;
