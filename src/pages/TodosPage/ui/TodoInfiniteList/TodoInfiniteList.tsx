import { memo } from 'react';
import { useSelector } from 'react-redux';
import { TodoList } from '@/entities/Todo';
import { Text } from '@/shared/ui/Text';
import { getTodos } from '../../model/slices/todosPageSlice';
import {
    getTodosPageError,
    getTodosPageIsLoading,
} from '../../model/selectors/todosPageSelectors';

interface TodoInfiniteListProps {
    className?: string;
}

export const TodoInfiniteList = memo((props: TodoInfiniteListProps) => {
    const { className } = props;
    const todos = useSelector(getTodos.selectAll);
    const isLoading = useSelector(getTodosPageIsLoading);
    const error = useSelector(getTodosPageError);

    if (error) {
        return <Text text="Error while loading todos" />;
    }

    return (
        <TodoList isLoading={isLoading} todos={todos} className={className} />
    );
});
