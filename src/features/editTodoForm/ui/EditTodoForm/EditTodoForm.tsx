import { useSelector } from 'react-redux';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { memo } from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box, FormHelperText, MenuItem, Select } from '@mui/material';
import { Text } from '@/shared/ui/Text';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { getEditTodoIIsLoading } from '../../model/selectors/getEditTodoIIsLoading/getEditTodoIIsLoading';
import { getEditTodoError } from '../../model/selectors/getEditTodoError/getEditTodoError';
import { editTodoReducer } from '../../model/slice/editTodoSlice';
import { editTodo } from '../../model/services/editTodo/editTodo';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';
import { Todo, TodoStatus } from '@/entities/Todo';

interface IFormInput {
    title: string;
    description: string;
    status: TodoStatus;
}

const schema = z.object({
    title: z.string().min(1, { message: 'Required' }),
    description: z.string().min(1, { message: 'Required' }),
    status: z.string(),
});

export interface EditTodoFormProps {
    className?: string;
    onSuccess: () => void;
    todo: Todo;
}

const initialReducers: ReducersList = {
    editTodo: editTodoReducer,
};

const EditTodoForm = memo(
    ({ className, onSuccess, todo }: EditTodoFormProps) => {
        const dispatch = useAppDispatch();
        const isLoading = useSelector(getEditTodoIIsLoading);
        const error = useSelector(getEditTodoError);

        const {
            control,
            handleSubmit,
            formState: { errors },
        } = useForm({
            defaultValues: {
                title: todo.title,
                description: todo.description,
                status: todo.status,
            },
            resolver: zodResolver(schema),
        });

        const onSubmit: SubmitHandler<IFormInput> = async (data) => {
            await dispatch(editTodo({ id: todo.id, data }));
            await onSuccess();
        };

        return (
            <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Text title={`Edit todo: ${todo.title}`} />
                    {error && (
                        <Text text="failed to edit todo" variant="error" />
                    )}

                    <VStack gap="8">
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <FormControl
                                    error={!!errors?.title}
                                    variant="standard"
                                >
                                    <InputLabel htmlFor="title">
                                        Title
                                    </InputLabel>
                                    <Input id="title" {...field} />
                                    {errors.title?.message && (
                                        <FormHelperText>
                                            {errors.title.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            )}
                        />
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <FormControl
                                    error={!!errors?.description}
                                    variant="standard"
                                >
                                    <InputLabel htmlFor="description">
                                        Description
                                    </InputLabel>
                                    <Input id="description" {...field} />
                                    {errors.description?.message && (
                                        <FormHelperText>
                                            {errors.description.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            )}
                        />
                    </VStack>

                    <Box sx={{ my: 4 }}>
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <Select {...field} fullWidth>
                                    <MenuItem value="NEW">New</MenuItem>
                                    <MenuItem value="IN_PROGRESS">
                                        In Progress
                                    </MenuItem>
                                    <MenuItem value="COMPLETED">
                                        Completed
                                    </MenuItem>
                                </Select>
                            )}
                        />
                    </Box>

                    <HStack gap="4" justify="end">
                        <Button onClick={onSuccess} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            Edit
                        </Button>
                    </HStack>
                </form>
            </DynamicModuleLoader>
        );
    },
);

export default EditTodoForm;
