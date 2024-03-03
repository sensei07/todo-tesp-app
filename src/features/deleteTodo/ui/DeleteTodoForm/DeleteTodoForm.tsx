import { useSelector } from 'react-redux';
import { memo } from 'react';
import { Text } from '@/shared/ui/Text';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { getDeleteTodoIIsLoading } from '../../model/selectors/getDeleteTodoIIsLoading/getDeleteTodoIIsLoading';
import { getDeleteTodoError } from '../../model/selectors/getDeleteTodoError/getDeleteTodoError';
import { deleteTodoReducer } from '../../model/slice/deleteTodoSlice';
import { deleteTodo } from '../../model/services/deleteTodo/deleteTodo';
import { HStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';

export interface DeleteTodoFormProps {
    className?: string;
    onSuccess: () => void;
    todoId: string;
}

const initialReducers: ReducersList = {
    deleteTodo: deleteTodoReducer,
};

const DeleteTodoForm = memo(
    ({ className, onSuccess, todoId }: DeleteTodoFormProps) => {
        const dispatch = useAppDispatch();
        const isLoading = useSelector(getDeleteTodoIIsLoading);
        const error = useSelector(getDeleteTodoError);

        const onDeleteTodo = async () => {
            await dispatch(deleteTodo({ id: todoId }));
            await onSuccess();
        };

        return (
            <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
                <Text title="Are you sure you want to delete this todo?" />
                {error && <Text text="failed to remove todo" variant="error" />}
                <HStack gap="4" justify="end">
                    <Button onClick={onSuccess} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button onClick={onDeleteTodo} disabled={isLoading}>
                        Delete
                    </Button>
                </HStack>
            </DynamicModuleLoader>
        );
    },
);

export default DeleteTodoForm;
