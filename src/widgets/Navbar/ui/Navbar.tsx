import React, { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { LoginModal } from '@/features/AuthByUsername';
import { getUserAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/Stack';
import { AvatarDropdown } from '@/features/avatarDropdown';
import cls from './Navbar.module.scss';
import { Button } from '@/shared/ui/Button';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    if (authData) {
        return (
            <header
                className={classNames(cls.NavbarRedesigned, {}, [className])}
            >
                <HStack gap="16" className={cls.actions}>
                    <AvatarDropdown />
                </HStack>
            </header>
        );
    }

    return (
        <header className={classNames(cls.NavbarRedesigned, {}, [className])}>
            <Button variant="clear" className={cls.links} onClick={onShowModal}>
                Log in
            </Button>

            {isAuthModal && (
                <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
            )}
        </header>
    );
});
