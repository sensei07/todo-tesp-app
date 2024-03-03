import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './TodosFilters.module.scss';
import { Card } from '@/shared/ui/Card';
import { TodoStatusTabs } from '@/features/TodoStatusTabs';
import { VStack } from '@/shared/ui/Stack';
import { TodoStatus } from '@/entities/Todo';

interface TodosFiltersProps {
    className?: string;
    status: TodoStatus;
    onChangeStatus: (status: TodoStatus) => void;
}

export const TodosFilters = memo((props: TodosFiltersProps) => {
    const { className, onChangeStatus, status } = props;

    return (
        <Card
            className={classNames(cls.TodosFilters, {}, [className])}
            padding="24"
        >
            <VStack gap="32">
                <TodoStatusTabs
                    value={status}
                    onChangeStatus={onChangeStatus}
                    className={cls.tabs}
                />
            </VStack>
        </Card>
    );
});
