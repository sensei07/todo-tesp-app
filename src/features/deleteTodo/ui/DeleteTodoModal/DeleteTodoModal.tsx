import { Suspense } from 'react';
import { Modal } from '@/shared/ui/Modal';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Loader } from '@/shared/ui/Loader';
import { DeleteTodoFormAsync } from '../DeleteTodoForm/DeleteTodoForm.async';

interface DeleteTodoModalProps {
    className?: string;
    todoId: string;
    isOpen: boolean;
    onClose: () => void;
}

export const DeleteTodoModal = ({
    className,
    todoId,
    isOpen,
    onClose,
}: DeleteTodoModalProps) => {
    return (
        <Modal
            className={classNames('', {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
            lazy
        >
            <Suspense fallback={<Loader />}>
                <DeleteTodoFormAsync onSuccess={onClose} todoId={todoId} />
            </Suspense>
        </Modal>
    );
};
