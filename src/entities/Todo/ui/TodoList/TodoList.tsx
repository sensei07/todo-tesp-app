import React, { memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text';
import { TodoListItemSkeleton } from '../TodoListItem/TodoListItemSkeleton';
import { TodoListItem } from '../TodoListItem/TodoListItem';
import cls from './TodoList.module.scss';
import { Todo } from '../../model/types/todo';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';
import { CreateTodoModal } from '@/features/createTodoForm';

interface TodoListProps {
    className?: string;
    todos: Todo[];
    isLoading?: boolean;
}

const getSkeletons = () =>
    new Array(9)
        .fill(0)
        .map((item, index) => (
            <TodoListItemSkeleton className={cls.card} key={index} />
        ));

export const TodoList = memo((props: TodoListProps) => {
    const { className, todos, isLoading } = props;
    const [isCreateTodoModalOpen, setIsCreateTodoModalOpen] = useState(false);

    const onShowCreateModal = () => {
        setIsCreateTodoModalOpen(true);
    };

    const onCloseCreateModal = useCallback(() => {
        setIsCreateTodoModalOpen(false);
    }, []);

    if (!isLoading && !todos.length) {
        return (
            <div className={classNames(cls.TodoList, {}, [className])}>
                <Text size="s" title="Todos not found" />
            </div>
        );
    }

    return (
        <>
            <VStack gap="8">
                <Button onClick={onShowCreateModal}>Create</Button>
                <HStack
                    wrap="wrap"
                    gap="16"
                    className={classNames(cls.TodoList, {}, [])}
                >
                    {todos.map((item) => (
                        <TodoListItem
                            todo={item}
                            key={item.id}
                            className={cls.card}
                        />
                    ))}
                    {isLoading && getSkeletons()}
                </HStack>
            </VStack>
            {isCreateTodoModalOpen && (
                <CreateTodoModal
                    isOpen={isCreateTodoModalOpen}
                    onClose={onCloseCreateModal}
                />
            )}
        </>
    );
});
