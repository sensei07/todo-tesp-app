import { EntityState } from '@reduxjs/toolkit';
import { Todo, TodoStatus } from '@/entities/Todo';

export interface TodosPageSchema extends EntityState<Todo> {
    isLoading?: boolean;
    error?: string;

    // pagination
    page: number;
    limit: number;
    hasMore: boolean;

    // filters
    status: TodoStatus;

    _inited: boolean;
}
