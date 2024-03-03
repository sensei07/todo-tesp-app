import { StateSchema } from '@/app/providers/StoreProvider';

export const getEditTodoError = (state: StateSchema) => state?.editTodo?.error;
