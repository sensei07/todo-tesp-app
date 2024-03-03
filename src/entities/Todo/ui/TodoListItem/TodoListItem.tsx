import React, { memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './TodoListItem.module.scss';
import { Text } from '@/shared/ui/Text';
import { Card } from '@/shared/ui/Card';
import { Todo } from '../../model/types/todo';
import { HStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';
import { DeleteTodoModal } from '@/features/deleteTodo';
import { EditTodoModal } from '@/features/editTodoForm/ui/EditTodoModal/EditTodoModal';

export interface TodoListItemProps {
    className?: string;
    todo: Todo;
}

export const TodoListItem = memo((props: TodoListItemProps) => {
    const { className, todo } = props;
    const [isDeleteTodoModalOpen, setIsDeleteTodoModalOpen] = useState(false);
    const [isEditTodoModalOpen, setIsEditTodoModalOpen] = useState(false);

    const onShowDeleteModal = () => {
        setIsDeleteTodoModalOpen(true);
    };

    const onCloseDeleteModal = useCallback(() => {
        setIsDeleteTodoModalOpen(false);
    }, []);

    const onShowEditModal = () => {
        setIsEditTodoModalOpen(true);
    };

    const onCloseEditModal = useCallback(() => {
        setIsEditTodoModalOpen(false);
    }, []);

    return (
        <div className={classNames(cls.TodoListItem, {}, [className])}>
            <Card className={cls.card} border="partial" padding="0">
                <div>
                    <Text title={todo.title} align="center" />
                    <Text title={todo.description} size="s" />
                </div>
                <div>
                    <Text title={`Status: ${todo.status}`} size="s" />
                    <HStack gap="4" justify="end">
                        <Button onClick={onShowEditModal}>Edit</Button>
                        <Button onClick={onShowDeleteModal}>Delete</Button>
                    </HStack>
                </div>
            </Card>
            {isDeleteTodoModalOpen && (
                <DeleteTodoModal
                    isOpen={isDeleteTodoModalOpen}
                    onClose={onCloseDeleteModal}
                    todoId={todo.id}
                />
            )}
            {isEditTodoModalOpen && (
                <EditTodoModal
                    isOpen={isEditTodoModalOpen}
                    onClose={onCloseEditModal}
                    todo={todo}
                />
            )}
        </div>
    );
});
