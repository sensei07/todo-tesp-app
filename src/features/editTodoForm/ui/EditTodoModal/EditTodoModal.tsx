import { Suspense } from 'react';
import { Modal } from '@/shared/ui/Modal';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Loader } from '@/shared/ui/Loader';
import { EditTodoFormAsync } from '../EditTodoForm/EditTodoForm.async';
import { Todo } from '@/entities/Todo';

interface EditTodoModalProps {
    className?: string;
    todo: Todo;
    isOpen: boolean;
    onClose: () => void;
}

export const EditTodoModal = ({
    className,
    todo,
    isOpen,
    onClose,
}: EditTodoModalProps) => {
    return (
        <Modal
            className={classNames('', {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
            lazy
        >
            <Suspense fallback={<Loader />}>
                <EditTodoFormAsync onSuccess={onClose} todo={todo} />
            </Suspense>
        </Modal>
    );
};
