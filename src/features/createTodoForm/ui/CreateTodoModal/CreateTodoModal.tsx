import { Suspense } from 'react';
import { Modal } from '@/shared/ui/Modal';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Loader } from '@/shared/ui/Loader';
import { CreateTodoFormAsync } from '../CreateTodoForm/CreateTodoForm.async';

interface CreateTodoModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const CreateTodoModal = ({
    className,
    isOpen,
    onClose,
}: CreateTodoModalProps) => {
    return (
        <Modal
            className={classNames('', {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
            lazy
        >
            <Suspense fallback={<Loader />}>
                <CreateTodoFormAsync onSuccess={onClose} />
            </Suspense>
        </Modal>
    );
};
