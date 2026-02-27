import React from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    size?: 'sm' | 'md';
    dot?: boolean;
    className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
    default: 'badge',
    success: 'badge badge-success',
    warning: 'badge badge-warning',
    danger: 'badge badge-danger',
    info: 'badge badge-info',
    neutral: 'badge badge-neutral',
};

export function Badge({
    children,
    variant = 'default',
    size = 'md',
    dot = false,
    className = '',
}: BadgeProps) {
    return (
        <span
            className={[
                variantClasses[variant],
                size === 'sm' ? 'badge-sm' : '',
                className,
            ]
                .filter(Boolean)
                .join(' ')}
        >
            {dot && <span className="badge-dot" aria-hidden="true" />}
            {children}
        </span>
    );
}
