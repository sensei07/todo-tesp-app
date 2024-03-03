import { useSelector } from 'react-redux';
import { memo, useCallback, useState } from "react";
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { getCreateTodoIIsLoading } from '../../model/selectors/getCreateTodoIIsLoading/getCreateTodoIIsLoading';
import { getCreateTodoError } from '../../model/selectors/getCreateTodoError/getCreateTodoError';
import {
    createTodoActions,
    createTodoReducer,
} from '../../model/slice/createTodoSlice';
import { createTodo } from '../../model/services/createTodo/createTodo';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';
import cls from './CreateTodoForm.module.scss';
import { getCreateTodoTitle } from '../../model/selectors/getCreateTodoTitle/getCreateTodoTitle';
import { getCreateTodoDescription } from '../../model/selectors/getCreateTodoDescription/getCreateTodoDescription';

export interface CreateTodoFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    createTodo: createTodoReducer,
};

const CreateTodoForm = memo(({ className, onSuccess }: CreateTodoFormProps) => {
    const [validationError, setValidationError] = useState<string>('');
    const dispatch = useAppDispatch();
    const title = useSelector(getCreateTodoTitle);
    const description = useSelector(getCreateTodoDescription);
    const isLoading = useSelector(getCreateTodoIIsLoading);
    const error = useSelector(getCreateTodoError);

    const onCreateTodo = async () => {
        if(!description || !title) {
            setValidationError('Title and description are required')
            return
        }
        await dispatch(createTodo({ description, title }));
        await onSuccess();
    };

    const onChangeTitle = useCallback(
        (value: string) => {
            if (value) setValidationError('')
            dispatch(createTodoActions.setTitle(value));
        },
        [dispatch],
    );

    const onChangeDescription = useCallback(
        (value: string) => {
            if (value) setValidationError('')
            dispatch(createTodoActions.setDescription(value));
        },
        [dispatch],
    );

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <Text title="Create Todo" />
            {error && <Text text="failed to create todo" variant="error" />}
            {validationError  && <Text text={validationError} variant="error" />}
            <VStack gap="4">
                <Input
                    autofocus
                    type="text"
                    className={cls.input}
                    placeholder="Enter title"
                    onChange={onChangeTitle}
                    value={title}
                />
                <Input
                    type="text"
                    className={cls.input}
                    placeholder="Enter description"
                    onChange={onChangeDescription}
                    value={description}
                />
            </VStack>
            <div className={cls.actions}>
                <HStack gap="4" justify="end">
                    <Button onClick={onSuccess} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button onClick={onCreateTodo} disabled={isLoading}>
                        Save
                    </Button>
                </HStack>
            </div>
        </DynamicModuleLoader>
    );
});

export default CreateTodoForm;
