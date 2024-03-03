import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { TabItem, Tabs } from '@/shared/ui/Tabs';
import { TodoStatus } from '@/entities/Todo';

interface TodoStatusTabsProps {
    className?: string;
    value: TodoStatus;
    onChangeStatus: (type: TodoStatus) => void;
}

const TYPE_TABS = [
    {
        value: TodoStatus.ALL,
        content: 'All todos',
    },
    {
        value: TodoStatus.NEW,
        content: 'New',
    },
    {
        value: TodoStatus.IN_PROGRESS,
        content: 'In Progress',
    },
    {
        value: TodoStatus.COMPLETED,
        content: 'Completed',
    },
];

export const TodoStatusTabs = memo((props: TodoStatusTabsProps) => {
    const { className, value, onChangeStatus } = props;

    const onTabClick = useCallback(
        (tab: TabItem) => {
            onChangeStatus(tab.value as TodoStatus);
        },
        [onChangeStatus],
    );

    return (
        <Tabs
            direction="column"
            tabs={TYPE_TABS}
            value={value}
            onTabClick={onTabClick}
            className={classNames('', {}, [className])}
        />
    );
});
