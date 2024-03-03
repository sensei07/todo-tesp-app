import { memo } from 'react';
import { TodosFilters } from '@/widgets/TodosFilters';
import { useTodoFilters } from '../../lib/hooks/useTodoFilters';

interface FiltersContainerProps {
    className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
    const { className } = props;
    const { onChangeStatus, status } = useTodoFilters();

    return (
        <TodosFilters
            status={status}
            onChangeStatus={onChangeStatus}
            className={className}
        />
    );
});
