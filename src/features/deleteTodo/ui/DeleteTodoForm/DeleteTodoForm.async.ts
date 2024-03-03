import { FC, lazy } from 'react';
import { DeleteTodoFormProps } from './DeleteTodoForm';

export const DeleteTodoFormAsync = lazy<FC<DeleteTodoFormProps>>(
    () => import('./DeleteTodoForm'),
);
