'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type { HTMLMotionProps } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
    HTMLMotionProps<'button'> & { href?: undefined };
type ButtonAsLink = ButtonBaseProps & {
    href: string;
    target?: string;
    rel?: string;
    className?: string;
    children?: React.ReactNode;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'btn-sm',
    md: 'btn',
    lg: 'btn btn-lg',
};

const variantClasses: Record<ButtonVariant, string> = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    danger: 'btn-danger',
};

export function Button({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    leftIcon,
    rightIcon,
    children,
    className = '',
    href,
    ...rest
}: ButtonProps) {
    const classes = [
        sizeClasses[size],
        variantClasses[variant],
        fullWidth ? 'btn-full' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    if (href !== undefined) {
        const { target, rel, ...linkRest } = rest as ButtonAsLink;
        return (
            <Link href={href} className={classes} target={target} rel={rel}>
                {leftIcon && <span className="btn-icon">{leftIcon}</span>}
                {loading ? <span className="btn-spinner" /> : children}
                {rightIcon && !loading && <span className="btn-icon">{rightIcon}</span>}
            </Link>
        );
    }

    const { children: motionChildren, ...buttonRest } = rest as HTMLMotionProps<'button'>;
    const resolvedChildren = (children ?? motionChildren) as React.ReactNode;
    return (
        <motion.button
            className={classes}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            {...buttonRest}
        >
            {leftIcon && <span className="btn-icon">{leftIcon}</span>}
            {loading ? <span className="btn-spinner" /> : resolvedChildren}
            {rightIcon && !loading && <span className="btn-icon">{rightIcon}</span>}
        </motion.button>
    );
}
