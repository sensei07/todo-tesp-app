import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card';
import { Skeleton } from '@/shared/ui/Skeleton';
import cls from './TodoListItem.module.scss';
import { VStack } from '@/shared/ui/Stack';

interface TodoListItemSkeletonProps {
    className?: string;
}

export const TodoListItemSkeleton = memo((props: TodoListItemSkeletonProps) => {
    const { className } = props;

    return (
        <div
            className={classNames(cls.TodoListItemRedesigned, {}, [className])}
        >
            <Card border="round" className={cls.card}>
                <div>
                    <VStack gap='8'>
                        <Skeleton
                            width={200}
                            height={16}
                            className={cls.title}
                        />
                        <Skeleton
                            width={200}
                            height={16}
                            className={cls.title}
                        />
                    </VStack>
                </div>

                <div>
                    <VStack gap='8'>
                        <Skeleton
                            width={150}
                            height={16}
                            className={cls.title}
                        />
                        <Skeleton
                            width={150}
                            height={16}
                            className={cls.title}
                        />
                    </VStack>
                </div>
            </Card>
        </div>
    );
});
