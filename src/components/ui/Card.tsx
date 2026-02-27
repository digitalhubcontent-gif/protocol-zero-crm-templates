'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    padding?: 'sm' | 'md' | 'lg';
    variant?: 'glass' | 'solid' | 'outlined';
    accent?: boolean;
}

const paddingMap = {
    sm: 'card-pad-sm',
    md: 'card-pad-md',
    lg: 'card-pad-lg',
};

export function Card({
    children,
    className = '',
    hover = true,
    padding = 'md',
    variant = 'glass',
    accent = false,
}: CardProps) {
    const classes = [
        'glass-card',
        paddingMap[padding],
        variant === 'solid' ? 'card-solid' : '',
        variant === 'outlined' ? 'card-outlined' : '',
        accent ? 'card-accent' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    if (hover) {
        return (
            <motion.div
                className={classes}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
                {children}
            </motion.div>
        );
    }

    return <div className={classes}>{children}</div>;
}
