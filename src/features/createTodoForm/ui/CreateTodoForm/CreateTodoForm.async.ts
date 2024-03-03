import { FC, lazy } from 'react';
import { CreateTodoFormProps } from './CreateTodoForm';

export const CreateTodoFormAsync = lazy<FC<CreateTodoFormProps>>(
    () => import('./CreateTodoForm'),
);
