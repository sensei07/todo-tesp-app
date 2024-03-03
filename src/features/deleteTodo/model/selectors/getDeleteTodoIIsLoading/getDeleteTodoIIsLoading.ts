import { StateSchema } from '@/app/providers/StoreProvider';

export const getDeleteTodoIIsLoading = (state: StateSchema) =>
    state?.deleteTodo?.isLoading || false;
