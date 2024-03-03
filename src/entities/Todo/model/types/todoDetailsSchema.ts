import { Todo } from './todo';

export interface TodoDetailsSchema {
    isLoading: boolean;
    error?: string;
    data?: Todo;
}
