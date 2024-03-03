import { StateSchema } from '@/app/providers/StoreProvider';

export const getEditTodoIIsLoading = (state: StateSchema) =>
    state?.editTodo?.isLoading || false;
