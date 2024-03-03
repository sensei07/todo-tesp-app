import { TodoStatus } from '../consts/todoConsts';

export interface Todo {
    id: string;
    title: string;
    description: string;
    status: TodoStatus;
}
