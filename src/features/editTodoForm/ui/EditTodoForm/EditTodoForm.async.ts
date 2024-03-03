import { FC, lazy } from 'react';
import { EditTodoFormProps } from './EditTodoForm';

export const EditTodoFormAsync = lazy<FC<EditTodoFormProps>>(
    () => import('./EditTodoForm'),
);
