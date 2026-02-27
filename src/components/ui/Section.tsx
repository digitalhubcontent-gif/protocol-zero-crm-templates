import React from 'react';

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    fullWidth?: boolean;
}

export function Section({ children, className = '', id, fullWidth = false }: SectionProps) {
    return (
        <section className={`section ${className}`} id={id}>
            {fullWidth ? children : <div className="container">{children}</div>}
        </section>
    );
}

interface SectionHeaderProps {
    badge?: string;
    title: string;
    subtitle?: string;
    align?: 'left' | 'center';
    titleClassName?: string;
}

export function SectionHeader({
    badge,
    title,
    subtitle,
    align = 'center',
    titleClassName = 'display-lg',
}: SectionHeaderProps) {
    return (
        <div className={`section-header ${align === 'left' ? 'section-header-left' : ''}`}>
            {badge && <span className="badge">{badge}</span>}
            <h2 className={titleClassName}>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
        </div>
    );
}
